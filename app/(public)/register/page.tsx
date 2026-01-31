'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/lib/auth-context'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    const success = await register(name, email, password)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Kayıt başarısız. Lütfen tekrar deneyin.')
    }
  }

  const features = [
    'Sınırsız proje yönetimi',
    'Profesyonel teklif şablonları',
    'E-imza ile sözleşmeler',
    'Detaylı raporlama',
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decoration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-800 to-primary-900 items-center justify-center p-16">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">
            7 gün ücretsiz deneyin
          </h2>
          <p className="text-lg text-emerald-100 leading-relaxed mb-8">
            Kredi kartı gerekmez. İstediğiniz zaman iptal edebilirsiniz.
          </p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-100">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="inline-block mb-8">
            <span className="font-bold text-3xl text-primary-800">meanval</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hesap Oluşturun</h1>
          <p className="text-gray-600 mb-8">
            Ücretsiz deneme sürümünüzü başlatın
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="relative">
              <Input
                type="text"
                label="Ad Soyad"
                placeholder="Ahmet Yılmaz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-[38px]" />
            </div>

            <div className="relative">
              <Input
                type="email"
                label="E-posta"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-[38px]" />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Şifre"
                placeholder="En az 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-[38px]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Şifre Tekrar"
                placeholder="Şifrenizi tekrar girin"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
              />
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-[38px]" />
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span>
                <Link href="#" className="text-primary-700 hover:underline">
                  Kullanım Şartları
                </Link>{' '}
                ve{' '}
                <Link href="#" className="text-primary-700 hover:underline">
                  Gizlilik Politikası
                </Link>
                &apos;nı kabul ediyorum
              </span>
            </label>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Ücretsiz Başla
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link
              href="/login"
              className="text-primary-700 font-semibold hover:underline"
            >
              Giriş yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
