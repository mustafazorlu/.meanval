'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Calendar, User } from 'lucide-react'
import { Project } from '@/lib/types'
import { formatDate, formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui'
import Link from 'next/link'

interface KanbanCardProps {
  project: Project
}

export function KanbanCard({ project }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow transition-shadow ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <Link
          href={`/projects/${project.id}`}
          className="font-medium text-gray-900 hover:text-primary-700 transition-colors line-clamp-2"
        >
          {project.name}
        </Link>
        <button
          {...attributes}
          {...listeners}
          className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <User className="w-3 h-3" />
        <span>{project.clientName}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(project.endDate)}</span>
        </div>
        <span className="text-xs font-medium text-gray-700">
          {formatCurrency(project.budget)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500">İlerleme</span>
          <span className="font-medium text-gray-700">{project.progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
