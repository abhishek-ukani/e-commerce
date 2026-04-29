'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowLeft, ArrowRight, Shield, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/providers/auth-provider'

type Step = 'phone' | 'otp'

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loginWithGoogle, verifyOtp, isAuthenticated, isLoading, isHydrated } = useAuth()
  
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

  const handleGoogleLogin = async () => {
    setError('')
    try {
      await loginWithGoogle()
      router.push(redirect)
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google')
    }
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
                        {isLoading && step === 'phone' ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Get OTP
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 text-lg gap-3 border-2"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                      >
                        {isLoading && step === 'phone' ? null : isLoading ? (
                           <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                              <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.29l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}