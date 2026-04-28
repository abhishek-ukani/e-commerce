'use client'
export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, 
  Wallet, 
  Gift, 
  Package, 
  MapPin, 
  LogOut, 
  Copy, 
  Check,
  Plus,
  Edit2,
  Trash2,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { useAuth } from '@/components/providers/auth-provider'
import type { Address } from '@/lib/store/auth-store'

type Tab = 'profile' | 'wallet' | 'referral' | 'orders' | 'addresses'

function AccountPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated, isHydrated, logout, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuth()
  
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [copied, setCopied] = useState(false)
  const [showOrderSuccess, setShowOrderSuccess] = useState(false)
  
  // Profile form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Address form
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [addressForm, setAddressForm] = useState<Partial<Address>>({})

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login?redirect=/account')
    }
  }, [isHydrated, isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  useEffect(() => {
    if (searchParams.get('order') === 'success') {
      setShowOrderSuccess(true)
      setActiveTab('orders')
      setTimeout(() => setShowOrderSuccess(false), 5000)
    }
  }, [searchParams])

  const handleCopyReferral = async () => {
    if (user?.referralCode) {
      await navigator.clipboard.writeText(user.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateProfile({ name, email })
    setIsSaving(false)
  }

  const handleAddAddress = () => {
    if (addressForm.name && addressForm.phone && addressForm.addressLine1 && addressForm.city && addressForm.state && addressForm.pincode) {
      addAddress({
        name: addressForm.name,
        phone: addressForm.phone,
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        state: addressForm.state,
        pincode: addressForm.pincode,
        isDefault: false,
      })
      setAddressForm({})
      setShowAddressDialog(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-accent text-accent-foreground'
      case 'shipped': return 'bg-primary text-primary-foreground'
      case 'confirmed': return 'bg-secondary text-secondary-foreground'
      case 'cancelled': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  if (!isHydrated || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'wallet' as Tab, label: 'Wallet', icon: Wallet },
    { id: 'referral' as Tab, label: 'Referral', icon: Gift },
    { id: 'orders' as Tab, label: 'Orders', icon: Package },
    { id: 'addresses' as Tab, label: 'Addresses', icon: MapPin },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Order Success Banner */}
          {showOrderSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl"
            >
              <p className="text-accent font-medium text-center">
                Order placed successfully! Thank you for your purchase.
              </p>
            </motion.div>
          )}

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-2">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                        {tab.id === 'wallet' && (
                          <span className="ml-auto text-xs opacity-80">
                            {user.walletPoints} pts
                          </span>
                        )}
                        {tab.id === 'orders' && user.orders.length > 0 && (
                          <span className="ml-auto text-xs opacity-80">
                            {user.orders.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input value={user.phone} disabled className="mt-1" />
                      <p className="text-xs text-muted-foreground mt-1">Phone number cannot be changed</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email (Optional)</label>
                      <Input 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Wallet Tab */}
              {activeTab === 'wallet' && (
                <div className="space-y-6">
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <Wallet className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Wallet Balance</p>
                          <p className="text-4xl font-bold text-foreground">{user.walletPoints}</p>
                          <p className="text-sm text-muted-foreground">points (₹{user.walletPoints} value)</p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <p className="text-sm text-muted-foreground">
                        Use your wallet points at checkout to get instant discounts. 1 point = ₹1
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>How to Earn Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Refer Friends</p>
                            <p className="text-sm text-muted-foreground">Earn 100 points for each successful referral</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Place Orders</p>
                            <p className="text-sm text-muted-foreground">Earn 5% of order value as points on every purchase</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Referral Tab */}
              {activeTab === 'referral' && (
                <div className="space-y-6">
                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-accent" />
                        Your Referral Code
                      </CardTitle>
                      <CardDescription>
                        Share this code with friends and earn rewards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-4 bg-muted rounded-xl font-mono text-xl font-bold text-center">
                          {user.referralCode}
                        </div>
                        <Button onClick={handleCopyReferral} variant="outline" size="lg">
                          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </Button>
                      </div>
                      {copied && (
                        <p className="text-sm text-accent mt-2 text-center">Copied to clipboard!</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>How Referrals Work</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl font-bold text-primary">1</span>
                          </div>
                          <h4 className="font-medium text-foreground">Share Code</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Share your referral code with friends
                          </p>
                        </div>
                        <div className="text-center p-4">
                          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl font-bold text-secondary-foreground">2</span>
                          </div>
                          <h4 className="font-medium text-foreground">Friend Orders</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            They get 5% off on their first order
                          </p>
                        </div>
                        <div className="text-center p-4">
                          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl font-bold text-accent">3</span>
                          </div>
                          <h4 className="font-medium text-foreground">You Earn</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get 100 points added to your wallet
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your past orders and track shipments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No orders yet</p>
                        <Button variant="link" onClick={() => router.push('/#product')}>
                          Shop Now
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.orders.map((order) => (
                          <div key={order.id} className="p-4 border border-border rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-medium text-foreground">{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <Separator className="my-3" />
                            <div className="space-y-2">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {item.name} x {item.quantity}
                                  </span>
                                  <span className="text-foreground">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between">
                              <span className="font-medium text-foreground">Total</span>
                              <span className="font-bold text-primary">₹{order.total.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>Manage your delivery addresses</CardDescription>
                    </div>
                    <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Address</DialogTitle>
                          <DialogDescription>
                            Enter your delivery address details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Full Name</label>
                              <Input
                                value={addressForm.name || ''}
                                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Phone</label>
                              <Input
                                value={addressForm.phone || ''}
                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                placeholder="9876543210"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Address Line 1</label>
                            <Input
                              value={addressForm.addressLine1 || ''}
                              onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                              placeholder="House/Flat No., Building Name"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Address Line 2 (Optional)</label>
                            <Input
                              value={addressForm.addressLine2 || ''}
                              onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                              placeholder="Street, Area"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">City</label>
                              <Input
                                value={addressForm.city || ''}
                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                placeholder="Mumbai"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">State</label>
                              <Input
                                value={addressForm.state || ''}
                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                placeholder="Maharashtra"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Pincode</label>
                            <Input
                              value={addressForm.pincode || ''}
                              onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                              placeholder="400001"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAddressDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddAddress}>Save Address</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    {user.addresses.length === 0 ? (
                      <div className="text-center py-12">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No saved addresses</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.addresses.map((address) => (
                          <div 
                            key={address.id} 
                            className={`p-4 border rounded-xl ${address.isDefault ? 'border-primary' : 'border-border'}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-foreground">{address.name}</p>
                                  {address.isDefault && (
                                    <Badge variant="secondary" className="text-xs">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{address.phone}</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {address.addressLine1}
                                  {address.addressLine2 && `, ${address.addressLine2}`}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                {!address.isDefault && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setDefaultAddress(address.id)}
                                  >
                                    Set Default
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => removeAddress(address.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountPageContent />
    </Suspense>
  )
}
