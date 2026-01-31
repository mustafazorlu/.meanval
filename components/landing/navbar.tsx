'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Ürün', href: '/#features' },
  { label: 'Şablonlar', href: '/templates' },
  { label: 'Fiyatlar', href: '/pricing' },
  { label: 'Değerlendirmeler', href: '/#testimonial' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white lg:bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <span className="font-sans font-bold text-3xl tracking-tight text-primary-800">
            meanval
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              {item.label}
              {item.label === 'Ürün' && (
                <ChevronDown className="w-4 h-4 opacity-50" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-primary-800 font-bold text-sm hover:underline px-4"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center h-9 px-6 rounded-lg font-medium text-xs uppercase tracking-wide bg-primary-800 text-white hover:bg-primary-900 transition-colors"
          >
            Ücretsiz Başla
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 space-y-6 animate-fade-in lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4 flex justify-between items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
              {item.label === 'Ürün' && <ChevronDown className="w-5 h-5" />}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/register"
              className="w-full py-3 bg-primary-800 text-white font-bold rounded-lg text-center hover:bg-primary-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ücretsiz Başla
            </Link>
            <Link
              href="/login"
              className="w-full py-3 text-primary-800 font-bold border border-primary-800 rounded-lg text-center hover:bg-primary-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
