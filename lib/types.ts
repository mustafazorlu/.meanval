// User Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'manager' | 'member'
  company?: string
  phone?: string
}

// Client Types
export type ClientStatus = 'active' | 'inactive'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address?: string
  status: ClientStatus
  totalProjects: number
  totalRevenue: number
  createdAt: Date
}

// Project Types
export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'

export interface Project {
  id: string
  name: string
  description: string
  clientId: string
  clientName?: string
  status: ProjectStatus
  startDate: Date
  endDate: Date
  budget: number
  progress: number
  tasks?: Task[]
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  completed: boolean
  dueDate?: Date
}

// Proposal Types
export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'rejected'

export interface Proposal {
  id: string
  number: string
  clientId: string
  clientName?: string
  projectName: string
  description?: string
  amount: number
  status: ProposalStatus
  validUntil: Date
  items?: ProposalItem[]
  createdAt: Date
}

export interface ProposalItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

// Contract Types
export type ContractStatus = 'draft' | 'pending_signature' | 'signed'

export interface Contract {
  id: string
  number: string
  projectId: string
  projectName?: string
  clientId: string
  clientName?: string
  status: ContractStatus
  content?: string
  signedAt?: Date
  createdAt: Date
}

// Activity Types
export interface Activity {
  id: string
  type: 'project' | 'client' | 'proposal' | 'contract' | 'payment'
  action: string
  description: string
  timestamp: Date
  userId?: string
  relatedId?: string
}

// Dashboard Stats
export interface DashboardStats {
  totalProjects: number
  activeClients: number
  pendingProposals: number
  totalRevenue: number
  projectsByStatus: Record<ProjectStatus, number>
  monthlyRevenue: { label: string; value: number }[]
}

// Nav Types
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

// Client Notes
export interface ClientNote {
  id: string
  clientId: string
  date: Date
  content: string
  type: 'meeting' | 'call' | 'email'
}

// Project Showcase Types
export type ShowcaseStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected'

export interface ShowcaseItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
  category: 'feature' | 'service' | 'support' | 'other'
}

export interface ProjectShowcase {
  id: string
  projectId: string
  title: string
  introduction: string
  items: ShowcaseItem[]
  totalAmount: number
  discount?: number
  finalAmount: number
  notes?: string
  status: ShowcaseStatus
  sentAt?: Date
  viewedAt?: Date
  respondedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Form Types
export interface SelectOption {
  value: string
  label: string
}
