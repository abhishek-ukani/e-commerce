'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowLeft, ArrowRight, Shield, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/providers/auth-provider'

type Step = 'phone' | 'otp'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, verifyOtp, isAuthenticated, isLoading, isHydrated } = useAuth()
  
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push(redirect)
    }
  }, [isHydrated, isAuthenticated, router, redirect])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate phone number (Indian format)
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    await login(cleanPhone)
    setStep('otp')
    setCountdown(30)
    
    // Focus first OTP input
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6).split('')
      const newOtp = [...otp]
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit
        }
      })
      setOtp(newOtp)
      const nextIndex = Math.min(index + digits.length, 5)
      otpRefs.current[nextIndex]?.focus()
    } else {
      const newOtp = [...otp]
      newOtp[index] = value.replace(/\D/g, '')
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus()
      }
    }
    setError('')
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const otpString = otp.join('')
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP')
      return
    }

    const cleanPhone = phone.replace(/\D/g, '')
    const success = await verifyOtp(cleanPhone, otpString)
    
    if (success) {
      router.push(redirect)
    } else {
      setError('Invalid OTP. Please try again.')
      setOtp(['', '', '', '', '', ''])
      otpRefs.current[0]?.focus()
    }
  }

  const handleResendOtp = async () => {
    const cleanPhone = phone.replace(/\D/g, '')
    await login(cleanPhone)
    setCountdown(30)
    setOtp(['', '', '', '', '', ''])
    otpRefs.current[0]?.focus()
  }

  const handleBack = () => {
    setStep('phone')
    setOtp(['', '', '', '', '', ''])
    setError('')
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary/30 via-background to-primary/5">
      {/* Decorative background */}
      <div className="absolute inset-0 pattern-paisley opacity-20 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">TK</span>
              </div>
              <div className="text-left">
                <h1 className="font-semibold text-foreground text-xl">Talala Kesariya</h1>
                <p className="text-sm text-primary font-[family-name:var(--font-gujarati-sans)]">તલાળા કેસરિયા</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-2 border-primary/10 shadow-xl">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Login / Sign Up</CardTitle>
                    <CardDescription>
                      Enter your mobile number to continue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePhoneSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Mobile Number</label>
                        <div className="mt-1 flex">
                          <div className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-lg text-muted-foreground">
                            +91
                          </div>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9876543210"
                            className="rounded-l-none"
                            maxLength={10}
                            autoFocus
                          />
                        </div>
                        {error && (
                          <p className="text-sm text-destructive mt-1">{error}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Get OTP
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-center text-muted-foreground mt-6">
                      By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="border-2 border-primary/10 shadow-xl">
                  <CardHeader className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-4"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Shield className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">Verify OTP</CardTitle>
                    <CardDescription>
                      Enter the 6-digit code sent to<br />
                      <span className="font-medium text-foreground">+91 {phone}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-foreground sr-only">OTP</label>
                        <div className="flex justify-center gap-2 sm:gap-3">
                          {otp.map((digit, index) => (
                            <Input
                              key={index}
                              ref={(el) => { otpRefs.current[index] = el }}
                              type="text"
                              inputMode="numeric"
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold"
                              maxLength={6}
                            />
                          ))}
                        </div>
                        {error && (
                          <p className="text-sm text-destructive mt-2 text-center">{error}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-lg"
                        disabled={isLoading || otp.join('').length !== 6}
                      >
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          'Verify & Continue'
                        )}
                      </Button>

                      <div className="text-center">
                        {countdown > 0 ? (
                          <p className="text-sm text-muted-foreground">
                            Resend OTP in <span className="font-medium text-foreground">{countdown}s</span>
                          </p>
                        ) : (
                          <Button
                            type="button"
                            variant="link"
                            onClick={handleResendOtp}
                            disabled={isLoading}
                          >
                            Resend OTP
                          </Button>
                        )}
                      </div>
                    </form>

                    <div className="mt-6 p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground text-center">
                        <span className="font-medium">Demo:</span> Enter any 6-digit number as OTP
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
