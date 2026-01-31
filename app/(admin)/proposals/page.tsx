'use client'

import { useRouter } from 'next/navigation'
import { Plus, Calendar } from 'lucide-react'
import { Header, DataTable } from '@/components/admin'
import { Badge, Button } from '@/components/ui'
import { useData } from '@/lib/data-context'
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'
import { Proposal } from '@/lib/types'

const columns = [
  {
    key: 'number',
    label: 'Teklif No',
    render: (proposal: Proposal) => (
      <span className="font-medium text-gray-900">{proposal.number}</span>
    ),
  },
  {
    key: 'client',
    label: 'Müşteri',
    render: (proposal: Proposal) => (
      <div>
        <p className="font-medium text-gray-900">{proposal.clientName}</p>
        <p className="text-sm text-gray-500">{proposal.projectName}</p>
      </div>
    ),
  },
  {
    key: 'amount',
    label: 'Tutar',
    render: (proposal: Proposal) => (
      <span className="font-bold text-gray-900">
        {formatCurrency(proposal.amount)}
      </span>
    ),
  },
  {
    key: 'validUntil',
    label: 'Geçerlilik',
    render: (proposal: Proposal) => {
      const isExpired = new Date(proposal.validUntil) < new Date()
      return (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className={isExpired ? 'text-red-600' : 'text-gray-600'}>
            {formatDate(proposal.validUntil)}
          </span>
        </div>
      )
    },
  },
  {
    key: 'status',
    label: 'Durum',
    render: (proposal: Proposal) => (
      <Badge className={getStatusColor(proposal.status)}>
        {getStatusLabel(proposal.status)}
      </Badge>
    ),
  },
]

export default function ProposalsPage() {
  const router = useRouter()
  const { proposals } = useData()

  return (
    <div>
      <Header title="Teklifler" />

      <div className="p-6">
        <DataTable
          columns={columns}
          data={proposals}
          onRowClick={(proposal) => router.push(`/proposals/${proposal.id}`)}
          searchPlaceholder="Teklif ara..."
          searchKey="number"
          emptyMessage="Henüz teklif bulunmuyor"
          actions={
            <Button
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => router.push('/proposals/new')}
            >
              Yeni Teklif
            </Button>
          }
        />
      </div>
    </div>
  )
}
