'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/admin'
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { Select } from '@/components/ui/dropdown'
import { useData } from '@/lib/data-context'
import { ClientStatus } from '@/lib/types'

const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
]

export default function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { getClient, updateClient } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const client = getClient(id)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    status: 'active' as ClientStatus,
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company,
        address: client.address || '',
        status: client.status,
      })
    }
  }, [client])

  if (!client) {
    return (
      <div>
        <Header title="Musteri Bulunamadi" />
        <div className="p-6">
          <p className="text-gray-500">Bu musteri bulunamadi.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/clients')}
          >
            Musterilere Don
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    updateClient(id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      address: formData.address,
      status: formData.status,
    })

    setIsSubmitting(false)
    router.push(`/clients/${id}`)
  }

  return (
    <div>
      <Header title="Musteri Duzenle" />

      <div className="p-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push(`/clients/${id}`)}
          className="mb-6"
        >
          Musteriye Don
        </Button>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Musteri Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Ad Soyad"
                  placeholder="Orn: Mehmet Kaya"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  label="Sirket"
                  placeholder="Orn: ACME Inc."
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="E-posta"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <Input
                  label="Telefon"
                  type="tel"
                  placeholder="+90 5XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <Input
                label="Adres"
                placeholder="Sirket adresi"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              <Select
                label="Durum"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value as ClientStatus })}
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/clients/${id}`)}
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
