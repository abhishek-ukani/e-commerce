'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthStore, type User, type Address, type Order } from '@/lib/store/auth-store'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isHydrated: boolean
  login: (phone: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  verifyOtp: (phone: string, otp: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void
  earnPoints: (points: number) => void
  usePoints: (points: number) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const store = useAuthStore()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const value: AuthContextType = {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    isHydrated,
    login: store.login,
    loginWithGoogle: store.loginWithGoogle,
    verifyOtp: store.verifyOtp,
    logout: store.logout,
    updateProfile: store.updateProfile,
    addAddress: store.addAddress,
    updateAddress: store.updateAddress,
    removeAddress: store.removeAddress,
    setDefaultAddress: store.setDefaultAddress,
    addOrder: store.addOrder,
    earnPoints: store.earnPoints,
    usePoints: store.usePoints,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
