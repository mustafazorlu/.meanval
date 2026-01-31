'use client'

import { useRouter } from 'next/navigation'
import { Plus, Calendar, CheckCircle, Clock, FileText } from 'lucide-react'
import { Header, DataTable } from '@/components/admin'
import { Badge, Button } from '@/components/ui'
import { useData } from '@/lib/data-context'
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Contract } from '@/lib/types'

const columns = [
  {
    key: 'number',
    label: 'Sözleşme No',
    render: (contract: Contract) => (
      <span className="font-medium text-gray-900">{contract.number}</span>
    ),
  },
  {
    key: 'project',
    label: 'Proje',
    render: (contract: Contract) => (
      <div>
        <p className="font-medium text-gray-900">{contract.projectName}</p>
        <p className="text-sm text-gray-500">{contract.clientName}</p>
      </div>
    ),
  },
  {
    key: 'createdAt',
    label: 'Oluşturulma',
    render: (contract: Contract) => (
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Calendar className="w-4 h-4 text-gray-400" />
        {formatDate(contract.createdAt)}
      </div>
    ),
  },
  {
    key: 'signedAt',
    label: 'İmza Tarihi',
    render: (contract: Contract) =>
      contract.signedAt ? (
        <div className="flex items-center gap-1 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          {formatDate(contract.signedAt)}
        </div>
      ) : (
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          Bekliyor
        </div>
      ),
  },
  {
    key: 'status',
    label: 'Durum',
    render: (contract: Contract) => (
      <Badge className={getStatusColor(contract.status)}>
        {getStatusLabel(contract.status)}
      </Badge>
    ),
  },
]

export default function ContractsPage() {
  const router = useRouter()
  const { contracts } = useData()

  return (
    <div>
      <Header title="Sözleşmeler" />

      <div className="p-6">
        <DataTable
          columns={columns}
          data={contracts}
          onRowClick={(contract) => router.push(`/contracts/${contract.id}`)}
          searchPlaceholder="Sözleşme ara..."
          searchKey="number"
          emptyMessage="Henüz sözleşme bulunmuyor"
          actions={
            <Button
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => router.push('/contracts/new')}
            >
              Yeni Sözleşme
            </Button>
          }
        />
      </div>
    </div>
  )
}
