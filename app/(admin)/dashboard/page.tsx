'use client'

import Link from 'next/link'
import {
  FolderKanban,
  Users,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Send,
  UserPlus,
  DollarSign,
} from 'lucide-react'
import { Header, StatsCard, SimplePieChart, SimpleBarChart, ProgressBar } from '@/components/admin'
import { Badge, Card, CardContent, CardHeader, CardTitle, Avatar } from '@/components/ui'
import { useData } from '@/lib/data-context'
import { activities } from '@/lib/mock-data'
import { formatCurrency, formatRelativeTime, getStatusColor, getStatusLabel } from '@/lib/utils'

const statusColors: Record<string, string> = {
  planning: '#3b82f6',
  in_progress: '#f59e0b',
  review: '#8b5cf6',
  completed: '#10b981',
  on_hold: '#6b7280',
}

export default function DashboardPage() {
  const { projects, clients, proposals, contracts } = useData()

  // Calculate stats from data
  const totalProjects = projects.length
  const activeClients = clients.filter(c => c.status === 'active').length
  const pendingProposals = proposals.filter(p => p.status === 'draft' || p.status === 'sent').length
  const totalRevenue = projects.reduce((sum, p) => sum + p.budget, 0)

  // Calculate project status counts
  const projectsByStatus = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieChartData = Object.entries(projectsByStatus).map(
    ([status, count]) => ({
      label: getStatusLabel(status),
      value: count,
      color: statusColors[status] || '#6b7280',
    })
  )

  // Mock monthly revenue data
  const monthlyRevenue = [
    { label: 'Oca', value: 45000 },
    { label: 'Şub', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Nis', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Haz', value: 67000 },
  ]

  // Upcoming deadlines
  const upcomingProjects = projects
    .filter((p) => p.status !== 'completed' && p.endDate)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 4)

  return (
    <div>
      <Header title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Toplam Proje"
            value={totalProjects}
            icon={<FolderKanban className="w-5 h-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Aktif Musteri"
            value={activeClients}
            icon={<Users className="w-5 h-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Bekleyen Teklif"
            value={pendingProposals}
            icon={<FileText className="w-5 h-5" />}
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Toplam Gelir"
            value={formatCurrency(totalRevenue)}
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: 24, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimplePieChart
            title="Proje Durumu"
            data={pieChartData}
          />
          <SimpleBarChart
            title="Aylik Gelir"
            data={monthlyRevenue}
            color="#064e3b"
          />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Son Aktiviteler</CardTitle>
              <Link
                href="/projects"
                className="text-sm text-primary-700 hover:underline flex items-center gap-1"
              >
                Tümünü gör <ArrowRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {activities.slice(0, 5).map((activity) => {
                  const getIcon = () => {
                    switch (activity.type) {
                      case 'project':
                        return activity.action === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <FolderKanban className="w-4 h-4 text-blue-600" />
                        )
                      case 'proposal':
                        return activity.action === 'rejected' ? (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-amber-600" />
                        )
                      case 'contract':
                        return <Send className="w-4 h-4 text-purple-600" />
                      case 'client':
                        return <UserPlus className="w-4 h-4 text-emerald-600" />
                      case 'payment':
                        return <DollarSign className="w-4 h-4 text-green-600" />
                      default:
                        return <Clock className="w-4 h-4 text-gray-600" />
                    }
                  }

                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">{getIcon()}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatRelativeTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Yaklaşan Teslim Tarihleri</CardTitle>
              <Link
                href="/projects"
                className="text-sm text-primary-700 hover:underline flex items-center gap-1"
              >
                Tümünü gör <ArrowRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingProjects.map((project) => {
                const daysLeft = Math.ceil(
                  (new Date(project.endDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
                const isUrgent = daysLeft <= 7

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-500">{project.clientName}</p>
                      </div>
                      <Badge
                        variant={isUrgent ? 'error' : 'default'}
                        className="shrink-0"
                      >
                        {daysLeft <= 0 ? 'Gecikmiş' : `${daysLeft} gün kaldı`}
                      </Badge>
                    </div>
                    <ProgressBar
                      value={project.progress}
                      size="sm"
                      color={project.progress >= 75 ? 'success' : project.progress >= 50 ? 'warning' : 'primary'}
                    />
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
