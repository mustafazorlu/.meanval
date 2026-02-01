import Link from "next/link";
import {
    FileSpreadsheet,
    Clock,
    Twitter,
    Linkedin,
    Instagram,
} from "lucide-react";
import { ScrollAnimation, FloatingElement } from "@/components/ui";

export function CTA() {
    return (
        <section className="py-24 bg-primary-50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="max-w-2xl">
                    <ScrollAnimation direction="left">
                        <h2 className="text-4xl font-bold text-primary-900 mb-4">
                            Kontrolü ele almanın zamanı geldi.
                        </h2>
                    </ScrollAnimation>
                    <ScrollAnimation direction="left" delay={0.1}>
                        <p className="text-lg text-gray-600 mb-8">
                            İşletmelerini yönetmek için meanval kullanan
                            500.000+ üst düzey ajans ve kuruluşa katılın.
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation direction="left" delay={0.2}>
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center h-14 px-8 rounded-lg font-bold text-lg uppercase bg-primary-800 text-white hover:bg-primary-900 transition-colors"
                        >
                            Ücretsiz Denemeyi Başlat
                        </Link>
                    </ScrollAnimation>
                </div>
                <div className="hidden md:flex gap-8">
                    <FloatingElement duration={4}>
                        <div className="bg-white p-6 rounded-xl shadow-sm rotate-3 max-h-fit">
                            <FileSpreadsheet className="w-8 h-8 text-primary-800" />
                        </div>
                    </FloatingElement>
                    <FloatingElement duration={5} delay={1}>
                        <div className="bg-white p-6 rounded-xl shadow-sm -rotate-3 mt-8">
                            <Clock className="w-8 h-8 text-amber-500" />
                        </div>
                    </FloatingElement>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="bg-white pt-20 pb-12 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <span className="font-bold text-2xl text-primary-800 block mb-6">
                            meanval
                        </span>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6">
                            Ajanslar ve kuruluşlar için hepsi bir arada iş
                            yönetimi işletim sistemi.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 hover:text-primary-700 text-gray-500 transition-all duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 hover:text-primary-700 text-gray-500 transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 hover:text-primary-700 text-gray-500 transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-wider">
                            Ürün
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Teklifler
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Sözleşmeler
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Faturalandırma
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Müşteri CRM
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Zaman Takibi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Görev Yönetimi
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-wider">
                            Kaynaklar
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Serbest Çalışan Ücretleri
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Fatura Oluşturucu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Sözleşme Şablonları
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Teklif Şablonları
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-wider">
                            Şirket
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Hakkımızda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Kariyer
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Destek
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary-800 transition-colors"
                                >
                                    Gizlilik Politikası
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 pt-8 border-t border-gray-100">
                    <p>&copy; 2024 meanval. Tüm hakları saklıdır.</p>
                    <div className="mt-4 md:mt-0">
                        <span className="italic">Hassasiyetle tasarlandı.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
