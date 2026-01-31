'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/admin'
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { Select } from '@/components/ui/dropdown'
import { useData } from '@/lib/data-context'
import { ProjectStatus } from '@/lib/types'

const statusOptions = [
  { value: 'planning', label: 'Planlama' },
  { value: 'in_progress', label: 'Devam Ediyor' },
  { value: 'review', label: 'İnceleme' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'on_hold', label: 'Beklemede' },
]

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { clients, getProject, updateProject } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const project = getProject(id)

  const clientOptions = clients.map((c) => ({
    value: c.id,
    label: `${c.company} - ${c.name}`,
  }))

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '',
    status: 'planning' as ProjectStatus,
    startDate: '',
    endDate: '',
    budget: '',
    progress: 0,
  })

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        clientId: project.clientId,
        status: project.status,
        startDate: project.startDate instanceof Date
          ? project.startDate.toISOString().split('T')[0]
          : new Date(project.startDate).toISOString().split('T')[0],
        endDate: project.endDate instanceof Date
          ? project.endDate.toISOString().split('T')[0]
          : new Date(project.endDate).toISOString().split('T')[0],
        budget: project.budget.toString(),
        progress: project.progress,
      })
    }
  }, [project])

  if (!project) {
    return (
      <div>
        <Header title="Proje Bulunamadi" />
        <div className="p-6">
          <p className="text-gray-500">Bu proje bulunamadi.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/projects')}
          >
            Projelere Don
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedClient = clients.find(c => c.id === formData.clientId)

    updateProject(id, {
      name: formData.name,
      description: formData.description,
      clientId: formData.clientId,
      clientName: selectedClient?.company || project.clientName,
      status: formData.status,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      budget: parseFloat(formData.budget) || 0,
      progress: formData.progress,
    })

    setIsSubmitting(false)
    router.push(`/projects/${id}`)
  }

  return (
    <div>
      <Header title="Proje Duzenle" />

      <div className="p-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push(`/projects/${id}`)}
          className="mb-6"
        >
          Projeye Don
        </Button>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Proje Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Proje Adi"
                placeholder="Orn: E-Ticaret Platformu"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <Textarea
                label="Aciklama"
                placeholder="Proje hakkinda detayli bilgi..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <Select
                label="Musteri"
                placeholder="Musteri secin"
                options={clientOptions}
                value={formData.clientId}
                onChange={(value) =>
                  setFormData({ ...formData, clientId: value })
                }
              />

              <Select
                label="Durum"
                options={statusOptions}
                value={formData.status}
                onChange={(value) =>
                  setFormData({ ...formData, status: value as ProjectStatus })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Baslangic Tarihi"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
                <Input
                  label="Bitis Tarihi"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Butce (TL)"
                  type="number"
                  placeholder="0"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                />
                <Input
                  label="Ilerleme (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/projects/${id}`)}
                >
                  Iptal
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                  Kaydet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
