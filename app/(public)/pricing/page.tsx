'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { Navbar, Footer } from '@/components/landing'

const plans = [
  {
    name: 'Başlangıç',
    price: '0',
    description: 'Küçük projeler için ideal',
    features: [
      '3 aktif proje',
      '5 müşteri',
      'Temel şablonlar',
      'E-posta desteği',
    ],
    cta: 'Ücretsiz Başla',
    highlighted: false,
  },
  {
    name: 'Profesyonel',
    price: '299',
    description: 'Büyüyen ajanslar için',
    features: [
      'Sınırsız proje',
      'Sınırsız müşteri',
      'Tüm şablonlar',
      'E-imza özelliği',
      'Öncelikli destek',
      'Özel raporlar',
    ],
    cta: 'Denemeyi Başlat',
    highlighted: true,
  },
  {
    name: 'Kurumsal',
    price: '799',
    description: 'Büyük ekipler için',
    features: [
      'Profesyonel tüm özellikler',
      'Sınırsız kullanıcı',
      'API erişimi',
      'Özel entegrasyonlar',
      'Dedicated hesap yöneticisi',
      'SLA garantisi',
    ],
    cta: 'İletişime Geç',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Basit ve Şeffaf Fiyatlandırma
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İhtiyacınıza uygun planı seçin. Tüm planlar 7 gün ücretsiz deneme
              içerir.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl p-8 transition-shadow ${
                    plan.highlighted
                      ? 'border-2 border-primary-500 shadow-xl scale-105'
                      : 'border border-gray-100 shadow-sm hover:shadow'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                      En Popüler
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ₺{plan.price}
                    </span>
                    {plan.price !== '0' && (
                      <span className="text-gray-500">/ay</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Check className="w-5 h-5 text-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`block w-full py-3 rounded-lg font-bold text-center transition-colors ${
                      plan.highlighted
                        ? 'bg-primary-800 text-white hover:bg-primary-900'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Sıkça Sorulan Sorular
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: 'Ücretsiz deneme nasıl çalışır?',
                  a: 'Tüm planlarımız 7 gün ücretsiz deneme içerir. Kredi kartı gerekmez, deneme süresinin sonunda otomatik olarak ücretlendirilmezsiniz.',
                },
                {
                  q: 'Planımı sonradan değiştirebilir miyim?',
                  a: 'Evet, planınızı istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Değişiklikler bir sonraki fatura döneminde geçerli olur.',
                },
                {
                  q: 'İptal politikanız nedir?',
                  a: 'İstediğiniz zaman iptal edebilirsiniz. İptal ettiğinizde, mevcut fatura döneminizin sonuna kadar hizmeti kullanmaya devam edebilirsiniz.',
                },
                {
                  q: 'Ödeme yöntemleri nelerdir?',
                  a: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme kabul ediyoruz.',
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
