import {
  FileText,
  Users,
  Briefcase,
  LayoutDashboard,
  Check,
  X as XIcon,
  Quote,
} from 'lucide-react'

export function TrustedBy() {
  return (
    <section className="border-b border-gray-100 bg-white py-10">
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-400 font-medium mb-8 text-sm uppercase tracking-widest">
          500.000+ ajans ve kuruluş tarafından tercih ediliyor
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <h3 className="text-2xl font-bold text-gray-800">
            ACME<span className="text-emerald-600">.inc</span>
          </h3>
          <h3 className="text-2xl font-black tracking-tighter text-gray-800">
            techflow
          </h3>
          <h3 className="text-xl italic font-medium text-gray-800">GlobalUnion</h3>
          <h3 className="text-2xl font-mono font-bold text-gray-800">
            code<span className="text-emerald-600">/</span>craft
          </h3>
        </div>
      </div>
    </section>
  )
}

export function ValueProp() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Daha fazla kazanın, <br />
              <span className="text-emerald-700">daha az yönetin.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Meanval tekliflerinizi, sözleşmelerinizi, zaman takibinizi,
              faturalarınızı ve raporlamanızı entegre eder. İşletmeniz için
              işletim sistemi gibidir.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Without Meanval */}
            <div className="bg-gray-50 p-8 rounded-2xl relative overflow-hidden">
              <h3 className="font-bold text-gray-900 mb-4">Meanval Olmadan</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-500 text-sm">
                  <XIcon className="w-5 h-5 text-red-400 shrink-0" />
                  Birden fazla bağlantısız uygulama
                </li>
                <li className="flex items-start gap-3 text-gray-500 text-sm">
                  <XIcon className="w-5 h-5 text-red-400 shrink-0" />
                  Kaybolan faturalar ve ödemeler
                </li>
                <li className="flex items-start gap-3 text-gray-500 text-sm">
                  <XIcon className="w-5 h-5 text-red-400 shrink-0" />
                  Dağınık elektronik tablolar
                </li>
              </ul>
            </div>
            {/* With Meanval */}
            <div className="bg-primary-900 p-8 rounded-2xl relative overflow-hidden text-white shadow-xl transform md:-translate-y-4">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <LayoutDashboard size={100} />
              </div>
              <h3 className="font-bold text-white mb-4">Meanval ile</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-emerald-100 text-sm">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  Hepsi Bir Arada Platform
                </li>
                <li className="flex items-start gap-3 text-emerald-100 text-sm">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  Otomatik Ödeme Hatırlatıcıları
                </li>
                <li className="flex items-start gap-3 text-emerald-100 text-sm">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  Profesyonel Müşteri Portalı
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeatureProposals() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-100 shadow-sm aspect-[4/3] flex items-center justify-center relative">
              <div className="w-3/4 bg-white rounded shadow-lg p-6 space-y-4">
                <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                <div className="h-8 bg-gray-800 rounded w-2/3"></div>
                <div className="space-y-2 pt-4">
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                  <div className="h-2 bg-gray-100 rounded w-full"></div>
                  <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                </div>
                <div className="flex justify-end pt-4">
                  <div className="h-8 w-24 bg-emerald-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4 uppercase tracking-wider text-sm">
              <FileText className="w-5 h-5" />
              Teklifler
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Daha fazla iş kazanın.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Dakikalar içinde profesyonel teklifler oluşturun ve özelleştirin.
              Müşterilere gönderin, çevrimiçi imzalatın ve otomatik olarak fatura
              oluşturun.
            </p>
            <a
              href="#"
              className="text-emerald-700 font-bold hover:underline flex items-center group"
            >
              Teklifleri Keşfet
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeatureCRM() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4 uppercase tracking-wider text-sm">
              <Users className="w-5 h-5" />
              Müşteri CRM
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Düzenli kalın.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Müşterilerinizi ve devam eden projelerinizi tek bir panelden yönetin.
              Birden fazla uygulama arasında geçiş yapmadan ödemeleri, görevleri
              ve dosyaları takip edin.
            </p>
            <a
              href="#"
              className="text-emerald-700 font-bold hover:underline flex items-center group"
            >
              CRM&apos;i Keşfet
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
          <div className="flex-1">
            <div className="bg-amber-50 rounded-xl p-8 border border-amber-100 shadow-sm aspect-[4/3] flex items-center justify-center">
              <div className="w-3/4 bg-white rounded shadow-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-800 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-gray-50 rounded border border-gray-100"></div>
                  <div className="h-20 bg-gray-50 rounded border border-gray-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeatureContracts() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 shadow-sm aspect-[4/3] flex items-center justify-center">
              <div className="w-3/4 bg-white rounded shadow-lg p-8">
                <div className="border-b-2 border-gray-100 pb-4 mb-4">
                  <div className="h-6 w-1/2 bg-gray-800 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-8 flex gap-4">
                  <div className="h-10 w-1/2 bg-emerald-100 border border-emerald-500 rounded text-emerald-800 flex items-center justify-center font-bold text-xs">
                    Dijital İmzalı
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4 uppercase tracking-wider text-sm">
              <Briefcase className="w-5 h-5" />
              Sözleşmeler
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              İşletmenizi koruyun.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Ajanslar ve yazılım geliştirme için tasarlanmış, onaylanmış sözleşme
              şablonları. Fikri mülkiyetinizi koruyun ve yasal olarak bağlayıcı
              e-imzalarla zamanında ödeme alın.
            </p>
            <a
              href="#"
              className="text-emerald-700 font-bold hover:underline flex items-center group"
            >
              Sözleşmeleri Keşfet
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Testimonial() {
  return (
    <section id="testimonial" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <Quote className="w-12 h-12 text-emerald-500 mx-auto mb-8 opacity-50" />
        <h3 className="text-2xl md:text-4xl font-bold leading-tight text-gray-800 mb-10">
          &quot;Yazılım ajansı kurmak isteyen herkes için Meanval en iyi hepsi bir
          arada çözüm. Tekliflerimi, sözleşmelerimi ve faturalarımı mükemmel
          yönetiyor.&quot;
        </h3>
        <div className="flex flex-col items-center">
          <div className="font-bold text-gray-900 tracking-wide uppercase text-sm mb-2">
            David S.
          </div>
          <div className="text-gray-500">Kurucu, Digital Nexus</div>
        </div>
      </div>
    </section>
  )
}
