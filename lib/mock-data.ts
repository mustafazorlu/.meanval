import { User, Client, Project, Proposal, Contract, Activity, DashboardStats, ClientNote, ProjectShowcase } from './types'

// Current User
export const currentUser: User = {
  id: 'user-1',
  name: 'Ahmet Yılmaz',
  email: 'ahmet@meanval.com',
  avatar: undefined,
  role: 'admin',
  company: 'Meanval Tech',
  phone: '+90 532 123 4567',
}

// Clients
export const clients: Client[] = [
  {
    id: 'client-1',
    name: 'Mehmet Kaya',
    email: 'mehmet@acmeinc.com',
    phone: '+90 533 111 2222',
    company: 'ACME Inc.',
    address: 'Levent, İstanbul',
    status: 'active',
    totalProjects: 3,
    totalRevenue: 245000,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'client-2',
    name: 'Ayşe Demir',
    email: 'ayse@techflow.io',
    phone: '+90 534 222 3333',
    company: 'TechFlow',
    address: 'Kadıköy, İstanbul',
    status: 'active',
    totalProjects: 2,
    totalRevenue: 180000,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'client-3',
    name: 'Ali Öztürk',
    email: 'ali@globalunion.org',
    phone: '+90 535 333 4444',
    company: 'Global Union',
    address: 'Çankaya, Ankara',
    status: 'active',
    totalProjects: 1,
    totalRevenue: 75000,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'client-4',
    name: 'Zeynep Arslan',
    email: 'zeynep@codecraft.dev',
    phone: '+90 536 444 5555',
    company: 'CodeCraft',
    address: 'Alsancak, İzmir',
    status: 'inactive',
    totalProjects: 1,
    totalRevenue: 45000,
    createdAt: new Date('2024-04-05'),
  },
  {
    id: 'client-5',
    name: 'Can Yıldız',
    email: 'can@digitalnexus.co',
    phone: '+90 537 555 6666',
    company: 'Digital Nexus',
    address: 'Beşiktaş, İstanbul',
    status: 'active',
    totalProjects: 2,
    totalRevenue: 320000,
    createdAt: new Date('2024-05-12'),
  },
]

