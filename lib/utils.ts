import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'Az önce'
  if (diffMins < 60) return `${diffMins} dakika önce`
  if (diffHours < 24) return `${diffHours} saat önce`
  if (diffDays < 7) return `${diffDays} gün önce`
  return formatDate(d)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Project statuses
    planning: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    review: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    on_hold: 'bg-gray-100 text-gray-800',
    // Proposal statuses
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    // Contract statuses
    pending_signature: 'bg-yellow-100 text-yellow-800',
    signed: 'bg-green-100 text-green-800',
    // Client statuses
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    // Project statuses
    planning: 'Planlama',
    in_progress: 'Devam Ediyor',
    review: 'İnceleme',
    completed: 'Tamamlandı',
    on_hold: 'Beklemede',
    // Proposal statuses
    draft: 'Taslak',
    sent: 'Gönderildi',
    accepted: 'Onaylandı',
    rejected: 'Reddedildi',
    // Contract statuses
    pending_signature: 'İmza Bekliyor',
    signed: 'İmzalandı',
    // Client statuses
    active: 'Aktif',
    inactive: 'Pasif',
  }
  return labels[status] || status
}

export function calculateProgress(tasks: { completed: boolean }[]): number {
  if (!tasks || tasks.length === 0) return 0
  const completed = tasks.filter(t => t.completed).length
  return Math.round((completed / tasks.length) * 100)
}
