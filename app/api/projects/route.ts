import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { projects as mockProjects } from '@/lib/mock-data'
import { Project } from '@/lib/types'

const PROJECTS_KEY = 'meanval:projects'

// Initialize Redis with mock data if empty
async function initializeProjects(): Promise<Project[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    console.log('Redis not available, using mock data')
    return mockProjects
  }

  let projects = await getFromRedis<Project[]>(PROJECTS_KEY)

  if (!projects || projects.length === 0) {
    await setInRedis(PROJECTS_KEY, mockProjects)
    projects = mockProjects
  }

  return projects
}

// GET /api/projects
export async function GET(request: NextRequest) {
  try {
    const projects = await initializeProjects()

    // Handle query params for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')

    let filteredProjects = projects

    if (status) {
      filteredProjects = filteredProjects.filter((p) => p.status === status)
    }

    if (clientId) {
      filteredProjects = filteredProjects.filter((p) => p.clientId === clientId)
    }

    return NextResponse.json({ data: filteredProjects, success: true })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects', success: false },
      { status: 500 }
    )
  }
}

// POST /api/projects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: body.name,
      description: body.description || '',
      clientId: body.clientId,
      clientName: body.clientName,
      status: body.status || 'planning',
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      budget: body.budget || 0,
      progress: body.progress || 0,
      tasks: body.tasks || [],
      createdAt: new Date(),
    }

    const redisAvailable = await isRedisAvailable()

    if (redisAvailable) {
      const projects = await initializeProjects()
      projects.push(newProject)
      await setInRedis(PROJECTS_KEY, projects)
    }

    return NextResponse.json({ data: newProject, success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project', success: false },
      { status: 500 }
    )
  }
}
