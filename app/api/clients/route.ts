import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { clients as mockClients } from '@/lib/mock-data'
import { Client } from '@/lib/types'

const CLIENTS_KEY = 'meanval:clients'

async function initializeClients(): Promise<Client[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockClients
  }

  let clients = await getFromRedis<Client[]>(CLIENTS_KEY)

  if (!clients || clients.length === 0) {
    await setInRedis(CLIENTS_KEY, mockClients)
    clients = mockClients
  }

  return clients
}

// GET /api/clients
export async function GET(request: NextRequest) {
  try {
    const clients = await initializeClients()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let filteredClients = clients

    if (status) {
      filteredClients = filteredClients.filter((c) => c.status === status)
    }

    return NextResponse.json({ data: filteredClients, success: true })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients', success: false },
      { status: 500 }
    )
  }
}

// POST /api/clients
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      address: body.address,
      status: body.status || 'active',
      totalProjects: 0,
      totalRevenue: 0,
      createdAt: new Date(),
    }

    const redisAvailable = await isRedisAvailable()

    if (redisAvailable) {
      const clients = await initializeClients()
      clients.push(newClient)
      await setInRedis(CLIENTS_KEY, clients)
    }

    return NextResponse.json({ data: newClient, success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Failed to create client', success: false },
      { status: 500 }
    )
  }
}