// Projects
export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'E-Ticaret Platformu',
    description: 'Kapsamlı bir e-ticaret platformu geliştirme projesi. Ürün yönetimi, sepet, ödeme entegrasyonu ve admin paneli içerir.',
    clientId: 'client-1',
    clientName: 'ACME Inc.',
    status: 'in_progress',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-09-30'),
    budget: 150000,
    progress: 65,
    tasks: [
      { id: 't1', title: 'Veritabanı tasarımı', completed: true },
      { id: 't2', title: 'API geliştirme', completed: true },
      { id: 't3', title: 'Frontend geliştirme', completed: false },
      { id: 't4', title: 'Ödeme entegrasyonu', completed: false },
      { id: 't5', title: 'Test ve QA', completed: false },
    ],
    createdAt: new Date('2024-05-15'),
  },
  {
    id: 'proj-2',
    name: 'Mobil Uygulama',
    description: 'iOS ve Android için native mobil uygulama geliştirme.',
    clientId: 'client-2',
    clientName: 'TechFlow',
    status: 'planning',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-12-31'),
    budget: 200000,
    progress: 10,
    tasks: [
      { id: 't1', title: 'Gereksinim analizi', completed: true },
      { id: 't2', title: 'UI/UX tasarımı', completed: false },
      { id: 't3', title: 'iOS geliştirme', completed: false },
      { id: 't4', title: 'Android geliştirme', completed: false },
    ],
    createdAt: new Date('2024-07-01'),
  },
  {
    id: 'proj-3',
    name: 'CRM Sistemi',
    description: 'Özelleştirilmiş müşteri ilişkileri yönetim sistemi.',
    clientId: 'client-1',
    clientName: 'ACME Inc.',
    status: 'completed',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-05-30'),
    budget: 95000,
    progress: 100,
    tasks: [
      { id: 't1', title: 'Analiz', completed: true },
      { id: 't2', title: 'Geliştirme', completed: true },
      { id: 't3', title: 'Test', completed: true },
      { id: 't4', title: 'Deployment', completed: true },
    ],
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'proj-4',
    name: 'Web Sitesi Yenileme',
    description: 'Kurumsal web sitesi modern tasarım ile yenileme.',
    clientId: 'client-3',
    clientName: 'Global Union',
    status: 'review',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-08-15'),
    budget: 45000,
    progress: 85,
    tasks: [
      { id: 't1', title: 'Tasarım', completed: true },
      { id: 't2', title: 'Geliştirme', completed: true },
      { id: 't3', title: 'İçerik girişi', completed: true },
      { id: 't4', title: 'Son kontroller', completed: false },
    ],
    createdAt: new Date('2024-06-20'),
  },
  {
    id: 'proj-5',
    name: 'API Entegrasyonu',
    description: 'Üçüncü parti API entegrasyonları ve otomasyon.',
    clientId: 'client-5',
    clientName: 'Digital Nexus',
    status: 'in_progress',
    startDate: new Date('2024-07-15'),
    endDate: new Date('2024-09-15'),
    budget: 75000,
    progress: 40,
    tasks: [
      { id: 't1', title: 'API analizi', completed: true },
      { id: 't2', title: 'Entegrasyon geliştirme', completed: false },
      { id: 't3', title: 'Test', completed: false },
    ],
    createdAt: new Date('2024-07-10'),
  },
  {
    id: 'proj-6',
    name: 'Dashboard Geliştirme',
    description: 'Veri analitik dashboard geliştirme projesi.',
    clientId: 'client-5',
    clientName: 'Digital Nexus',
    status: 'on_hold',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-11-30'),
    budget: 120000,
    progress: 0,
    tasks: [],
    createdAt: new Date('2024-08-15'),
  },
]

