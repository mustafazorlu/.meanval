'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from './types'
import { currentUser } from './mock-data'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check for existing session (mock)
    const savedUser = localStorage.getItem('meanval_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsInitialized(true)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock validation - accept any email/password for demo
    if (email && password) {
      const loggedInUser = {
        ...currentUser,
        email,
      }
      setUser(loggedInUser)
      localStorage.setItem('meanval_user', JSON.stringify(loggedInUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock registration - accept any valid input
    if (name && email && password) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'admin',
      }
      setUser(newUser)
      localStorage.setItem('meanval_user', JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('meanval_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isInitialized,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
