import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { clients as mockClients } from '@/lib/mock-data'
import { Client } from '@/lib/types'

const CLIENTS_KEY = 'meanval:clients'

async function getClients(): Promise<Client[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockClients
  }

  const clients = await getFromRedis<Client[]>(CLIENTS_KEY)
  return clients || mockClients
}

// GET /api/clients/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const clients = await getClients()
    const client = clients.find((c) => c.id === id)

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found', success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: client, success: true })
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client', success: false },
      { status: 500 }
    )
  }
}

// PUT /api/clients/[id]
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

    const clients = await getClients()
    const index = clients.findIndex((c) => c.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Client not found', success: false },
        { status: 404 }
      )
    }

    const updatedClient: Client = {
      ...clients[index],
      ...body,
      id,
    }

    clients[index] = updatedClient
    await setInRedis(CLIENTS_KEY, clients)

    return NextResponse.json({ data: updatedClient, success: true })
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { error: 'Failed to update client', success: false },
      { status: 500 }
    )
  }
}

// DELETE /api/clients/[id]
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

    const clients = await getClients()
    const index = clients.findIndex((c) => c.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Client not found', success: false },
        { status: 404 }
      )
    }

    clients.splice(index, 1)
    await setInRedis(CLIENTS_KEY, clients)

    return NextResponse.json({ success: true, message: 'Client deleted' })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Failed to delete client', success: false },
      { status: 500 }
    )
  }
}