// Proposals
export const proposals: Proposal[] = [
  {
    id: 'prop-1',
    number: 'TEK-2024-001',
    clientId: 'client-2',
    clientName: 'TechFlow',
    projectName: 'Mobil Uygulama',
    description: 'iOS ve Android platformları için tam kapsamlı mobil uygulama geliştirme teklifi.',
    amount: 200000,
    status: 'accepted',
    validUntil: new Date('2024-08-15'),
    items: [
      { id: 'i1', description: 'UI/UX Tasarım', quantity: 1, unitPrice: 30000, total: 30000 },
      { id: 'i2', description: 'iOS Geliştirme', quantity: 1, unitPrice: 75000, total: 75000 },
      { id: 'i3', description: 'Android Geliştirme', quantity: 1, unitPrice: 75000, total: 75000 },
      { id: 'i4', description: 'Test ve QA', quantity: 1, unitPrice: 20000, total: 20000 },
    ],
    createdAt: new Date('2024-07-01'),
  },
  {
    id: 'prop-2',
    number: 'TEK-2024-002',
    clientId: 'client-3',
    clientName: 'Global Union',
    projectName: 'Web Sitesi Yenileme',
    description: 'Kurumsal web sitesi yenileme ve modernizasyon teklifi.',
    amount: 45000,
    status: 'accepted',
    validUntil: new Date('2024-07-15'),
    items: [
      { id: 'i1', description: 'Tasarım', quantity: 1, unitPrice: 15000, total: 15000 },
      { id: 'i2', description: 'Geliştirme', quantity: 1, unitPrice: 25000, total: 25000 },
      { id: 'i3', description: 'SEO Optimizasyonu', quantity: 1, unitPrice: 5000, total: 5000 },
    ],
    createdAt: new Date('2024-06-20'),
  },
  {
    id: 'prop-3',
    number: 'TEK-2024-003',
    clientId: 'client-4',
    clientName: 'CodeCraft',
    projectName: 'SaaS Platform',
    description: 'Yeni SaaS platformu geliştirme teklifi.',
    amount: 350000,
    status: 'sent',
    validUntil: new Date('2024-09-30'),
    items: [
      { id: 'i1', description: 'Mimari Tasarım', quantity: 1, unitPrice: 50000, total: 50000 },
      { id: 'i2', description: 'Backend Geliştirme', quantity: 1, unitPrice: 150000, total: 150000 },
      { id: 'i3', description: 'Frontend Geliştirme', quantity: 1, unitPrice: 100000, total: 100000 },
      { id: 'i4', description: 'DevOps & Deployment', quantity: 1, unitPrice: 50000, total: 50000 },
    ],
    createdAt: new Date('2024-08-01'),
  },
  {
    id: 'prop-4',
    number: 'TEK-2024-004',
    clientId: 'client-1',
    clientName: 'ACME Inc.',
    projectName: 'Bakım ve Destek Paketi',
    description: 'Yıllık bakım ve teknik destek hizmeti teklifi.',
    amount: 48000,
    status: 'draft',
    validUntil: new Date('2024-10-15'),
    items: [
      { id: 'i1', description: 'Aylık Bakım', quantity: 12, unitPrice: 3000, total: 36000 },
      { id: 'i2', description: 'Acil Destek Kredisi', quantity: 1, unitPrice: 12000, total: 12000 },
    ],
    createdAt: new Date('2024-08-10'),
  },
  {
    id: 'prop-5',
    number: 'TEK-2024-005',
    clientId: 'client-5',
    clientName: 'Digital Nexus',
    projectName: 'Veri Analitik Platformu',
    description: 'Özelleştirilmiş veri analitik ve raporlama platformu.',
    amount: 280000,
    status: 'rejected',
    validUntil: new Date('2024-08-01'),
    items: [
      { id: 'i1', description: 'Veri Modelleme', quantity: 1, unitPrice: 40000, total: 40000 },
      { id: 'i2', description: 'Dashboard Geliştirme', quantity: 1, unitPrice: 120000, total: 120000 },
      { id: 'i3', description: 'Entegrasyonlar', quantity: 1, unitPrice: 80000, total: 80000 },
      { id: 'i4', description: 'Eğitim', quantity: 1, unitPrice: 40000, total: 40000 },
    ],
    createdAt: new Date('2024-07-15'),
  },
]

// Contracts
export const contracts: Contract[] = [
  {
    id: 'cont-1',
    number: 'SÖZ-2024-001',
    projectId: 'proj-1',
    projectName: 'E-Ticaret Platformu',
    clientId: 'client-1',
    clientName: 'ACME Inc.',
    status: 'signed',
    content: 'E-Ticaret Platformu Geliştirme Sözleşmesi...',
    signedAt: new Date('2024-05-20'),
    createdAt: new Date('2024-05-15'),
  },
  {
    id: 'cont-2',
    number: 'SÖZ-2024-002',
    projectId: 'proj-2',
    projectName: 'Mobil Uygulama',
    clientId: 'client-2',
    clientName: 'TechFlow',
    status: 'signed',
    content: 'Mobil Uygulama Geliştirme Sözleşmesi...',
    signedAt: new Date('2024-07-25'),
    createdAt: new Date('2024-07-20'),
  },
  {
    id: 'cont-3',
    number: 'SÖZ-2024-003',
    projectId: 'proj-4',
    projectName: 'Web Sitesi Yenileme',
    clientId: 'client-3',
    clientName: 'Global Union',
    status: 'signed',
    content: 'Web Sitesi Yenileme Sözleşmesi...',
    signedAt: new Date('2024-06-28'),
    createdAt: new Date('2024-06-25'),
  },
  {
    id: 'cont-4',
    number: 'SÖZ-2024-004',
    projectId: 'proj-5',
    projectName: 'API Entegrasyonu',
    clientId: 'client-5',
    clientName: 'Digital Nexus',
    status: 'pending_signature',
    content: 'API Entegrasyonu Sözleşmesi...',
    createdAt: new Date('2024-07-12'),
  },
  {
    id: 'cont-5',
    number: 'SÖZ-2024-005',
    projectId: 'proj-6',
    projectName: 'Dashboard Geliştirme',
    clientId: 'client-5',
    clientName: 'Digital Nexus',
    status: 'draft',
    content: 'Dashboard Geliştirme Sözleşmesi...',
    createdAt: new Date('2024-08-10'),
  },
]

