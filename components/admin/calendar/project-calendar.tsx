'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Project } from '@/lib/types'
import { getStatusLabel } from '@/lib/utils'

// Dynamically import FullCalendar to avoid SSR issues
const FullCalendar = dynamic(
  () => import('@fullcalendar/react').then((mod) => mod.default),
  { ssr: false }
)

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

interface ProjectCalendarProps {
  projects: Project[]
  onEventClick?: (projectId: string) => void
}

const statusColors: Record<string, string> = {
  planning: '#3b82f6',
  in_progress: '#f59e0b',
  review: '#8b5cf6',
  completed: '#10b981',
  on_hold: '#6b7280',
}

export function ProjectCalendar({ projects, onEventClick }: ProjectCalendarProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Convert projects to calendar events
  const events = useMemo(() => {
    return projects.flatMap((project) => {
      const events = []

      // Project duration as a range
      events.push({
        id: project.id,
        title: project.name,
        start: new Date(project.startDate),
        end: new Date(project.endDate),
        backgroundColor: statusColors[project.status] || '#6b7280',
        borderColor: statusColors[project.status] || '#6b7280',
        extendedProps: {
          type: 'project',
          status: project.status,
          clientName: project.clientName,
          progress: project.progress,
        },
      })

      // Add task deadlines if available
      if (project.tasks) {
        project.tasks.forEach((task) => {
          if (task.dueDate) {
            events.push({
              id: `${project.id}-task-${task.id}`,
              title: `📋 ${task.title}`,
              start: new Date(task.dueDate),
              backgroundColor: task.completed ? '#10b981' : '#ef4444',
              borderColor: task.completed ? '#10b981' : '#ef4444',
              extendedProps: {
                type: 'task',
                projectId: project.id,
                completed: task.completed,
              },
            })
          }
        })
      }

      return events
    })
  }, [projects])

  // Handle event click
  const handleEventClick = (info: any) => {
    const eventId = info.event.id
    const props = info.event.extendedProps

    if (props?.type === 'task' && props?.projectId) {
      onEventClick?.(props.projectId)
    } else {
      onEventClick?.(eventId)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <style jsx global>{`
        .fc {
          font-family: inherit;
        }
        .fc .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        .fc .fc-button {
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #374151;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }
        .fc .fc-button:hover {
          background-color: #e5e7eb;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background-color: #064e3b;
          border-color: #064e3b;
          color: white;
        }
        .fc .fc-daygrid-day-number {
          color: #374151;
          font-weight: 500;
          padding: 0.5rem;
        }
        .fc .fc-daygrid-day.fc-day-today {
          background-color: #f0fdf4;
        }
        .fc .fc-event {
          border-radius: 0.375rem;
          font-size: 0.75rem;
          padding: 0.125rem 0.375rem;
          cursor: pointer;
        }
        .fc .fc-col-header-cell-cushion {
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          padding: 0.75rem 0;
        }
        .fc .fc-scrollgrid {
          border: none;
        }
        .fc .fc-scrollgrid td,
        .fc .fc-scrollgrid th {
          border-color: #f3f4f6;
        }
        .fc-theme-standard .fc-scrollgrid {
          border: none;
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: #f3f4f6;
        }
      `}</style>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        locale="tr"
        buttonText={{
          today: 'Bugün',
          month: 'Ay',
          week: 'Hafta',
        }}
        height="auto"
        eventDisplay="block"
        dayMaxEvents={3}
        moreLinkText={(n) => `+${n} daha`}
      />
    </div>
  )
}
