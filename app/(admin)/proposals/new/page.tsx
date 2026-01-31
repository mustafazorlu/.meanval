'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
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
import { formatCurrency } from '@/lib/utils'

interface ProposalItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export default function NewProposalPage() {
  const router = useRouter()
  const { clients, addProposal } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clientOptions = clients.map((c) => ({
    value: c.id,
    label: `${c.company} - ${c.name}`,
  }))

  const [formData, setFormData] = useState({
    clientId: '',
    projectName: '',
    description: '',
    validUntil: '',
  })

  const [items, setItems] = useState<ProposalItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 },
  ])

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 },
    ])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof ProposalItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedClient = clients.find(c => c.id === formData.clientId)

    addProposal({
      clientId: formData.clientId,
      clientName: selectedClient?.company || '',
      projectName: formData.projectName,
      amount: total * 1.2,
      status: 'draft',
      validUntil: new Date(formData.validUntil),
      items: items.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      })),
    })

    setIsSubmitting(false)
    router.push('/proposals')
  }

  return (
    <div>
      <Header title="Yeni Teklif" />

      <div className="p-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push('/proposals')}
          className="mb-6"
        >
          Tekliflere Dön
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Teklif Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Müşteri"
                placeholder="Müşteri seçin"
                options={clientOptions}
                value={formData.clientId}
                onChange={(value) =>
                  setFormData({ ...formData, clientId: value })
                }
              />

              <Input
                label="Proje Adı"
                placeholder="Örn: E-Ticaret Platformu"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                required
              />

              <Textarea
                label="Açıklama"
                placeholder="Teklif hakkında detaylı bilgi..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <Input
                label="Geçerlilik Tarihi"
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({ ...formData, validUntil: e.target.value })
                }
                required
              />
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Kalemler</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={addItem}
              >
                Kalem Ekle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-end"
                  >
                    <div className="col-span-5">
                      <Input
                        label={index === 0 ? 'Açıklama' : undefined}
                        placeholder="Hizmet açıklaması"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, 'description', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        label={index === 0 ? 'Miktar' : undefined}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        label={index === 0 ? 'Birim Fiyat' : undefined}
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <div className={index === 0 ? 'mt-6' : ''}>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className={index === 0 ? 'mt-6' : ''}
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>KDV (%20)</span>
                      <span>{formatCurrency(total * 0.2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>Genel Toplam</span>
                      <span>{formatCurrency(total * 1.2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/proposals')}
            >
              İptal
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Teklif Oluştur
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
