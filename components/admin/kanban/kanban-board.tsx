'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Project, ProjectStatus } from '@/lib/types'
import { KanbanColumn } from './kanban-column'
import { KanbanCard } from './kanban-card'

const columns: { id: ProjectStatus; title: string; color: string }[] = [
  { id: 'planning', title: 'Planlama', color: '#3b82f6' },
  { id: 'in_progress', title: 'Devam Ediyor', color: '#f59e0b' },
  { id: 'review', title: 'İnceleme', color: '#8b5cf6' },
  { id: 'completed', title: 'Tamamlandı', color: '#10b981' },
  { id: 'on_hold', title: 'Beklemede', color: '#6b7280' },
]

interface KanbanBoardProps {
  initialProjects: Project[]
}

export function KanbanBoard({ initialProjects }: KanbanBoardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getProjectsByStatus = (status: ProjectStatus) => {
    return projects.filter((p) => p.status === status)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const project = projects.find((p) => p.id === active.id)
    if (project) {
      setActiveProject(project)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find which column the item is being dragged over
    const activeProject = projects.find((p) => p.id === activeId)
    if (!activeProject) return

    // Check if dropped over a column
    const overColumn = columns.find((c) => c.id === overId)
    if (overColumn && activeProject.status !== overColumn.id) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeId ? { ...p, status: overColumn.id } : p
        )
      )
      return
    }

    // Check if dropped over another project
    const overProject = projects.find((p) => p.id === overId)
    if (overProject && activeProject.status !== overProject.status) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeId ? { ...p, status: overProject.status } : p
        )
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveProject(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeProject = projects.find((p) => p.id === activeId)
    const overProject = projects.find((p) => p.id === overId)

    if (activeProject && overProject && activeProject.status === overProject.status) {
      const oldIndex = projects.findIndex((p) => p.id === activeId)
      const newIndex = projects.findIndex((p) => p.id === overId)
      setProjects(arrayMove(projects, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            projects={getProjectsByStatus(column.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeProject && <KanbanCard project={activeProject} />}
      </DragOverlay>
    </DndContext>
  )
}
