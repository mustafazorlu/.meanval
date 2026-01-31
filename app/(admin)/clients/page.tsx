'use client'

import { useRouter } from 'next/navigation'
import { Plus, Mail, Phone, Building } from 'lucide-react'
import { Header, DataTable } from '@/components/admin'
import { Badge, Button, Avatar } from '@/components/ui'
import { useData } from '@/lib/data-context'
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Client } from '@/lib/types'

const columns = [
  {
    key: 'name',
    label: 'Müşteri',
    render: (client: Client) => (
      <div className="flex items-center gap-3">
        <Avatar name={client.name} size="md" />
        <div>
          <p className="font-medium text-gray-900">{client.name}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Building className="w-3 h-3" />
            {client.company}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: 'contact',
    label: 'İletişim',
    render: (client: Client) => (
      <div className="text-sm">
        <p className="flex items-center gap-1 text-gray-600">
          <Mail className="w-3 h-3" />
          {client.email}
        </p>
        <p className="flex items-center gap-1 text-gray-600 mt-1">
          <Phone className="w-3 h-3" />
          {client.phone}
        </p>
      </div>
    ),
  },
  {
    key: 'totalProjects',
    label: 'Projeler',
    render: (client: Client) => (
      <span className="font-medium text-gray-900">{client.totalProjects}</span>
    ),
  },
  {
    key: 'totalRevenue',
    label: 'Toplam Gelir',
    render: (client: Client) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(client.totalRevenue)}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Durum',
    render: (client: Client) => (
      <Badge className={getStatusColor(client.status)}>
        {getStatusLabel(client.status)}
      </Badge>
    ),
  },
]

export default function ClientsPage() {
  const router = useRouter()
  const { clients } = useData()

  return (
    <div>
      <Header title="Müşteriler" />

      <div className="p-6">
        <DataTable
          columns={columns}
          data={clients}
          onRowClick={(client) => router.push(`/clients/${client.id}`)}
          searchPlaceholder="Müşteri ara..."
          searchKey="name"
          emptyMessage="Henüz müşteri bulunmuyor"
          actions={
            <Button
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => router.push('/clients/new')}
            >
              Yeni Müşteri
            </Button>
          }
        />
      </div>
    </div>
  )
}
