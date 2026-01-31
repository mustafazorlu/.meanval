'use client'

import { useState, useRef, useEffect, ReactNode, createContext, useContext } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const DropdownContext = createContext<{ close: () => void } | null>(null)

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
}

const Dropdown = ({ trigger, children, align = 'left', className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const close = () => setIsOpen(false)

  return (
    <DropdownContext.Provider value={{ close }}>
      <div className="relative inline-block" ref={dropdownRef}>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {trigger}
        </div>
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 mt-2 min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fade-in',
              align === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  danger?: boolean
}

const DropdownItem = ({
  children,
  onClick,
  className,
  disabled = false,
  danger = false,
}: DropdownItemProps) => {
  const context = useContext(DropdownContext)

  const handleClick = () => {
    if (onClick) onClick()
    if (context) context.close()
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'w-full px-4 py-2 text-left text-sm transition-colors',
        disabled
          ? 'text-gray-400 cursor-not-allowed'
          : danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-gray-700 hover:bg-gray-50',
        className
      )}
    >
      {children}
    </button>
  )
}

const DropdownSeparator = () => <div className="my-1 border-t border-gray-100" />

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  className?: string
}

const Select = ({
  value,
  onChange,
  options,
  placeholder = 'Seçiniz',
  label,
  error,
  disabled = false,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border bg-white text-left',
            'flex items-center justify-between gap-2',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            disabled
              ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
              : 'hover:border-gray-400',
            error ? 'border-red-500' : 'border-gray-300'
          )}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={cn(
              'w-4 h-4 text-gray-400 transition-transform',
              isOpen && 'transform rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto animate-fade-in">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm transition-colors',
                  option.value === value
                    ? 'bg-primary-50 text-primary-800'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export { Dropdown, DropdownItem, DropdownSeparator, Select }