// Activities
export const activities: Activity[] = [
  {
    id: 'act-1',
    type: 'proposal',
    action: 'created',
    description: 'Yeni teklif oluşturuldu: TEK-2024-004',
    timestamp: new Date('2024-08-10T14:30:00'),
    relatedId: 'prop-4',
  },
  {
    id: 'act-2',
    type: 'project',
    action: 'updated',
    description: 'E-Ticaret Platformu projesi %65 ilerleme kaydetti',
    timestamp: new Date('2024-08-09T16:45:00'),
    relatedId: 'proj-1',
  },
  {
    id: 'act-3',
    type: 'contract',
    action: 'sent',
    description: 'API Entegrasyonu sözleşmesi imza için gönderildi',
    timestamp: new Date('2024-08-08T11:20:00'),
    relatedId: 'cont-4',
  },
  {
    id: 'act-4',
    type: 'client',
    action: 'created',
    description: 'Yeni müşteri eklendi: Digital Nexus',
    timestamp: new Date('2024-08-07T09:15:00'),
    relatedId: 'client-5',
  },
  {
    id: 'act-5',
    type: 'payment',
    action: 'received',
    description: 'TechFlow\'dan 50.000 TL ödeme alındı',
    timestamp: new Date('2024-08-06T15:00:00'),
  },
  {
    id: 'act-6',
    type: 'proposal',
    action: 'rejected',
    description: 'TEK-2024-005 teklifi reddedildi',
    timestamp: new Date('2024-08-05T10:30:00'),
    relatedId: 'prop-5',
  },
  {
    id: 'act-7',
    type: 'project',
    action: 'completed',
    description: 'CRM Sistemi projesi tamamlandı',
    timestamp: new Date('2024-08-04T17:00:00'),
    relatedId: 'proj-3',
  },
]

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalProjects: projects.length,
  activeClients: clients.filter(c => c.status === 'active').length,
  pendingProposals: proposals.filter(p => p.status === 'sent' || p.status === 'draft').length,
  totalRevenue: clients.reduce((sum, c) => sum + c.totalRevenue, 0),
  projectsByStatus: {
    planning: projects.filter(p => p.status === 'planning').length,
    in_progress: projects.filter(p => p.status === 'in_progress').length,
    review: projects.filter(p => p.status === 'review').length,
    completed: projects.filter(p => p.status === 'completed').length,
    on_hold: projects.filter(p => p.status === 'on_hold').length,
  },
  monthlyRevenue: [
    { label: 'Oca', value: 45000 },
    { label: 'Şub', value: 62000 },
    { label: 'Mar', value: 78000 },
    { label: 'Nis', value: 55000 },
    { label: 'May', value: 95000 },
    { label: 'Haz', value: 120000 },
    { label: 'Tem', value: 145000 },
    { label: 'Ağu', value: 165000 },
  ],
}

