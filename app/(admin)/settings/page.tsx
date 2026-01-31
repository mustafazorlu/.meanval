'use client'

import { useState } from 'react'
import {
  User,
  Building,
  Bell,
  Shield,
  Mail,
  Phone,
  Save,
  Globe,
  Search,
  Database,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  Check,
  X,
  Play,
  Key,
  Lock,
  LogOut,
} from 'lucide-react'
import { Header } from '@/components/admin'
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Avatar,
  Badge,
} from '@/components/ui'
import { useAuth } from '@/lib/auth-context'
import { formatDate } from '@/lib/utils'

type SettingsTab = 'profile' | 'company' | 'notifications' | 'seo' | 'email' | 'security' | 'database'

interface Migration {
  id: string
  name: string
  version: string
  status: 'pending' | 'completed' | 'failed'
  executedAt?: Date
  description: string
}

const mockMigrations: Migration[] = [
  {
    id: 'mig-1',
    name: 'create_users_table',
    version: '001',
    status: 'completed',
    executedAt: new Date('2024-06-01'),
    description: 'Kullanıcı tablosu oluşturma',
  },
  {
    id: 'mig-2',
    name: 'create_projects_table',
    version: '002',
    status: 'completed',
    executedAt: new Date('2024-06-01'),
    description: 'Proje tablosu oluşturma',
  },
  {
    id: 'mig-3',
    name: 'create_clients_table',
    version: '003',
    status: 'completed',
    executedAt: new Date('2024-06-01'),
    description: 'Müşteri tablosu oluşturma',
  },
  {
    id: 'mig-4',
    name: 'add_showcase_table',
    version: '004',
    status: 'completed',
    executedAt: new Date('2024-08-15'),
    description: 'Showcase tablosu ekleme',
  },
  {
    id: 'mig-5',
    name: 'add_client_notes_table',
    version: '005',
    status: 'pending',
    description: 'Müşteri notları tablosu ekleme',
  },
]

