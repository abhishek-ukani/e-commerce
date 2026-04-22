'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, Tag, Wallet, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCart } from '@/components/providers/cart-provider'
import { useAuth } from '@/components/providers/auth-provider'

export default function CartPage() {
  const router = useRouter()
  const { 
    items, 
    removeItem, 
    addItem, 
    subtotal, 
    totalItems, 
    isHydrated,
    referralCode,
    setReferralCode,
    walletPointsUsed,
    setWalletPointsUsed,
    clearCart
  } = useCart()
  const { user, isAuthenticated, addOrder, usePoints } = useAuth()
  
  const [referralInput, setReferralInput] = useState('')
  const [referralApplied, setReferralApplied] = useState(false)
  const [referralError, setReferralError] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  // Pricing calculations
  const deliveryFee = subtotal > 0 ? 99 : 0
  const referralDiscount = referralApplied ? Math.floor(subtotal * 0.05) : 0 // 5% discount
  const walletDiscount = walletPointsUsed
  const total = Math.max(0, subtotal + deliveryFee - referralDiscount - walletDiscount)

  const maxWalletPoints = user ? Math.min(user.walletPoints, subtotal - referralDiscount) : 0

  const handleApplyReferral = () => {
    setReferralError('')
    if (!referralInput.trim()) {
      setReferralError('Please enter a referral code')
      return
    }
    // Basic validation - code should start with KESAR
    if (referralInput.toUpperCase().startsWith('KESAR') && referralInput.length >= 8) {
      setReferralCode(referralInput.toUpperCase())
      setReferralApplied(true)
    } else {
      setReferralError('Invalid referral code')
    }
  }

  const handleRemoveReferral = () => {
    setReferralCode('')
    setReferralApplied(false)
    setReferralInput('')
  }

  const handleWalletToggle = () => {
    if (walletPointsUsed > 0) {
      setWalletPointsUsed(0)
    } else {
      setWalletPointsUsed(maxWalletPoints)
    }
  }

  const handleQuantityChange = (item: typeof items[0], delta: number) => {
    const newQuantity = item.quantity + delta
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else if (newQuantity <= 10) {
      // Remove and re-add with new quantity
      removeItem(item.id)
      addItem({
        id: item.id,
        name: item.name,
        nameGujarati: item.nameGujarati,
        price: item.price,
        weight: item.weight,
        image: item.image,
      }, newQuantity)
    }
  }

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart')
      return
    }

    setIsPlacingOrder(true)
    
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Deduct wallet points if used
    if (walletPointsUsed > 0) {
      usePoints(walletPointsUsed)
    }

    // Create order
    addOrder({
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      status: 'confirmed',
    })

    // Clear cart
    clearCart()
    
    // Redirect to account with success message
    router.push('/account?order=success')
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading cart...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">Your Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some delicious Kesar mangoes to your cart!
              </p>
              <Link href="/#product">
                <Button size="lg">
                  Browse Mangoes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                    >
                      <Card>
                        <CardContent className="p-4 md:p-6">
                          <div className="flex gap-4">
                            {/* Product Image */}
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-secondary/50 to-primary/10 flex items-center justify-center flex-shrink-0">
                              <svg
                                viewBox="0 0 100 100"
                                className="w-16 h-16 md:w-20 md:h-20"
                                fill="none"
                              >
                                <ellipse cx="50" cy="55" rx="30" ry="38" className="fill-primary" />
                                <ellipse cx="48" cy="52" rx="27" ry="35" className="fill-[oklch(0.70_0.16_55)]" />
                                <path d="M50 15 Q55 22 50 30" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
                                <path d="M50 12 Q65 8 70 18 Q60 22 50 15" className="fill-accent" />
                              </svg>
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                                  <p className="text-sm text-primary font-[family-name:var(--font-gujarati-sans)]">
                                    {item.nameGujarati}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">{item.weight} box</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-destructive"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityChange(item, -1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityChange(item, 1)}
                                    disabled={item.quantity >= 10}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-lg font-semibold text-foreground">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Referral Code */}
                    <div>
                      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-primary" />
                        Referral Code
                      </label>
                      {referralApplied ? (
                        <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                          <span className="text-sm font-medium text-accent">{referralCode}</span>
                          <Button variant="ghost" size="sm" onClick={handleRemoveReferral}>
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={referralInput}
                            onChange={(e) => setReferralInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" onClick={handleApplyReferral}>
                            Apply
                          </Button>
                        </div>
                      )}
                      {referralError && (
                        <p className="text-sm text-destructive mt-1">{referralError}</p>
                      )}
                    </div>

                    {/* Wallet Points */}
                    {isAuthenticated && user && user.walletPoints > 0 && (
                      <div>
                        <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                          <Wallet className="h-4 w-4 text-primary" />
                          Wallet Points
                        </label>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="text-sm text-foreground">
                              Available: <span className="font-semibold">{user.walletPoints} pts</span>
                            </p>
                            <p className="text-xs text-muted-foreground">1 point = ₹1</p>
                          </div>
                          <Button
                            variant={walletPointsUsed > 0 ? 'default' : 'outline'}
                            size="sm"
                            onClick={handleWalletToggle}
                            disabled={maxWalletPoints === 0}
                          >
                            {walletPointsUsed > 0 ? 'Applied' : 'Use Points'}
                          </Button>
                        </div>
                        {walletPointsUsed > 0 && (
                          <p className="text-sm text-accent mt-1">
                            Using {walletPointsUsed} points (-₹{walletPointsUsed})
                          </p>
                        )}
                      </div>
                    )}

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? 'box' : 'boxes'})</span>
                        <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-foreground">₹{deliveryFee}</span>
                      </div>
                      {referralDiscount > 0 && (
                        <div className="flex justify-between text-sm text-accent">
                          <span>Referral Discount (5%)</span>
                          <span>-₹{referralDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      {walletPointsUsed > 0 && (
                        <div className="flex justify-between text-sm text-accent">
                          <span>Wallet Points</span>
                          <span>-₹{walletDiscount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</span>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                    >
                      {isPlacingOrder ? (
                        'Placing Order...'
                      ) : isAuthenticated ? (
                        <>
                          Place Order
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Login to Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {!isAuthenticated && (
                      <p className="text-xs text-center text-muted-foreground">
                        You&apos;ll be redirected to login
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
