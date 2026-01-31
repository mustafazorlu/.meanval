import { NextRequest, NextResponse } from 'next/server'
import { getFromRedis, setInRedis, isRedisAvailable } from '@/lib/redis'
import { projects as mockProjects } from '@/lib/mock-data'
import { Project } from '@/lib/types'

const PROJECTS_KEY = 'meanval:projects'

async function getProjects(): Promise<Project[]> {
  const redisAvailable = await isRedisAvailable()

  if (!redisAvailable) {
    return mockProjects
  }

  const projects = await getFromRedis<Project[]>(PROJECTS_KEY)
  return projects || mockProjects
}

// GET /api/projects/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const projects = await getProjects()
    const project = projects.find((p) => p.id === id)

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found', success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: project, success: true })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project', success: false },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id]
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

    const projects = await getProjects()
    const index = projects.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Project not found', success: false },
        { status: 404 }
      )
    }

    const updatedProject: Project = {
      ...projects[index],
      ...body,
      id, // Prevent ID changes
    }

    projects[index] = updatedProject
    await setInRedis(PROJECTS_KEY, projects)

    return NextResponse.json({ data: updatedProject, success: true })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project', success: false },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id]
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

    const projects = await getProjects()
    const index = projects.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Project not found', success: false },
        { status: 404 }
      )
    }

    projects.splice(index, 1)
    await setInRedis(PROJECTS_KEY, projects)

    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project', success: false },
      { status: 500 }
    )
  }
}
