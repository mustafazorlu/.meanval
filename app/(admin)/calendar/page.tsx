'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/admin'
import { ProjectCalendar, CalendarSidebar } from '@/components/admin/calendar'
import { projects } from '@/lib/mock-data'

export default function CalendarPage() {
  const router = useRouter()

  const handleEventClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <div>
      <Header title="Takvim" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Calendar */}
          <div className="flex-1">
            <ProjectCalendar projects={projects} onEventClick={handleEventClick} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <CalendarSidebar projects={projects} />
          </div>
        </div>
      </div>
    </div>
  )
}
