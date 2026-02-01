"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Lütfen tüm alanları doldurun");
            return;
        }

        const success = await login(email, password);
        if (success) {
            router.push("/dashboard");
        } else {
            setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24">
                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="inline-block mb-8">
                        <span className="font-bold text-3xl text-primary-800">
                            meanval
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Hoş Geldiniz
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Hesabınıza giriş yaparak devam edin
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

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
                                type={showPassword ? "text" : "password"}
                                label="Şifre"
                                placeholder="••••••••"
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                Beni hatırla
                            </label>
                            <a
                                href="#"
                                className="text-sm text-primary-700 hover:underline"
                            >
                                Şifremi unuttum
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Giriş Yap
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        Hesabınız yok mu?{" "}
                        <Link
                            href="/register"
                            className="text-primary-700 font-semibold hover:underline"
                        >
                            Kayıt olun
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side - Decoration */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-800 to-primary-900 items-center justify-center p-16">
                <div className="max-w-lg text-white">
                    <h2 className="text-4xl font-bold mb-6">
                        İşletmenizi tek bir platformdan yönetin
                    </h2>
                    <p className="text-lg text-emerald-100 leading-relaxed mb-8">
                        Teklifler, sözleşmeler, projeler ve müşteriler - hepsini
                        meanval ile kontrol altına alın.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-400 border-2 border-white"></div>
                            <div className="w-10 h-10 rounded-full bg-emerald-300 border-2 border-white"></div>
                            <div className="w-10 h-10 rounded-full bg-emerald-200 border-2 border-white"></div>
                        </div>
                        <p className="text-sm text-emerald-100">
                            <strong className="text-white">500,000+</strong>{" "}
                            kullanıcı güveniyor
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
