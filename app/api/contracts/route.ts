import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { contracts as mockContracts } from '@/lib/mock-data'
import { Contract } from '@/lib/types'

const CONTRACTS_KEY = 'meanval:contracts'

async function initializeContracts(): Promise<Contract[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockContracts
  }

  let contracts = await getFromRedis<Contract[]>(CONTRACTS_KEY)

  if (!contracts || contracts.length === 0) {
    await setInRedis(CONTRACTS_KEY, mockContracts)
    contracts = mockContracts
  }

  return contracts
}

// GET /api/contracts
export async function GET(request: NextRequest) {
  try {
    const contracts = await initializeContracts()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    const projectId = searchParams.get('projectId')

    let filteredContracts = contracts

    if (status) {
      filteredContracts = filteredContracts.filter((c) => c.status === status)
    }

    if (clientId) {
      filteredContracts = filteredContracts.filter((c) => c.clientId === clientId)
    }

    if (projectId) {
      filteredContracts = filteredContracts.filter((c) => c.projectId === projectId)
    }

    return NextResponse.json({ data: filteredContracts, success: true })
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contracts', success: false },
      { status: 500 }
    )
  }
}

// POST /api/contracts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate contract number
    const contracts = await initializeContracts()
    const year = new Date().getFullYear()
    const count = contracts.filter((c) => c.number.includes(`SOZ-${year}`)).length + 1
    const number = `SOZ-${year}-${String(count).padStart(3, '0')}`

    const newContract: Contract = {
      id: `cont-${Date.now()}`,
      number,
      projectId: body.projectId,
      projectName: body.projectName,
      clientId: body.clientId,
      clientName: body.clientName,
      status: body.status || 'draft',
      content: body.content,
      createdAt: new Date(),
    }

    const redisAvailable = await isRedisAvailable()

    if (redisAvailable) {
      contracts.push(newContract)
      await setInRedis(CONTRACTS_KEY, contracts)
    }

    return NextResponse.json({ data: newContract, success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating contract:', error)
    return NextResponse.json(
      { error: 'Failed to create contract', success: false },
      { status: 500 }
    )
  }
}
