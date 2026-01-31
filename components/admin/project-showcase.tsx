'use client'

import { useState } from 'react'
import {
  Plus,
  Trash2,
  Send,
  Eye,
  Download,
  Edit2,
  Check,
  X,
  Package,
  Wrench,
  HeadphonesIcon,
  MoreHorizontal,
} from 'lucide-react'
import { Button, Badge, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import { ProjectShowcase, ShowcaseItem, ShowcaseStatus } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'

interface ProjectShowcaseProps {
  showcase: ProjectShowcase | null
  projectId: string
  projectName: string
  clientName: string
  onSave?: (showcase: ProjectShowcase) => void
}

const categoryIcons = {
  feature: Package,
  service: Wrench,
  support: HeadphonesIcon,
  other: MoreHorizontal,
}

const categoryLabels = {
  feature: 'Özellik',
  service: 'Hizmet',
  support: 'Destek',
  other: 'Diğer',
}

const statusLabels: Record<ShowcaseStatus, string> = {
  draft: 'Taslak',
  sent: 'Gönderildi',
  viewed: 'Görüntülendi',
  accepted: 'Onaylandı',
  rejected: 'Reddedildi',
}

const statusColors: Record<ShowcaseStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  viewed: 'bg-amber-100 text-amber-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export function ProjectShowcaseComponent({
  showcase: initialShowcase,
  projectId,
  projectName,
  clientName,
}: ProjectShowcaseProps) {
  const [isEditing, setIsEditing] = useState(!initialShowcase)
  const [showcase, setShowcase] = useState<ProjectShowcase | null>(initialShowcase)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  // Form states
  const [title, setTitle] = useState(showcase?.title || `${projectName} - Proje Teklifi`)
  const [introduction, setIntroduction] = useState(
    showcase?.introduction ||
      `${clientName} için hazırlanan proje teklifimizi aşağıda bulabilirsiniz.`
  )
  const [items, setItems] = useState<ShowcaseItem[]>(showcase?.items || [])
  const [discount, setDiscount] = useState(showcase?.discount || 0)
  const [notes, setNotes] = useState(showcase?.notes || '')

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const finalAmount = totalAmount - discount

  const addItem = () => {
    const newItem: ShowcaseItem = {
      id: `item-${Date.now()}`,
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      category: 'feature',
    }
    setItems([...items, newItem])
    setEditingItemId(newItem.id)
  }

  const updateItem = (id: string, updates: Partial<ShowcaseItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const saveShowcase = () => {
    const newShowcase: ProjectShowcase = {
      id: showcase?.id || `showcase-${Date.now()}`,
      projectId,
      title,
      introduction,
      items,
      totalAmount,
      discount,
      finalAmount,
      notes,
      status: showcase?.status || 'draft',
      createdAt: showcase?.createdAt || new Date(),
      updatedAt: new Date(),
    }
    setShowcase(newShowcase)
    setIsEditing(false)
  }

  const sendShowcase = () => {
    if (showcase) {
      setShowcase({
        ...showcase,
        status: 'sent',
        sentAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  if (!showcase && !isEditing) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Henüz Showcase Oluşturulmamış
          </h3>
          <p className="text-gray-500 mb-4">
            Müşterinize sunmak istediğiniz özellikleri ve fiyatlandırmayı buradan
            oluşturabilirsiniz.
          </p>
          <Button onClick={() => setIsEditing(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Showcase Oluştur
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Showcase Düzenle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Proje teklif başlığı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giriş Metni</label>
              <textarea
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                placeholder="Müşteriye gösterilecek giriş metni..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Özellikler ve Fiyatlandırma</CardTitle>
            <Button size="sm" variant="outline" onClick={addItem} leftIcon={<Plus className="w-4 h-4" />}>
              Kalem Ekle
            </Button>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Henüz özellik eklenmemiş. "Kalem Ekle" butonuna tıklayarak başlayın.
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    {editingItemId === item.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Özellik Adı
                            </label>
                            <Input
                              value={item.name}
                              onChange={(e) => updateItem(item.id, { name: e.target.value })}
                              placeholder="Özellik adı"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Kategori
                            </label>
                            <select
                              value={item.category}
                              onChange={(e) =>
                                updateItem(item.id, {
                                  category: e.target.value as ShowcaseItem['category'],
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="feature">Özellik</option>
                              <option value="service">Hizmet</option>
                              <option value="support">Destek</option>
                              <option value="other">Diğer</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Açıklama
                          </label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(item.id, { description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            rows={2}
                            placeholder="Özellik açıklaması"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Miktar
                            </label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(item.id, { quantity: parseInt(e.target.value) || 1 })
                              }
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Birim Fiyat (₺)
                            </label>
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
                              }
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Toplam
                            </label>
                            <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg font-medium">
                              {formatCurrency(item.quantity * item.unitPrice)}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteItem(item.id)}
                            leftIcon={<Trash2 className="w-4 h-4" />}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Sil
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setEditingItemId(null)}
                            leftIcon={<Check className="w-4 h-4" />}
                          >
                            Tamam
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setEditingItemId(item.id)}
                      >
                        <div className="flex items-center gap-3">
                          {(() => {
                            const Icon = categoryIcons[item.category]
                            return (
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                <Icon className="w-5 h-5 text-gray-600" />
                              </div>
                            )
                          })()}
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name || 'İsimsiz Özellik'}
                            </p>
                            <p className="text-sm text-gray-500">{categoryLabels[item.category]}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              {item.quantity} x {formatCurrency(item.unitPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ara Toplam</span>
                    <span className="font-medium">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">İndirim</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">₺</span>
                      <Input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        className="w-24 text-right"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                    <span className="text-gray-900">Toplam</span>
                    <span className="text-primary-700">{formatCurrency(finalAmount)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ek Notlar</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              placeholder="Müşteriye iletmek istediğiniz ek notlar..."
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(false)} leftIcon={<X className="w-4 h-4" />}>
            İptal
          </Button>
          <Button onClick={saveShowcase} leftIcon={<Check className="w-4 h-4" />}>
            Kaydet
          </Button>
        </div>
      </div>
    )
  }

  // View mode - showcase can be null, show create form
  if (!showcase) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Henuz bir showcase olusturulmamis.</p>
        <Button onClick={() => setIsEditing(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Showcase Olustur
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{showcase.title}</CardTitle>
            <div className="flex items-center gap-3 mt-2">
              <Badge className={statusColors[showcase.status]}>{statusLabels[showcase.status]}</Badge>
              {showcase.sentAt && (
                <span className="text-sm text-gray-500">
                  Gönderildi: {formatDate(showcase.sentAt)}
                </span>
              )}
              {showcase.viewedAt && (
                <span className="text-sm text-gray-500">
                  Görüntülendi: {formatDate(showcase.viewedAt)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showcase.status === 'draft' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  leftIcon={<Edit2 className="w-4 h-4" />}
                >
                  Düzenle
                </Button>
                <Button size="sm" onClick={sendShowcase} leftIcon={<Send className="w-4 h-4" />}>
                  Gönder
                </Button>
              </>
            )}
            <Button size="sm" variant="outline" leftIcon={<Eye className="w-4 h-4" />}>
              Önizle
            </Button>
            <Button size="sm" variant="outline" leftIcon={<Download className="w-4 h-4" />}>
              PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">{showcase.introduction}</p>

          <div className="space-y-3">
            {showcase.items.map((item) => {
              const Icon = categoryIcons[item.category]
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            {item.quantity} x {formatCurrency(item.unitPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ara Toplam</span>
                <span className="font-medium">{formatCurrency(showcase.totalAmount)}</span>
              </div>
              {showcase.discount && showcase.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>İndirim</span>
                  <span>-{formatCurrency(showcase.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                <span className="text-gray-900">Toplam</span>
                <span className="text-primary-700">{formatCurrency(showcase.finalAmount)}</span>
              </div>
            </div>
          </div>

          {showcase.notes && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm font-medium text-amber-800 mb-1">Notlar</p>
              <p className="text-sm text-amber-700">{showcase.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
