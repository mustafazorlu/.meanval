'use client'

import Link from 'next/link'
import { FileText, FileSignature, Receipt, ArrowRight } from 'lucide-react'
import { Navbar, Footer } from '@/components/landing'

const templates = [
  {
    category: 'Teklifler',
    icon: FileText,
    items: [
      { name: 'Yazılım Geliştirme Teklifi', description: 'Yazılım projeleri için kapsamlı teklif şablonu' },
      { name: 'Web Tasarım Teklifi', description: 'Web sitesi ve UI/UX projeleri için' },
      { name: 'Danışmanlık Teklifi', description: 'Danışmanlık hizmetleri için profesyonel şablon' },
      { name: 'Mobil Uygulama Teklifi', description: 'iOS ve Android projeleri için' },
    ],
  },
  {
    category: 'Sözleşmeler',
    icon: FileSignature,
    items: [
      { name: 'Hizmet Sözleşmesi', description: 'Genel hizmet sözleşmesi şablonu' },
      { name: 'NDA (Gizlilik Sözleşmesi)', description: 'Ticari sırların korunması için' },
      { name: 'Freelance Sözleşmesi', description: 'Serbest çalışanlar için' },
      { name: 'Bakım Sözleşmesi', description: 'Yazılım bakım ve destek hizmetleri için' },
    ],
  },
  {
    category: 'Faturalar',
    icon: Receipt,
    items: [
      { name: 'Standart Fatura', description: 'Temel fatura şablonu' },
      { name: 'Detaylı Fatura', description: 'Kalem bazlı detaylı faturalama' },
      { name: 'Abonelik Faturası', description: 'Aylık/yıllık abonelikler için' },
      { name: 'Proforma Fatura', description: 'Ön faturalama için' },
    ],
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Profesyonel Şablonlar
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teklifler, sözleşmeler ve faturalar için hazır şablonlarımızla
              zamandan tasarruf edin.
            </p>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="space-y-16">
              {templates.map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.category}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Icon className="w-6 h-6 text-primary-700" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {category.category}
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
                        >
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-700">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            {item.description}
                          </p>
                          <span className="text-primary-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Önizle <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Tüm şablonlara erişim sağlayın
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Ücretsiz deneme ile tüm profesyonel şablonlarımıza anında erişin.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-bold bg-white text-primary-900 hover:bg-primary-50 transition-colors"
            >
              Ücretsiz Başla
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
