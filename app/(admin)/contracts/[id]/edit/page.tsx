'use client'

import { use, useState, useEffect } from 'react'
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

export default function EditContractPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { clients, projects, getContract, updateContract } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contract = getContract(id)

  const clientOptions = clients.map((c) => ({
    value: c.id,
    label: `${c.company} - ${c.name}`,
  }))

  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    content: '',
  })

  const projectOptions = projects
    .filter((p) => p.clientId === formData.clientId)
    .map((p) => ({
      value: p.id,
      label: p.name,
    }))

  useEffect(() => {
    if (contract) {
      setFormData({
        clientId: contract.clientId,
        projectId: contract.projectId,
        content: contract.content || `1. SOZLESME'NIN KONUSU

Bu sozlesme, Hizmet Veren'in Hizmet Alan'a belirtilen proje kapsaminda yazilim gelistirme hizmetleri sunmasina iliskin sartlari ve kosullari duzenler.

2. HIZMET KAPSAMI

Hizmet Veren, proje teklifinde belirtilen tum ozellikleri ve islevleri iceren yazilim cozumunu gelistirecek ve teslim edecektir.

3. ODEME KOSULLARI

Odeme, teklifte belirtilen tutarlara ve odeme planina gore yapilacaktir. Tum faturalar 15 gun icinde odenmelidir.

4. FIKRI MULKIYET

Proje kapsaminda gelistirilen tum yazilim ve belgeler, nihai odemenin yapilmasinin ardindan Hizmet Alan'a devredilecektir.

5. GIZLILIK

Taraflar, bu sozlesme kapsaminda elde ettikleri tum ticari ve teknik bilgileri gizli tutmakla yukumludur.

6. SOZLESMENIN SURESI VE FESHI

Bu sozlesme imza tarihinde yururluge girer ve proje tamamlanana kadar gecerlidir.`,
      })
    }
  }, [contract])

  if (!contract) {
    return (
      <div>
        <Header title="Sozlesme Bulunamadi" />
        <div className="p-6">
          <p className="text-gray-500">Bu sozlesme bulunamadi.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/contracts')}
          >
            Sozlesmelere Don
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedClient = clients.find(c => c.id === formData.clientId)
    const selectedProject = projects.find(p => p.id === formData.projectId)

    updateContract(id, {
      clientId: formData.clientId,
      clientName: selectedClient?.company || contract.clientName,
      projectId: formData.projectId,
      projectName: selectedProject?.name || contract.projectName,
      content: formData.content,
    })

    setIsSubmitting(false)
    router.push(`/contracts/${id}`)
  }

  return (
    <div>
      <Header title="Sozlesme Duzenle" />

      <div className="p-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push(`/contracts/${id}`)}
          className="mb-6"
        >
          Sozlesmeye Don
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Sozlesme Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Musteri"
                placeholder="Musteri secin"
                options={clientOptions}
                value={formData.clientId}
                onChange={(value) =>
                  setFormData({ ...formData, clientId: value, projectId: '' })
                }
              />

              <Select
                label="Proje"
                placeholder={formData.clientId ? 'Proje secin' : 'Once musteri secin'}
                options={projectOptions}
                value={formData.projectId}
                onChange={(value) =>
                  setFormData({ ...formData, projectId: value })
                }
                disabled={!formData.clientId}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sozlesme Icerigi</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Sozlesme metni..."
                rows={20}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/contracts/${id}`)}
            >
              Iptal
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Kaydet
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
