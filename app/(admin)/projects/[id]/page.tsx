'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  User,
  CheckCircle2,
  Circle,
  Clock,
  LayoutList,
  Package,
  FileText,
} from 'lucide-react'
import { Header, ProgressBar, ProjectShowcaseComponent } from '@/components/admin'
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { useData } from '@/lib/data-context'
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from '@/lib/utils'

type TabType = 'overview' | 'tasks' | 'showcase'

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { getProject, getClient, getShowcaseByProjectId, deleteProject } = useData()

  const project = getProject(id)
  const client = project ? getClient(project.clientId) : null
  const showcase = project ? getShowcaseByProjectId(project.id) : null

  const handleDelete = () => {
    deleteProject(id)
    router.push('/projects')
  }

  if (!project) {
    return (
      <div>
        <Header title="Proje Bulunamadı" />
        <div className="p-6">
          <p className="text-gray-500">
            Bu proje bulunamadı veya silinmiş olabilir.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/projects')}
          >
            Projelere Dön
          </Button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Genel Bakış', icon: LayoutList },
    { id: 'tasks' as TabType, label: 'Görevler', icon: CheckCircle2 },
    { id: 'showcase' as TabType, label: 'Showcase', icon: Package },
  ]

  return (
    <div>
      <Header title={project.name} />

      <div className="p-6 space-y-6">
        {/* Back Button and Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push('/projects')}
          >
            Projelere Dön
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit className="w-4 h-4" />}
              onClick={() => router.push(`/projects/${id}/edit`)}
            >
              Düzenle
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => setShowDeleteConfirm(true)}
            >
              Sil
            </Button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Projeyi Sil</h3>
              <p className="text-gray-600 mb-6">
                &quot;{project.name}&quot; projesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  İptal
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Evet, Sil
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Project Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {project.name}
                  </h2>
                  <Badge className={getStatusColor(project.status)} size="md">
                    {getStatusLabel(project.status)}
                  </Badge>
                </div>
                <p className="text-gray-500">{project.clientName}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(project.budget)}
                </p>
                <p className="text-sm text-gray-500">Toplam Bütçe</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Proje İlerlemesi
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {project.progress}%
                </span>
              </div>
              <ProgressBar
                value={project.progress}
                size="md"
                showPercentage={false}
                color={
                  project.progress >= 75
                    ? 'success'
                    : project.progress >= 50
                    ? 'warning'
                    : 'primary'
                }
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Başlangıç</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">
                  {formatDate(project.startDate)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">Bitiş</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">
                  {formatDate(project.endDate)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs">Görevler</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">
                  {project.tasks?.filter(t => t.completed).length || 0}/{project.tasks?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs">Müşteri</span>
                </div>
                <Link
                  href={`/clients/${project.clientId}`}
                  className="font-medium text-primary-700 hover:underline text-sm"
                >
                  {project.clientName}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proje Açıklaması</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>

              {/* Recent Tasks Preview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Son Görevler</CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveTab('tasks')}
                  >
                    Tümünü Gör
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {project.tasks && project.tasks.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {project.tasks.slice(0, 4).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                          <span
                            className={`flex-1 text-sm ${
                              task.completed
                                ? 'text-gray-500 line-through'
                                : 'text-gray-900'
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500">
                      Henüz görev eklenmemiş
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Client Info & Timeline */}
            <div className="space-y-6">
              {/* Client Card */}
              {client && (
                <Card>
                  <CardHeader>
                    <CardTitle>Müşteri Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Şirket</p>
                        <p className="font-medium text-gray-900">{client.company}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">İletişim</p>
                        <p className="font-medium text-gray-900">{client.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">E-posta</p>
                        <a
                          href={`mailto:${client.email}`}
                          className="font-medium text-primary-700 hover:underline"
                        >
                          {client.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Telefon</p>
                        <a
                          href={`tel:${client.phone}`}
                          className="font-medium text-gray-900"
                        >
                          {client.phone}
                        </a>
                      </div>
                      <Link href={`/clients/${client.id}`}>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          Müşteri Detayı
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivite</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-900">Proje oluşturuldu</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(project.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-900">
                          Durum güncellendi: {getStatusLabel(project.status)}
                        </p>
                        <p className="text-xs text-gray-500">2 gün önce</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 mt-2 bg-amber-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-900">
                          İlerleme %{project.progress}&apos;e ulaştı
                        </p>
                        <p className="text-xs text-gray-500">3 gün önce</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Görevler</CardTitle>
              <Button size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                Görev Ekle
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {project.tasks && project.tasks.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {project.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                      <span
                        className={`flex-1 ${
                          task.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.dueDate && (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  Henüz görev eklenmemiş
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'showcase' && (
          <ProjectShowcaseComponent
            showcase={showcase || null}
            projectId={project.id}
            projectName={project.name}
            clientName={project.clientName || ''}
          />
        )}
      </div>
    </div>
  )
}
