'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

export interface Address {
  id: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface Order {
  id: string
  date: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  trackingId?: string
}

export interface User {
  id: string
  phone?: string
  name?: string
  email?: string
  walletPoints: number
  referralCode: string
  addresses: Address[]
  orders: Order[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
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

const generateReferralCode = (phone: string) => {
  const suffix = phone.slice(-4)
  return `KESAR${suffix}`
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (phone: string) => {
        set({ isLoading: true })
        // Simulate OTP sending
        await new Promise((resolve) => setTimeout(resolve, 1000))
        set({ isLoading: false })
      },

      loginWithGoogle: async () => {
        set({ isLoading: true })
        try {
          const result = await signInWithPopup(auth, googleProvider)
          const firebaseUser = result.user
          
          const existingUser = get().user
          if (existingUser && (existingUser.email === firebaseUser.email || existingUser.id === firebaseUser.uid)) {
            set({ isAuthenticated: true, isLoading: false })
          } else {
            // Create new user or update existing
            const newUser: User = {
              id: firebaseUser.uid,
              phone: firebaseUser.phoneNumber || undefined,
              name: firebaseUser.displayName || undefined,
              email: firebaseUser.email || undefined,
              walletPoints: 100, // Welcome bonus
              referralCode: generateReferralCode(firebaseUser.phoneNumber || firebaseUser.uid.slice(-10)),
              addresses: [],
              orders: [],
            }
            set({ user: newUser, isAuthenticated: true, isLoading: false })
          }
        } catch (error) {
          console.error('Error signing in with Google:', error)
          set({ isLoading: false })
          throw error
        }
      },

      verifyOtp: async (phone: string, otp: string) => {
        set({ isLoading: true })
        // Simulate OTP verification - in production, verify against backend
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // For demo, any 6-digit OTP works
        if (otp.length === 6) {
          const existingUser = get().user
          
          if (existingUser && existingUser.phone === phone) {
            set({ isAuthenticated: true, isLoading: false })
          } else {
            // Create new user
            const newUser: User = {
              id: generateId(),
              phone,
              walletPoints: 100, // Welcome bonus
              referralCode: generateReferralCode(phone),
              addresses: [],
              orders: [],
            }
            set({ user: newUser, isAuthenticated: true, isLoading: false })
          }
          return true
        }
        
        set({ isLoading: false })
        return false
      },

      logout: async () => {
        try {
          await signOut(auth)
          set({ user: null, isAuthenticated: false })
        } catch (error) {
          console.error('Error signing out:', error)
          // Still clear local state
          set({ user: null, isAuthenticated: false })
        }
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state
          const newAddress: Address = {
            ...address,
            id: generateId(),
            isDefault: state.user.addresses.length === 0,
          }
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, newAddress],
            },
          }
        })
      },

      updateAddress: (id, updates) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) =>
                addr.id === id ? { ...addr, ...updates } : addr
              ),
            },
          }
        })
      },

      removeAddress: (id) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.filter((addr) => addr.id !== id),
            },
          }
        })
      },

      setDefaultAddress: (id) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
              })),
            },
          }
        })
      },

      addOrder: (order) => {
        set((state) => {
          if (!state.user) return state
          const newOrder: Order = {
            ...order,
            id: `ORD${generateId().toUpperCase()}`,
            date: new Date().toISOString(),
          }
          return {
            user: {
              ...state.user,
              orders: [newOrder, ...state.user.orders],
            },
          }
        })
      },

      earnPoints: (points) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              walletPoints: state.user.walletPoints + points,
            },
          }
        })
      },

      usePoints: (points) => {
        const { user } = get()
        if (!user || user.walletPoints < points) return false
        set((state) => ({
          user: state.user
            ? { ...state.user, walletPoints: state.user.walletPoints - points }
            : null,
        }))
        return true
      },
    }),
    {
      name: 'talala-auth',
    }
  )
)
