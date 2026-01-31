'use client'

import { useState } from 'react'
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

export default function NewProjectPage() {
  const router = useRouter()
  const { clients, addProject } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedClient = clients.find(c => c.id === formData.clientId)

    addProject({
      name: formData.name,
      description: formData.description,
      clientId: formData.clientId,
      clientName: selectedClient?.company || '',
      status: formData.status,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      budget: parseFloat(formData.budget) || 0,
      progress: 0,
      tasks: [],
    })

    setIsSubmitting(false)
    router.push('/projects')
  }

  return (
    <div>
      <Header title="Yeni Proje" />

      <div className="p-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push('/projects')}
          className="mb-6"
        >
          Projelere Dön
        </Button>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Proje Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Proje Adı"
                placeholder="Örn: E-Ticaret Platformu"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <Textarea
                label="Açıklama"
                placeholder="Proje hakkında detaylı bilgi..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <Select
                label="Müşteri"
                placeholder="Müşteri seçin"
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
                  label="Başlangıç Tarihi"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
                <Input
                  label="Bitiş Tarihi"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>

              <Input
                label="Bütçe (TL)"
                type="number"
                placeholder="0"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/projects')}
                >
                  İptal
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                  Proje Oluştur
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
