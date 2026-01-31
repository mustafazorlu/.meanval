'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Send,
  Calendar,
  Building,
  User,
  Check,
  X,
} from 'lucide-react'
import { Header } from '@/components/admin'
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { useData } from '@/lib/data-context'
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'

export default function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { getProposal, getClient, updateProposal, deleteProposal } = useData()

  const proposal = getProposal(id)
  const client = proposal ? getClient(proposal.clientId) : null

  const handleDelete = () => {
    deleteProposal(id)
    router.push('/proposals')
  }

  const handleStatusChange = (status: 'sent' | 'accepted' | 'rejected') => {
    updateProposal(id, { status })
  }

  if (!proposal) {
    return (
      <div>
        <Header title="Teklif Bulunamadı" />
        <div className="p-6">
          <p className="text-gray-500">
            Bu teklif bulunamadı veya silinmiş olabilir.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/proposals')}
          >
            Tekliflere Dön
          </Button>
        </div>
      </div>
    )
  }

  const isExpired = new Date(proposal.validUntil) < new Date()
  const canEdit = proposal.status === 'draft'
  const canSend = proposal.status === 'draft' && !isExpired
  const canApprove = proposal.status === 'sent'

  return (
    <div>
      <Header title={`Teklif ${proposal.number}`} />

      <div className="p-6 space-y-6">
        {/* Back Button and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push('/proposals')}
          >
            Tekliflere Dön
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
            >
              PDF İndir
            </Button>
            {canSend && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Send className="w-4 h-4" />}
                onClick={() => handleStatusChange('sent')}
              >
                Gönder
              </Button>
            )}
            {canApprove && (
              <>
                <Button
                  size="sm"
                  leftIcon={<Check className="w-4 h-4" />}
                  onClick={() => handleStatusChange('accepted')}
                >
                  Onayla
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<X className="w-4 h-4" />}
                  onClick={() => handleStatusChange('rejected')}
                >
                  Reddet
                </Button>
              </>
            )}
            {canEdit && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => router.push(`/proposals/${id}/edit`)}
              >
                Düzenle
              </Button>
            )}
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Teklifi Sil</h3>
              <p className="text-gray-600 mb-6">
                &quot;{proposal.number}&quot; teklifini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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

        {/* Proposal Preview */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200">
              <div>
                <h1 className="text-3xl font-bold text-primary-800 mb-2">meanval</h1>
                <p className="text-gray-500">İş Yönetimi Platformu</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {proposal.number}
                  </span>
                  <Badge className={getStatusColor(proposal.status)} size="md">
                    {getStatusLabel(proposal.status)}
                  </Badge>
                </div>
                <p className="text-gray-500">
                  Tarih: {formatDate(proposal.createdAt)}
                </p>
              </div>
            </div>

            {/* Client & Valid Until */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Müşteri
                </h3>
                {client && (
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      {client.company}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {client.name}
                    </p>
                    <p className="text-gray-600">{client.email}</p>
                    <p className="text-gray-600">{client.phone}</p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Geçerlilik
                </h3>
                <p className={`flex items-center justify-end gap-2 ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                  <Calendar className="w-4 h-4" />
                  {formatDate(proposal.validUntil)}
                  {isExpired && <span className="text-sm">(Süresi doldu)</span>}
                </p>
              </div>
            </div>

            {/* Project Name */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Proje
              </h3>
              <p className="text-xl font-semibold text-gray-900">
                {proposal.projectName}
              </p>
              {proposal.description && (
                <p className="text-gray-600 mt-2">{proposal.description}</p>
              )}
            </div>

            {/* Items Table */}
            {proposal.items && proposal.items.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Kalemler
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Açıklama</TableHead>
                      <TableHead className="text-right">Miktar</TableHead>
                      <TableHead className="text-right">Birim Fiyat</TableHead>
                      <TableHead className="text-right">Toplam</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposal.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>{formatCurrency(proposal.amount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>KDV (%20)</span>
                  <span>{formatCurrency(proposal.amount * 0.2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Genel Toplam</span>
                  <span>{formatCurrency(proposal.amount * 1.2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>Bu teklif {formatDate(proposal.validUntil)} tarihine kadar geçerlidir.</p>
              <p className="mt-2">Sorularınız için: info@meanval.com | +90 212 123 4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
