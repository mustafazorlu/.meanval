'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Project } from '@/lib/types'
import { KanbanCard } from './kanban-card'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  id: string
  title: string
  projects: Project[]
  color: string
}

export function KanbanColumn({ id, title, projects, color }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div className="flex-shrink-0 w-80">
      <div
        className={cn(
          'rounded-2xl p-4 min-h-[500px] transition-colors',
          isOver ? 'bg-gray-100' : 'bg-gray-50'
        )}
      >
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <span className="text-sm font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full">
            {projects.length}
          </span>
        </div>

        {/* Cards */}
        <div ref={setNodeRef} className="space-y-3 min-h-[400px]">
          <SortableContext
            items={projects.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {projects.map((project) => (
              <KanbanCard key={project.id} project={project} />
            ))}
          </SortableContext>

          {projects.length === 0 && (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-sm text-gray-400">Proje yok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
