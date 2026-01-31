'use client'

import { useRouter } from 'next/navigation'
import { Bell, Search, Menu } from 'lucide-react'
import { Avatar } from '@/components/ui'
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/dropdown'
import { useAuth } from '@/lib/auth-context'

interface HeaderProps {
  title?: string
  onMenuClick?: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          {title && <h1 className="text-xl font-semibold text-gray-900">{title}</h1>}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <Dropdown
            align="right"
            trigger={
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar name={user?.name} size="md" />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            }
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <DropdownItem onClick={() => router.push('/settings')}>
              Profil Ayarları
            </DropdownItem>
            <DropdownItem onClick={() => router.push('/settings')}>
              Bildirim Tercihleri
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem danger onClick={logout}>
              Çıkış Yap
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
