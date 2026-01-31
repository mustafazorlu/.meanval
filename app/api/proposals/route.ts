import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { proposals as mockProposals } from '@/lib/mock-data'
import { Proposal } from '@/lib/types'

const PROPOSALS_KEY = 'meanval:proposals'

async function initializeProposals(): Promise<Proposal[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockProposals
  }

  let proposals = await getFromRedis<Proposal[]>(PROPOSALS_KEY)

  if (!proposals || proposals.length === 0) {
    await setInRedis(PROPOSALS_KEY, mockProposals)
    proposals = mockProposals
  }

  return proposals
}

// GET /api/proposals
export async function GET(request: NextRequest) {
  try {
    const proposals = await initializeProposals()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')

    let filteredProposals = proposals

    if (status) {
      filteredProposals = filteredProposals.filter((p) => p.status === status)
    }

    if (clientId) {
      filteredProposals = filteredProposals.filter((p) => p.clientId === clientId)
    }

    return NextResponse.json({ data: filteredProposals, success: true })
  } catch (error) {
    console.error('Error fetching proposals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch proposals', success: false },
      { status: 500 }
    )
  }
}

// POST /api/proposals
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate proposal number
    const proposals = await initializeProposals()
    const year = new Date().getFullYear()
    const count = proposals.filter((p) => p.number.includes(`TEK-${year}`)).length + 1
    const number = `TEK-${year}-${String(count).padStart(3, '0')}`

    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      number,
      clientId: body.clientId,
      clientName: body.clientName,
      projectName: body.projectName,
      description: body.description,
      amount: body.amount || 0,
      status: body.status || 'draft',
      validUntil: new Date(body.validUntil),
      items: body.items || [],
      createdAt: new Date(),
    }

    const redisAvailable = await isRedisAvailable()

    if (redisAvailable) {
      proposals.push(newProposal)
      await setInRedis(PROPOSALS_KEY, proposals)
    }

    return NextResponse.json({ data: newProposal, success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating proposal:', error)
    return NextResponse.json(
      { error: 'Failed to create proposal', success: false },
      { status: 500 }
    )
  }
}
