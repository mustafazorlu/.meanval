import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { proposals as mockProposals } from '@/lib/mock-data'
import { Proposal } from '@/lib/types'

const PROPOSALS_KEY = 'meanval:proposals'

async function getProposals(): Promise<Proposal[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockProposals
  }

  const proposals = await getFromRedis<Proposal[]>(PROPOSALS_KEY)
  return proposals || mockProposals
}

// GET /api/proposals/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const proposals = await getProposals()
    const proposal = proposals.find((p) => p.id === id)

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found', success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: proposal, success: true })
  } catch (error) {
    console.error('Error fetching proposal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch proposal', success: false },
      { status: 500 }
    )
  }
}

// PUT /api/proposals/[id]
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

    const proposals = await getProposals()
    const index = proposals.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Proposal not found', success: false },
        { status: 404 }
      )
    }

    const updatedProposal: Proposal = {
      ...proposals[index],
      ...body,
      id,
      number: proposals[index].number, // Prevent number changes
    }

    proposals[index] = updatedProposal
    await setInRedis(PROPOSALS_KEY, proposals)

    return NextResponse.json({ data: updatedProposal, success: true })
  } catch (error) {
    console.error('Error updating proposal:', error)
    return NextResponse.json(
      { error: 'Failed to update proposal', success: false },
      { status: 500 }
    )
  }
}

// DELETE /api/proposals/[id]
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

    const proposals = await getProposals()
    const index = proposals.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Proposal not found', success: false },
        { status: 404 }
      )
    }

    proposals.splice(index, 1)
    await setInRedis(PROPOSALS_KEY, proposals)

    return NextResponse.json({ success: true, message: 'Proposal deleted' })
  } catch (error) {
    console.error('Error deleting proposal:', error)
    return NextResponse.json(
      { error: 'Failed to delete proposal', success: false },
      { status: 500 }
    )
  }
}
