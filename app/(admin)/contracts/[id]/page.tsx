'use client'

import { use, useState } from 'react'
import Link from 'next/link'
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
  CheckCircle,
  Clock,
  FileSignature,
  FolderKanban,
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
import { useData } from '@/lib/data-context'
import { formatDate, formatDateTime, getStatusColor, getStatusLabel } from '@/lib/utils'

export default function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { getContract, getClient, getProject, updateContract, deleteContract } = useData()

  const contract = getContract(id)
  const client = contract ? getClient(contract.clientId) : null
  const project = contract ? getProject(contract.projectId) : null

  const handleDelete = () => {
    deleteContract(id)
    router.push('/contracts')
  }

  const handleSendForSignature = () => {
    updateContract(id, { status: 'pending_signature' })
  }

  const handleSign = () => {
    updateContract(id, { status: 'signed', signedAt: new Date() })
  }

  if (!contract) {
    return (
      <div>
        <Header title="Sözleşme Bulunamadı" />
        <div className="p-6">
          <p className="text-gray-500">
            Bu sözleşme bulunamadı veya silinmiş olabilir.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/contracts')}
          >
            Sözleşmelere Dön
          </Button>
        </div>
      </div>
    )
  }

  const canEdit = contract.status === 'draft'
  const canSend = contract.status === 'draft'
  const isSigned = contract.status === 'signed'

  return (
    <div>
      <Header title={`Sözleşme ${contract.number}`} />

      <div className="p-6 space-y-6">
        {/* Back Button and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push('/contracts')}
          >
            Sözleşmelere Dön
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
                onClick={handleSendForSignature}
              >
                İmza için Gönder
              </Button>
            )}
            {contract.status === 'pending_signature' && (
              <Button
                size="sm"
                leftIcon={<CheckCircle className="w-4 h-4" />}
                onClick={handleSign}
              >
                İmzalandı Olarak İşaretle
              </Button>
            )}
            {canEdit && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => router.push(`/contracts/${id}/edit`)}
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sözleşmeyi Sil</h3>
              <p className="text-gray-600 mb-6">
                &quot;{contract.number}&quot; sözleşmesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Contract Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {/* Contract Header */}
                <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200">
                  <div>
                    <h1 className="text-3xl font-bold text-primary-800 mb-2">meanval</h1>
                    <p className="text-gray-500">Hizmet Sözleşmesi</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        {contract.number}
                      </span>
                      <Badge className={getStatusColor(contract.status)} size="md">
                        {getStatusLabel(contract.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-500">
                      Oluşturulma: {formatDate(contract.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Hizmet Veren
                    </h3>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Meanval Tech</p>
                      <p className="text-gray-600">info@meanval.com</p>
                      <p className="text-gray-600">+90 212 123 4567</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Hizmet Alan
                    </h3>
                    {client && (
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{client.company}</p>
                        <p className="text-gray-600">{client.name}</p>
                        <p className="text-gray-600">{client.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Proje
                  </h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {contract.projectName}
                  </p>
                </div>

                {/* Contract Content Placeholder */}
                <div className="prose max-w-none mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    1. Sözleşmenin Konusu
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Bu sözleşme, Hizmet Veren&apos;in Hizmet Alan&apos;a yukarıda belirtilen
                    proje kapsamında yazılım geliştirme hizmetleri sunmasına ilişkin
                    şartları ve koşulları düzenler.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    2. Hizmet Kapsamı
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Hizmet Veren, proje teklifinde belirtilen tüm özellikleri ve
                    işlevleri içeren yazılım çözümünü geliştirecek ve teslim edecektir.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    3. Ödeme Koşulları
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Ödeme, teklifte belirtilen tutarlara ve ödeme planına göre
                    yapılacaktır. Tüm faturalar 15 gün içinde ödenmelidir.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    4. Fikri Mülkiyet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Proje kapsamında geliştirilen tüm yazılım ve belgeler, nihai
                    ödemenin yapılmasının ardından Hizmet Alan&apos;a devredilecektir.
                  </p>
                </div>

                {/* Signature Section */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Hizmet Veren
                    </h3>
                    <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">İmza Alanı</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Meanval Tech</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Hizmet Alan
                    </h3>
                    <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {isSigned ? (
                        <div className="text-center">
                          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-1" />
                          <span className="text-green-600 text-sm font-medium">
                            İmzalandı
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Bekliyor</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{client?.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSignature className="w-5 h-5" />
                  İmza Durumu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Durum</span>
                    <Badge className={getStatusColor(contract.status)} size="md">
                      {getStatusLabel(contract.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Oluşturulma</span>
                    <span className="text-gray-900">
                      {formatDate(contract.createdAt)}
                    </span>
                  </div>
                  {contract.signedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">İmzalanma</span>
                      <span className="text-green-600 font-medium">
                        {formatDateTime(contract.signedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Project */}
            {project && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="w-5 h-5" />
                    İlişkili Proje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">{project.clientName}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusLabel(project.status)}
                    </Badge>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Projeye Git
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Client Info */}
            {client && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Müşteri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900">{client.company}</p>
                      <p className="text-sm text-gray-500">{client.name}</p>
                    </div>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                    <Link href={`/clients/${client.id}`}>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Müşteriye Git
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
