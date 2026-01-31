'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, List, LayoutGrid } from 'lucide-react'
import { Header, DataTable, KanbanBoard } from '@/components/admin'
import { Badge, Button } from '@/components/ui'
import { useData } from '@/lib/data-context'
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Project } from '@/lib/types'
import { ProgressBar } from '@/components/admin/charts'

const columns = [
  {
    key: 'name',
    label: 'Proje Adı',
    render: (project: Project) => (
      <div>
        <p className="font-medium text-gray-900">{project.name}</p>
        <p className="text-sm text-gray-500">{project.clientName}</p>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Durum',
    render: (project: Project) => (
      <Badge className={getStatusColor(project.status)}>
        {getStatusLabel(project.status)}
      </Badge>
    ),
  },
  {
    key: 'progress',
    label: 'İlerleme',
    render: (project: Project) => (
      <div className="w-32">
        <ProgressBar value={project.progress} size="sm" showPercentage />
      </div>
    ),
  },
  {
    key: 'dates',
    label: 'Tarihler',
    render: (project: Project) => (
      <div className="text-sm">
        <p className="text-gray-900">{formatDate(project.startDate)}</p>
        <p className="text-gray-500">{formatDate(project.endDate)}</p>
      </div>
    ),
  },
  {
    key: 'budget',
    label: 'Bütçe',
    render: (project: Project) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(project.budget)}
      </span>
    ),
  },
]

type ViewMode = 'list' | 'kanban'

export default function ProjectsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const { projects } = useData()

  return (
    <div>
      <Header title="Projeler" />

      <div className="p-6">
        {/* View Toggle & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              Liste
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Kanban
            </button>
          </div>

          <Button
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => router.push('/projects/new')}
          >
            Yeni Proje
          </Button>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'list' ? (
          <DataTable
            columns={columns}
            data={projects}
            onRowClick={(project) => router.push(`/projects/${project.id}`)}
            searchPlaceholder="Proje ara..."
            searchKey="name"
            emptyMessage="Henüz proje bulunmuyor"
          />
        ) : (
          <KanbanBoard initialProjects={projects} />
        )}
      </div>
    </div>
  )
}