export default function SettingsPage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [migrations, setMigrations] = useState<Migration[]>(mockMigrations)
  const [runningMigration, setRunningMigration] = useState<string | null>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'admin',
  })

  // Company form state
  const [companyForm, setCompanyForm] = useState({
    name: 'Meanval Tech',
    email: 'info@meanval.com',
    phone: '+90 212 123 4567',
    address: 'Levent, Beşiktaş, İstanbul',
    taxNumber: '1234567890',
    website: 'https://meanval.com',
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailContracts: true,
    emailPayments: true,
    emailProjects: false,
    browserNotifications: true,
    weeklyReport: true,
  })

  // SEO settings
  const [seoForm, setSeoForm] = useState({
    siteTitle: 'Meanval - Proje Yönetim Platformu',
    siteDescription: 'Projelerinizi, müşterilerinizi ve tekliflerinizi tek bir yerden yönetin. Profesyonel proje yönetimi için ihtiyacınız olan her şey.',
    siteKeywords: 'proje yönetimi, teklif yönetimi, sözleşme yönetimi, müşteri yönetimi, CRM',
    ogImage: '/images/og-image.jpg',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    facebookPixelId: '',
    twitterHandle: '@meanvaltech',
  })

  // Email settings
  const [emailForm, setEmailForm] = useState({
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'noreply@meanval.com',
    smtpPassword: '••••••••',
    senderName: 'Meanval',
    senderEmail: 'noreply@meanval.com',
    replyToEmail: 'support@meanval.com',
  })

  // Security settings
  const [securityForm, setSecurityForm] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
    passwordMinLength: '8',
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    maxLoginAttempts: '5',
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const runMigration = async (migrationId: string) => {
    setRunningMigration(migrationId)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setMigrations(migrations.map(m =>
      m.id === migrationId
        ? { ...m, status: 'completed' as const, executedAt: new Date() }
        : m
    ))
    setRunningMigration(null)
  }

  const runAllPendingMigrations = async () => {
    const pendingMigrations = migrations.filter(m => m.status === 'pending')
    for (const migration of pendingMigrations) {
      await runMigration(migration.id)
    }
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profil', icon: User },
    { id: 'company' as const, label: 'Şirket', icon: Building },
    { id: 'notifications' as const, label: 'Bildirimler', icon: Bell },
    { id: 'seo' as const, label: 'SEO', icon: Search },
    { id: 'email' as const, label: 'E-posta', icon: Mail },
    { id: 'security' as const, label: 'Güvenlik', icon: Shield },
    { id: 'database' as const, label: 'Veritabanı', icon: Database },
  ]

  return (
    <div>
      <Header title="Ayarlar" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-2xl">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profil Ayarları</CardTitle>
                  <CardDescription>
                    Kişisel bilgilerinizi güncelleyin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar name={profileForm.name} size="xl" />
                    <div>
                      <Button variant="outline" size="sm">
                        Fotoğraf Yükle
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG veya GIF. Maksimum 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Ad Soyad"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                    />
                    <Input
                      label="E-posta"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                    />
                  </div>

                  <Input
                    label="Telefon"
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Rol
                    </label>
                    <p className="text-gray-900 capitalize">{profileForm.role}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Rol değişikliği için yöneticinize başvurun
                    </p>
                  </div>

                  {/* Password Change */}
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Şifre Değiştir
                    </h4>
                    <div className="space-y-4">
                      <Input
                        label="Mevcut Şifre"
                        type="password"
                        placeholder="••••••••"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Yeni Şifre"
                          type="password"
                          placeholder="••••••••"
                        />
                        <Input
                          label="Yeni Şifre (Tekrar)"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      leftIcon={<Save className="w-4 h-4" />}
                      onClick={handleSave}
                      isLoading={isSaving}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Company Settings */}
            {activeTab === 'company' && (
              <Card>
                <CardHeader>
                  <CardTitle>Şirket Bilgileri</CardTitle>
                  <CardDescription>
                    Şirket bilgileriniz fatura ve sözleşmelerde kullanılır
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Input
                    label="Şirket Adı"
                    value={companyForm.name}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, name: e.target.value })
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Input
                        label="E-posta"
                        type="email"
                        value={companyForm.email}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, email: e.target.value })
                        }
                        className="pl-10"
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-[38px]" />
                    </div>
                    <div className="relative">
                      <Input
                        label="Telefon"
                        type="tel"
                        value={companyForm.phone}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, phone: e.target.value })
                        }
                        className="pl-10"
                      />
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-[38px]" />
                    </div>
                  </div>

                  <div className="relative">
                    <Textarea
                      label="Adres"
                      rows={2}
                      value={companyForm.address}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Vergi Numarası"
                      value={companyForm.taxNumber}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, taxNumber: e.target.value })
                      }
                    />
                    <Input
                      label="Web Sitesi"
                      type="url"
                      value={companyForm.website}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, website: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      leftIcon={<Save className="w-4 h-4" />}
                      onClick={handleSave}
                      isLoading={isSaving}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Bildirim Tercihleri</CardTitle>
                  <CardDescription>
                    Hangi bildirimları almak istediğinizi seçin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">
                      E-posta Bildirimleri
                    </h4>
                    <div className="space-y-3">
                      {[
                        { key: 'emailProposals', label: 'Teklif güncellemeleri', desc: 'Teklif onaylandığında veya reddedildiğinde' },
                        { key: 'emailContracts', label: 'Sözleşme bildirimleri', desc: 'Sözleşme imzalandığında' },
                        { key: 'emailPayments', label: 'Ödeme bildirimleri', desc: 'Ödeme alındığında veya geciktiğinde' },
                        { key: 'emailProjects', label: 'Proje güncellemeleri', desc: 'Proje durumu değiştiğinde' },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications] as boolean}
                            onChange={(e) =>
                              setNotifications({
                                ...notifications,
                                [item.key]: e.target.checked,
                              })
                            }
                            className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other Notifications */}
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Diğer Bildirimler
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={notifications.browserNotifications}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              browserNotifications: e.target.checked,
                            })
                          }
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Tarayıcı bildirimleri</p>
                          <p className="text-sm text-gray-500">Anlık tarayıcı bildirimleri al</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReport}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              weeklyReport: e.target.checked,
                            })
                          }
                          className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Haftalık rapor</p>
                          <p className="text-sm text-gray-500">Her hafta performans özeti al</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      leftIcon={<Save className="w-4 h-4" />}
                      onClick={handleSave}
                      isLoading={isSaving}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <Card>
                <CardHeader>
                  <CardTitle>SEO Ayarları</CardTitle>
                  <CardDescription>
                    Arama motorlarında görünürlüğünüzü artırın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Input
                    label="Site Başlığı"
                    value={seoForm.siteTitle}
                    onChange={(e) =>
                      setSeoForm({ ...seoForm, siteTitle: e.target.value })
                    }
                    hint="60 karakterden kısa tutun"
                  />

                  <Textarea
                    label="Site Açıklaması"
                    rows={3}
                    value={seoForm.siteDescription}
                    onChange={(e) =>
                      setSeoForm({ ...seoForm, siteDescription: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500 -mt-4">
                    Meta açıklama, 160 karakterden kısa tutun
                  </p>

                  <Input
                    label="Anahtar Kelimeler"
                    value={seoForm.siteKeywords}
                    onChange={(e) =>
                      setSeoForm({ ...seoForm, siteKeywords: e.target.value })
                    }
                    hint="Virgülle ayırın"
                  />

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Sosyal Medya
                    </h4>
                    <div className="space-y-4">
                      <Input
                        label="OG Image URL"
                        value={seoForm.ogImage}
                        onChange={(e) =>
                          setSeoForm({ ...seoForm, ogImage: e.target.value })
                        }
                        hint="Sosyal medyada paylaşıldığında görünecek resim"
                      />
                      <Input
                        label="Twitter Hesabı"
                        value={seoForm.twitterHandle}
                        onChange={(e) =>
                          setSeoForm({ ...seoForm, twitterHandle: e.target.value })
                        }
                        placeholder="@kullaniciadi"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Analitik Entegrasyonları
                    </h4>
                    <div className="space-y-4">
                      <Input
                        label="Google Analytics ID"
                        value={seoForm.googleAnalyticsId}
                        onChange={(e) =>
                          setSeoForm({ ...seoForm, googleAnalyticsId: e.target.value })
                        }
                        placeholder="G-XXXXXXXXXX"
                      />
                      <Input
                        label="Facebook Pixel ID"
                        value={seoForm.facebookPixelId}
                        onChange={(e) =>
                          setSeoForm({ ...seoForm, facebookPixelId: e.target.value })
                        }
                        placeholder="XXXXXXXXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      leftIcon={<Save className="w-4 h-4" />}
                      onClick={handleSave}
                      isLoading={isSaving}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <Card>
                <CardHeader>
                  <CardTitle>E-posta Ayarları</CardTitle>
                  <CardDescription>
                    SMTP sunucu ayarlarını yapılandırın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Dikkat</p>
                        <p className="text-sm text-amber-700">
                          SMTP ayarlarını değiştirmeden önce yedek alın. Yanlış yapılandırma e-posta gönderimini engelleyebilir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="SMTP Sunucu"
                      value={emailForm.smtpHost}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, smtpHost: e.target.value })
                      }
                      placeholder="smtp.example.com"
                    />
                    <Input
                      label="Port"
                      value={emailForm.smtpPort}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, smtpPort: e.target.value })
                      }
                      placeholder="587"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="SMTP Kullanıcı"
                      value={emailForm.smtpUser}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, smtpUser: e.target.value })
                      }
                    />
                    <Input
                      label="SMTP Şifre"
                      type="password"
                      value={emailForm.smtpPassword}
                      onChange={(e) =>
                        setEmailForm({ ...emailForm, smtpPassword: e.target.value })
                      }
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Gönderen Bilgileri
                    </h4>
                    <div className="space-y-4">
                      <Input
                        label="Gönderen Adı"
                        value={emailForm.senderName}
                        onChange={(e) =>
                          setEmailForm({ ...emailForm, senderName: e.target.value })
                        }
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Gönderen E-posta"
                          type="email"
                          value={emailForm.senderEmail}
                          onChange={(e) =>
                            setEmailForm({ ...emailForm, senderEmail: e.target.value })
                          }
                        />
                        <Input
                          label="Yanıt E-posta"
                          type="email"
                          value={emailForm.replyToEmail}
                          onChange={(e) =>
                            setEmailForm({ ...emailForm, replyToEmail: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline">
                      Test E-postası Gönder
                    </Button>
                    <Button
                      leftIcon={<Save className="w-4 h-4" />}
                      onClick={handleSave}
                      isLoading={isSaving}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Güvenlik Ayarları</CardTitle>
                  <CardDescription>
                    Hesap güvenliği ve oturum ayarları
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Two-Factor Auth */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Key className="w-5 h-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">İki Faktörlü Doğrulama</p>
                        <p className="text-sm text-gray-500">Hesabınızı ek güvenlik katmanıyla koruyun</p>
                      </div>
                    </div>
                    <Button
                      variant={securityForm.twoFactorEnabled ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() =>
                        setSecurityForm({ ...securityForm, twoFactorEnabled: !securityForm.twoFactorEnabled })
                      }
                    >
                      {securityForm.twoFactorEnabled ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                    </Button>
                  </div>

                  {/* Session Settings */}
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Oturum Ayarları
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Oturum Zaman Aşımı (dakika)
                        </label>
                        <select
                          value={securityForm.sessionTimeout}
                          onChange={(e) =>
                            setSecurityForm({ ...securityForm, sessionTimeout: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="15">15 dakika</option>
                          <option value="30">30 dakika</option>
                          <option value="60">1 saat</option>
                          <option value="120">2 saat</option>
                          <option value="480">8 saat</option>
                        </select>
                      </div>
                      <Input
                        label="Maksimum Giriş Denemesi"
                        type="number"
                        value={securityForm.maxLoginAttempts}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, maxLoginAttempts: e.target.value })
                        }
                        hint="Başarısız denemelerden sonra hesap kilitlenir"
                      />
                    </div>
                  </div>

                  {/* Password Policy */}
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Şifre Politikası
                    </h4>
                    <div className="space-y-4">
                      <Input
                        label="Minimum Şifre Uzunluğu"
                        type="number"
                        value={securityForm.passwordMinLength}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, passwordMinLength: e.target.value })
                        }
                      />
                      <div className="space-y-3">
                        {[
                          { key: 'requireUppercase', label: 'Büyük harf zorunlu' },
                          { key: 'requireNumbers', label: 'Rakam zorunlu' },
                          { key: 'requireSpecialChars', label: 'Özel karakter zorunlu' },
                        ].map((item) => (
                          <label
                            key={item.key}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={securityForm[item.key as keyof typeof securityForm] as boolean}
                              onChange={(e) =>
                                setSecurityForm({
                                  ...securityForm,
                                  [item.key]: e.target.checked,
                                })
                              }
                              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-700">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Aktif Oturumlar</h4>
                      <Button variant="outline" size="sm" leftIcon={<LogOut className="w-4 h-4" />}>
                        Tüm Oturumları Kapat
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Windows - Chrome</p>
                          <p className="text-sm text-gray-500">İstanbul, Türkiye • Şu an aktif</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Mevcut</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">iPhone - Safari</p>
                          <p className="text-sm text-gray-500">İstanbul, Türkiye • 2 saat önce</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Sonlandır
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      leftIcon={<Save className="w-4 h-4" />}
                      onClick={handleSave}
                      isLoading={isSaving}
                    >
                      Değişiklikleri Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Database Settings */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Veritabanı Yönetimi</CardTitle>
                    <CardDescription>
                      Veritabanı durumu ve yedekleme işlemleri
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Database Status */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Durum</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">Bağlı</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Tablo Sayısı</p>
                        <p className="font-medium text-gray-900">12</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Toplam Kayıt</p>
                        <p className="font-medium text-gray-900">1,847</p>
                      </div>
                    </div>

                    {/* Backup Actions */}
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-4">Yedekleme İşlemleri</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                          Yedek Al
                        </Button>
                        <Button variant="outline" leftIcon={<Upload className="w-4 h-4" />}>
                          Yedek Yükle
                        </Button>
                        <Button variant="outline" leftIcon={<RefreshCw className="w-4 h-4" />}>
                          Senkronize Et
                        </Button>
                      </div>
                    </div>

                    {/* Recent Backups */}
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-4">Son Yedekler</h4>
                      <div className="space-y-2">
                        {[
                          { date: new Date('2024-08-15T10:30:00'), size: '12.4 MB', type: 'Otomatik' },
                          { date: new Date('2024-08-14T10:30:00'), size: '12.2 MB', type: 'Otomatik' },
                          { date: new Date('2024-08-13T15:45:00'), size: '12.1 MB', type: 'Manuel' },
                        ].map((backup, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Database className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  backup_{formatDate(backup.date).replace(/\./g, '-')}.sql
                                </p>
                                <p className="text-xs text-gray-500">{backup.size} • {backup.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Migrations */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Veritabanı Migrasyonları</CardTitle>
                      <CardDescription>
                        Şema değişikliklerini yönetin
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      onClick={runAllPendingMigrations}
                      disabled={!migrations.some(m => m.status === 'pending')}
                      leftIcon={<Play className="w-4 h-4" />}
                    >
                      Tümünü Çalıştır
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {migrations.map((migration) => (
                        <div
                          key={migration.id}
                          className="flex items-center justify-between px-6 py-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              migration.status === 'completed'
                                ? 'bg-green-100'
                                : migration.status === 'failed'
                                ? 'bg-red-100'
                                : 'bg-gray-100'
                            }`}>
                              {migration.status === 'completed' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : migration.status === 'failed' ? (
                                <X className="w-4 h-4 text-red-600" />
                              ) : (
                                <span className="text-xs font-medium text-gray-600">{migration.version}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{migration.name}</p>
                              <p className="text-sm text-gray-500">
                                {migration.description}
                                {migration.executedAt && (
                                  <> • {formatDate(migration.executedAt)}</>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={
                              migration.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : migration.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                            }>
                              {migration.status === 'completed' ? 'Tamamlandı' : migration.status === 'failed' ? 'Başarısız' : 'Bekliyor'}
                            </Badge>
                            {migration.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => runMigration(migration.id)}
                                isLoading={runningMigration === migration.id}
                                leftIcon={<Play className="w-4 h-4" />}
                              >
                                Çalıştır
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Tehlikeli Bölge
                    </CardTitle>
                    <CardDescription>
                      Bu işlemler geri alınamaz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Veritabanını Sıfırla</p>
                        <p className="text-sm text-gray-500">Tüm verileri sil ve şemayı yeniden oluştur</p>
                      </div>
                      <Button variant="danger" size="sm">
                        Sıfırla
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Tüm Verileri Sil</p>
                        <p className="text-sm text-gray-500">Şemayı koruyarak tüm verileri temizle</p>
                      </div>
                      <Button variant="danger" size="sm">
                        Temizle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
