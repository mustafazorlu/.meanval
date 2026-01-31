'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/admin'
import {
  Button,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { Select } from '@/components/ui/dropdown'
import { useData } from '@/lib/data-context'

export default function NewContractPage() {
  const router = useRouter()
  const { clients, projects, addContract } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clientOptions = clients.map((c) => ({
    value: c.id,
    label: `${c.company} - ${c.name}`,
  }))

  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    content: `1. SÖZLEŞME'NİN KONUSU

Bu sözleşme, Hizmet Veren'in Hizmet Alan'a belirtilen proje kapsamında yazılım geliştirme hizmetleri sunmasına ilişkin şartları ve koşulları düzenler.

2. HİZMET KAPSAMI

Hizmet Veren, proje teklifinde belirtilen tüm özellikleri ve işlevleri içeren yazılım çözümünü geliştirecek ve teslim edecektir.

3. ÖDEME KOŞULLARI

Ödeme, teklifte belirtilen tutarlara ve ödeme planına göre yapılacaktır. Tüm faturalar 15 gün içinde ödenmelidir.

4. FİKRİ MÜLKİYET

Proje kapsamında geliştirilen tüm yazılım ve belgeler, nihai ödemenin yapılmasının ardından Hizmet Alan'a devredilecektir.

5. GİZLİLİK

Taraflar, bu sözleşme kapsamında elde ettikleri tüm ticari ve teknik bilgileri gizli tutmakla yükümlüdür.

6. SÖZLEŞMENİN SÜRESİ VE FESHİ

Bu sözleşme imza tarihinde yürürlüğe girer ve proje tamamlanana kadar geçerlidir.`,
  })

  // Filter projects by selected client
  const projectOptions = projects
    .filter((p) => p.clientId === formData.clientId)
    .map((p) => ({
      value: p.id,
      label: p.name,
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedClient = clients.find(c => c.id === formData.clientId)
    const selectedProject = projects.find(p => p.id === formData.projectId)

    addContract({
      clientId: formData.clientId,
      clientName: selectedClient?.company || '',
      projectId: formData.projectId,
      projectName: selectedProject?.name || '',
      status: 'draft',
      content: formData.content,
    })

    setIsSubmitting(false)
    router.push('/contracts')
  }

  return (
    <div>
      <Header title="Yeni Sözleşme" />

      <div className="p-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push('/contracts')}
          className="mb-6"
        >
          Sözleşmelere Dön
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Sözleşme Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Müşteri"
                placeholder="Müşteri seçin"
                options={clientOptions}
                value={formData.clientId}
                onChange={(value) =>
                  setFormData({ ...formData, clientId: value, projectId: '' })
                }
              />

              <Select
                label="Proje"
                placeholder={formData.clientId ? 'Proje seçin' : 'Önce müşteri seçin'}
                options={projectOptions}
                value={formData.projectId}
                onChange={(value) =>
                  setFormData({ ...formData, projectId: value })
                }
                disabled={!formData.clientId}
              />
            </CardContent>
          </Card>

          {/* Contract Content */}
          <Card>
            <CardHeader>
              <CardTitle>Sözleşme İçeriği</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Sözleşme metni..."
                rows={20}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/contracts')}
            >
              İptal
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Sözleşme Oluştur
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
