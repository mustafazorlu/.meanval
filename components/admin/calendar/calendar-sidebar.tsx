'use client'

import { Project } from '@/lib/types'
import { formatDate, getStatusLabel } from '@/lib/utils'
import { Badge } from '@/components/ui'
import Link from 'next/link'

interface CalendarSidebarProps {
  projects: Project[]
}

const statusColors: Record<string, string> = {
  planning: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  review: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  on_hold: 'bg-gray-100 text-gray-700',
}

const statusDots: Record<string, string> = {
  planning: 'bg-blue-500',
  in_progress: 'bg-amber-500',
  review: 'bg-purple-500',
  completed: 'bg-green-500',
  on_hold: 'bg-gray-500',
}

export function CalendarSidebar({ projects }: CalendarSidebarProps) {
  // Get upcoming deadlines (next 7 days)
  const now = new Date()
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const upcomingDeadlines = projects
    .filter((p) => {
      const endDate = new Date(p.endDate)
      return endDate >= now && endDate <= nextWeek && p.status !== 'completed'
    })
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())

  // Get projects by status for legend
  const projectsByStatus = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Durum Renkleri</h3>
        <div className="space-y-2">
          {Object.entries(statusDots).map(([status, color]) => (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-sm text-gray-700">{getStatusLabel(status)}</span>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {projectsByStatus[status] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-4">
          Yaklaşan Teslimler
          {upcomingDeadlines.length > 0 && (
            <span className="ml-2 text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
              {upcomingDeadlines.length}
            </span>
          )}
        </h3>
        {upcomingDeadlines.length > 0 ? (
          <div className="space-y-3">
            {upcomingDeadlines.map((project) => {
              const daysLeft = Math.ceil(
                (new Date(project.endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
              )
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {project.name}
                    </p>
                    <Badge
                      className={daysLeft <= 2 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}
                      size="sm"
                    >
                      {daysLeft === 0 ? 'Bugün' : daysLeft === 1 ? 'Yarın' : `${daysLeft} gün`}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{project.clientName}</p>
                  <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Bu hafta teslim tarihi yok
          </p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Bu Ay</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <p className="text-xl font-bold text-green-800">
              {projects.filter((p) => p.status === 'completed').length}
            </p>
            <p className="text-xs text-green-600">Tamamlanan</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg text-center">
            <p className="text-xl font-bold text-amber-800">
              {projects.filter((p) => p.status === 'in_progress').length}
            </p>
            <p className="text-xs text-amber-600">Devam Eden</p>
          </div>
        </div>
      </div>
    </div>
  )
}
