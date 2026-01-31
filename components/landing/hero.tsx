'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] rounded-full bg-emerald-50/50 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="text-4xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.1] mb-8">
              Ajansınızı yönetmek için ihtiyacınız olan{' '}
              <span className="relative inline-block">
                her şey
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-emerald-300 -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
              Meanval&apos;in akıllı otomasyon özellikli hepsi bir arada ürün paketi,
              kağıt işlerine değil tutkunuza odaklanmanızı sağlar.
            </p>

            {/* Email Capture Form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0 mb-6">
              <input
                type="email"
                placeholder="E-posta adresinizi girin"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-800 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 shadow-sm"
              />
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-14 px-8 rounded-lg font-bold text-lg uppercase tracking-wide bg-primary-800 text-white hover:bg-primary-900 transition-colors w-full sm:w-auto"
              >
                Ücretsiz Başla
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                7 gün ücretsiz deneme
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Kredi kartı gerekmez
              </span>
            </div>
          </div>

          {/* Right Side - Dashboard Visual */}
          <div className="flex-1 w-full relative">
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 p-2 lg:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-50 rounded-t-lg border-b border-gray-100 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="pt-8 p-6">
                {/* Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-32 bg-gray-800 rounded"></div>
                    <div className="h-8 w-24 bg-emerald-500 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="h-3 w-16 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 w-20 bg-gray-800 rounded"></div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="h-3 w-16 bg-emerald-200 rounded mb-2"></div>
                      <div className="h-6 w-20 bg-emerald-800 rounded"></div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="h-3 w-16 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 w-20 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
                    <div className="h-3 w-3/5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Teklif Onaylandı</div>
                  <div className="font-bold text-gray-900">₺124.000,00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
