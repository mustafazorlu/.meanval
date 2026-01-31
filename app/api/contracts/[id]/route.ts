import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { contracts as mockContracts } from '@/lib/mock-data'
import { Contract } from '@/lib/types'

const CONTRACTS_KEY = 'meanval:contracts'

async function getContracts(): Promise<Contract[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockContracts
  }

  const contracts = await getFromRedis<Contract[]>(CONTRACTS_KEY)
  return contracts || mockContracts
}

// GET /api/contracts/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const contracts = await getContracts()
    const contract = contracts.find((c) => c.id === id)

    if (!contract) {
      return NextResponse.json(
        { error: 'Contract not found', success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: contract, success: true })
  } catch (error) {
    console.error('Error fetching contract:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contract', success: false },
      { status: 500 }
    )
  }
}

// PUT /api/contracts/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const redisAvailable = await isRedisAvailable()

    if (!redisAvailable) {
      return NextResponse.json(
        { error: 'Database not available', success: false },
        { status: 503 }
      )
    }

    const contracts = await getContracts()
    const index = contracts.findIndex((c) => c.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Contract not found', success: false },
        { status: 404 }
      )
    }

    const updatedContract: Contract = {
      ...contracts[index],
      ...body,
      id,
      number: contracts[index].number, // Prevent number changes
    }

    // Set signedAt if status changed to signed
    if (body.status === 'signed' && !contracts[index].signedAt) {
      updatedContract.signedAt = new Date()
    }

    contracts[index] = updatedContract
    await setInRedis(CONTRACTS_KEY, contracts)

    return NextResponse.json({ data: updatedContract, success: true })
  } catch (error) {
    console.error('Error updating contract:', error)
    return NextResponse.json(
      { error: 'Failed to update contract', success: false },
      { status: 500 }
    )
  }
}

// DELETE /api/contracts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const redisAvailable = await isRedisAvailable()

    if (!redisAvailable) {
      return NextResponse.json(
        { error: 'Database not available', success: false },
        { status: 503 }
      )
    }

    const contracts = await getContracts()
    const index = contracts.findIndex((c) => c.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Contract not found', success: false },
        { status: 404 }
      )
    }

    contracts.splice(index, 1)
    await setInRedis(CONTRACTS_KEY, contracts)

    return NextResponse.json({ success: true, message: 'Contract deleted' })
  } catch (error) {
    console.error('Error deleting contract:', error)
    return NextResponse.json(
      { error: 'Failed to delete contract', success: false },
      { status: 500 }
    )
  }
}
