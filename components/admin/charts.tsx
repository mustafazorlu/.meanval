'use client'

import { cn } from '@/lib/utils'

interface PieChartData {
  label: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieChartData[]
  title?: string
  className?: string
}

export function SimplePieChart({ data, title, className }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    currentAngle += angle
    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
    }
  })

  // Create SVG arc path
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(50, 50, radius, endAngle)
    const end = polarToCartesian(50, 50, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L 50 50 Z`
  }

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow transition-shadow', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Pie Chart */}
        <svg viewBox="0 0 100 100" className="w-40 h-40">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={createArc(segment.startAngle, segment.endAngle, 40)}
              fill={segment.color}
              className="transition-all duration-300 hover:opacity-80"
            />
          ))}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-gray-600">{segment.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {segment.value} ({segment.percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface BarChartData {
  label: string
  value: number
}

interface BarChartProps {
  data: BarChartData[]
  title?: string
  color?: string
  className?: string
}

export function SimpleBarChart({
  data,
  title,
  color = '#064e3b',
  className,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow transition-shadow', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="relative w-full flex justify-center">
                <div
                  className="w-full max-w-8 rounded-t-md transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${height * 1.5}px`,
                    backgroundColor: color,
                    minHeight: '4px',
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  color = 'primary',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
