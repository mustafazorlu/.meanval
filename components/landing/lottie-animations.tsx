'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface LottieAnimationProps {
  animationData: object
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function LottieAnimation({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className={className} />
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  )
}

// Pre-defined animation components
export function SuccessAnimation({ className = 'w-16 h-16' }: { className?: string }) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    fetch('/animations/success.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {})
  }, [])

  if (!animationData) return <div className={className} />

  return <LottieAnimation animationData={animationData} className={className} loop={false} />
}

export function LoadingAnimation({ className = 'w-10 h-10' }: { className?: string }) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    fetch('/animations/loading.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {})
  }, [])

  if (!animationData) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  return <LottieAnimation animationData={animationData} className={className} />
}

export function ChartAnimation({ className = 'w-12 h-12' }: { className?: string }) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    fetch('/animations/chart.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {})
  }, [])

  if (!animationData) return <div className={className} />

  return <LottieAnimation animationData={animationData} className={className} loop={false} />
}

// Floating shapes animation for hero section
export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated circles */}
      <div className="absolute top-20 left-[10%] w-4 h-4 bg-emerald-400/30 rounded-full animate-float" />
      <div className="absolute top-40 right-[15%] w-6 h-6 bg-amber-400/20 rounded-full animate-float-delayed" />
      <div className="absolute bottom-32 left-[20%] w-3 h-3 bg-emerald-500/40 rounded-full animate-float" />
      <div className="absolute top-[60%] right-[10%] w-5 h-5 bg-emerald-300/30 rounded-full animate-float-delayed" />

      {/* Animated squares */}
      <div className="absolute top-[30%] left-[5%] w-4 h-4 bg-emerald-400/20 rotate-45 animate-float-slow" />
      <div className="absolute bottom-[20%] right-[25%] w-3 h-3 bg-amber-400/30 rotate-12 animate-float-slow" />
    </div>
  )
}
