'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  FolderKanban,
  FileText,
  FileSignature,
} from 'lucide-react'
import { Header } from '@/components/admin'
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
} from '@/components/ui'
import { useData } from '@/lib/data-context'
import { getNotesByClientId } from '@/lib/mock-data'
import { ClientNotes } from '@/components/admin/client-notes'
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from '@/lib/utils'

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { getClient, projects, proposals, contracts, deleteClient } = useData()

  const client = getClient(id)
  const clientProjects = projects.filter(p => p.clientId === id)
  const clientProposals = proposals.filter(p => p.clientId === id)
  const clientContracts = contracts.filter(c => c.clientId === id)
  const clientNotes = getNotesByClientId(id)

  const handleDelete = () => {
    deleteClient(id)
    router.push('/clients')
  }

  if (!client) {
    return (
      <div>
        <Header title="Müşteri Bulunamadı" />
        <div className="p-6">
          <p className="text-gray-500">
            Bu müşteri bulunamadı veya silinmiş olabilir.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/clients')}
          >
            Müşterilere Dön
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header title={client.name} />

      <div className="p-6 space-y-6">
        {/* Back Button and Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push('/clients')}
          >
            Müşterilere Dön
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit className="w-4 h-4" />}
              onClick={() => router.push(`/clients/${id}/edit`)}
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Müşteriyi Sil</h3>
              <p className="text-gray-600 mb-6">
                &quot;{client.name}&quot; müşterisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Client Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar name={client.name} size="xl" className="mb-4" />
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {client.name}
                  </h2>
                  <p className="text-gray-500 flex items-center gap-1 mb-3">
                    <Building className="w-4 h-4" />
                    {client.company}
                  </p>
                  <Badge className={getStatusColor(client.status)} size="md">
                    {getStatusLabel(client.status)}
                  </Badge>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a
                      href={`mailto:${client.email}`}
                      className="text-primary-700 hover:underline"
                    >
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${client.phone}`} className="text-gray-900">
                      {client.phone}
                    </a>
                  </div>
                  {client.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{client.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">
                      {formatDate(client.createdAt)} tarihinde eklendi
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary-800">
                      {client.totalProjects}
                    </p>
                    <p className="text-sm text-primary-600">Proje</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-800">
                      {formatCurrency(client.totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600">Toplam Gelir</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Related Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5" />
                  Projeler ({clientProjects.length})
                </CardTitle>
                <Link href={`/projects/new?clientId=${client.id}`}>
                  <Button size="sm" variant="outline">
                    Yeni Proje
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {clientProjects.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {clientProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {project.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(project.budget)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    Henüz proje bulunmuyor
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Proposals */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Teklifler ({clientProposals.length})
                </CardTitle>
                <Link href={`/proposals/new?clientId=${client.id}`}>
                  <Button size="sm" variant="outline">
                    Yeni Teklif
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {clientProposals.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {clientProposals.map((proposal) => (
                      <Link
                        key={proposal.id}
                        href={`/proposals/${proposal.id}`}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {proposal.number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {proposal.projectName} -{' '}
                            {formatCurrency(proposal.amount)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(proposal.status)}>
                          {getStatusLabel(proposal.status)}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    Henüz teklif bulunmuyor
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contracts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileSignature className="w-5 h-5" />
                  Sözleşmeler ({clientContracts.length})
                </CardTitle>
                <Link href={`/contracts/new?clientId=${client.id}`}>
                  <Button size="sm" variant="outline">
                    Yeni Sözleşme
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {clientContracts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {clientContracts.map((contract) => (
                      <Link
                        key={contract.id}
                        href={`/contracts/${contract.id}`}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {contract.number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {contract.projectName}
                          </p>
                        </div>
                        <Badge className={getStatusColor(contract.status)}>
                          {getStatusLabel(contract.status)}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    Henüz sözleşme bulunmuyor
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Client Notes */}
            <ClientNotes notes={clientNotes} clientId={client.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
