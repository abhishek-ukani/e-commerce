'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useCartStore, type CartItem } from '@/lib/store/cart-store'

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  referralCode: string
  setReferralCode: (code: string) => void
  walletPointsUsed: number
  setWalletPointsUsed: (points: number) => void
  subtotal: number
  totalItems: number
  isHydrated: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const store = useCartStore()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const value: CartContextType = {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    referralCode: store.referralCode,
    setReferralCode: store.setReferralCode,
    walletPointsUsed: store.walletPointsUsed,
    setWalletPointsUsed: store.setWalletPointsUsed,
    subtotal: store.getSubtotal(),
    totalItems: store.getTotalItems(),
    isHydrated,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