// Helper functions to get data
export function getClientById(id: string): Client | undefined {
  return clients.find(c => c.id === id)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getProposalById(id: string): Proposal | undefined {
  return proposals.find(p => p.id === id)
}

export function getContractById(id: string): Contract | undefined {
  return contracts.find(c => c.id === id)
}

export function getProjectsByClientId(clientId: string): Project[] {
  return projects.filter(p => p.clientId === clientId)
}

export function getProposalsByClientId(clientId: string): Proposal[] {
  return proposals.filter(p => p.clientId === clientId)
}

export function getContractsByClientId(clientId: string): Contract[] {
  return contracts.filter(c => c.clientId === clientId)
}

// Client Notes
export const clientNotes: ClientNote[] = [
  {
    id: 'note-1',
    clientId: 'client-1',
    date: new Date('2024-08-10T14:00:00'),
    content: 'E-ticaret projesi için detaylı gereksinim toplantısı yapıldı. Müşteri özellikle ödeme entegrasyonları konusunda hassas. Stripe ve iyzico entegrasyonu isteniyor.',
    type: 'meeting',
  },
  {
    id: 'note-2',
    clientId: 'client-1',
    date: new Date('2024-08-08T10:30:00'),
    content: 'Proje ilerleme durumu hakkında telefon görüşmesi. API geliştirmesi tamamlandı, frontend çalışmaları devam ediyor.',
    type: 'call',
  },
  {
    id: 'note-3',
    clientId: 'client-1',
    date: new Date('2024-08-05T09:00:00'),
    content: 'Haftalık ilerleme raporu mail ile gönderildi. Sprint hedefleri ve tamamlanan görevler paylaşıldı.',
    type: 'email',
  },
  {
    id: 'note-4',
    clientId: 'client-2',
    date: new Date('2024-08-09T16:00:00'),
    content: 'Mobil uygulama için UI/UX tasarım toplantısı. Figma üzerinden tasarımlar incelendi, renk paleti onaylandı.',
    type: 'meeting',
  },
  {
    id: 'note-5',
    clientId: 'client-2',
    date: new Date('2024-08-06T11:00:00'),
    content: 'iOS ve Android için native geliştirme yaklaşımı onaylandı. React Native yerine Swift ve Kotlin tercih edildi.',
    type: 'call',
  },
  {
    id: 'note-6',
    clientId: 'client-3',
    date: new Date('2024-08-07T14:30:00'),
    content: 'Web sitesi yenileme projesi için son kontroller yapıldı. İçerik girişi tamamlandı, SEO optimizasyonu kaldı.',
    type: 'meeting',
  },
  {
    id: 'note-7',
    clientId: 'client-5',
    date: new Date('2024-08-08T15:00:00'),
    content: 'API entegrasyon projesi kickoff toplantısı. Teknik gereksinimler ve timeline belirlendi.',
    type: 'meeting',
  },
]

export function getNotesByClientId(clientId: string): ClientNote[] {
  return clientNotes
    .filter(n => n.clientId === clientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Project Showcases
export const projectShowcases: ProjectShowcase[] = [
  {
    id: 'showcase-1',
    projectId: 'proj-1',
    title: 'E-Ticaret Platformu - Teklif Detayları',
    introduction: 'ACME Inc. için hazırlanan kapsamlı e-ticaret platformu projesi teklifimizi aşağıda bulabilirsiniz. Bu platform, modern altyapısı ve güçlü özellikleriyle satışlarınızı artırmanıza yardımcı olacaktır.',
    items: [
      { id: 'si-1', name: 'Ürün Yönetim Modülü', description: 'Kategori yönetimi, varyant desteği, toplu ürün yükleme, stok takibi', quantity: 1, unitPrice: 25000, category: 'feature' },
      { id: 'si-2', name: 'Sepet ve Ödeme Sistemi', description: 'Güvenli sepet yönetimi, çoklu ödeme entegrasyonu (Stripe, iyzico), kupon sistemi', quantity: 1, unitPrice: 35000, category: 'feature' },
      { id: 'si-3', name: 'Admin Paneli', description: 'Sipariş yönetimi, müşteri yönetimi, raporlama, dashboard', quantity: 1, unitPrice: 30000, category: 'feature' },
      { id: 'si-4', name: 'Responsive Tasarım', description: 'Mobil uyumlu, SEO dostu, hızlı yüklenen frontend', quantity: 1, unitPrice: 20000, category: 'feature' },
      { id: 'si-5', name: 'API Geliştirme', description: 'RESTful API, dokümantasyon, 3. parti entegrasyon desteği', quantity: 1, unitPrice: 25000, category: 'service' },
      { id: 'si-6', name: '6 Ay Teknik Destek', description: 'Bug fix, güvenlik güncellemeleri, teknik danışmanlık', quantity: 6, unitPrice: 2500, category: 'support' },
    ],
    totalAmount: 150000,
    discount: 0,
    finalAmount: 150000,
    notes: 'Proje tamamlandıktan sonra 6 ay ücretsiz teknik destek dahildir. Ek özellik talepleri ayrıca değerlendirilecektir.',
    status: 'sent',
    sentAt: new Date('2024-06-01'),
    viewedAt: new Date('2024-06-02'),
    createdAt: new Date('2024-05-28'),
    updatedAt: new Date('2024-05-30'),
  },
  {
    id: 'showcase-2',
    projectId: 'proj-2',
    title: 'Mobil Uygulama - Proje Teklifi',
    introduction: 'TechFlow için tasarlanan iOS ve Android mobil uygulama projemizin detaylarını sunuyoruz. Modern teknolojiler ve native geliştirme yaklaşımıyla yüksek performanslı bir uygulama sunacağız.',
    items: [
      { id: 'si-1', name: 'UI/UX Tasarım', description: 'Kullanıcı araştırması, wireframe, yüksek kaliteli tasarım, prototip', quantity: 1, unitPrice: 30000, category: 'feature' },
      { id: 'si-2', name: 'iOS Uygulama Geliştirme', description: 'Swift ile native iOS uygulaması, App Store yayınlama', quantity: 1, unitPrice: 75000, category: 'feature' },
      { id: 'si-3', name: 'Android Uygulama Geliştirme', description: 'Kotlin ile native Android uygulaması, Play Store yayınlama', quantity: 1, unitPrice: 75000, category: 'feature' },
      { id: 'si-4', name: 'Test ve QA', description: 'Otomatik testler, manuel test, performans optimizasyonu', quantity: 1, unitPrice: 20000, category: 'service' },
    ],
    totalAmount: 200000,
    discount: 0,
    finalAmount: 200000,
    notes: 'Uygulama yayınlandıktan sonra 3 ay ücretsiz hata düzeltme desteği verilecektir.',
    status: 'accepted',
    sentAt: new Date('2024-07-05'),
    viewedAt: new Date('2024-07-06'),
    respondedAt: new Date('2024-07-10'),
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-07-10'),
  },
  {
    id: 'showcase-3',
    projectId: 'proj-5',
    title: 'API Entegrasyonu - Proje Detayları',
    introduction: 'Digital Nexus için hazırlanan API entegrasyon projesi detaylarını içerir. Mevcut sistemlerinizi üçüncü parti servislerle güvenli ve verimli şekilde entegre edeceğiz.',
    items: [
      { id: 'si-1', name: 'API Analiz ve Planlama', description: 'Mevcut sistem analizi, entegrasyon stratejisi, teknik dokümantasyon', quantity: 1, unitPrice: 15000, category: 'service' },
      { id: 'si-2', name: 'Ödeme Sistemleri Entegrasyonu', description: 'Stripe, PayPal, iyzico entegrasyonları', quantity: 3, unitPrice: 10000, category: 'feature' },
      { id: 'si-3', name: 'CRM Entegrasyonu', description: 'Salesforce, HubSpot bağlantısı, veri senkronizasyonu', quantity: 1, unitPrice: 20000, category: 'feature' },
      { id: 'si-4', name: 'Webhook ve Otomasyon', description: 'Event-driven mimari, otomatik iş akışları', quantity: 1, unitPrice: 15000, category: 'feature' },
    ],
    totalAmount: 80000,
    discount: 5000,
    finalAmount: 75000,
    notes: 'Erken teslim için %5 indirim uygulanmıştır.',
    status: 'draft',
    createdAt: new Date('2024-07-10'),
    updatedAt: new Date('2024-07-12'),
  },
]

export function getShowcaseByProjectId(projectId: string): ProjectShowcase | undefined {
  return projectShowcases.find(s => s.projectId === projectId)
}

export function getShowcaseById(id: string): ProjectShowcase | undefined {
  return projectShowcases.find(s => s.id === id)
}
