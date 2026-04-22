'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, Check, Leaf, Sun, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/components/providers/cart-provider'

const PRODUCT = {
  id: 'kesar-mango-10kg',
  name: 'Kesar Mango Box',
  nameGujarati: 'કેસર કેરી બોક્સ',
  description: 'Premium handpicked Kesar mangoes from Talala, Gujarat. Each box contains approximately 25-30 mangoes, carefully selected for optimal ripeness and sweetness.',
  descriptionGujarati: 'તલાળા, ગુજરાતથી પ્રીમિયમ હાથથી ચૂંટેલી કેસર કેરી. દરેક બોક્સમાં લગભગ 25-30 કેરી, શ્રેષ્ઠ પાકતા અને મીઠાશ માટે કાળજીપૂર્વક પસંદ કરેલી.',
  price: 1499,
  weight: '10kg',
  image: '/mango-box.jpg',
  features: [
    { icon: Leaf, label: '100% Organic', labelGuj: '100% કુદરતી' },
    { icon: Sun, label: 'Sun-ripened', labelGuj: 'સૂર્ય પાકેલી' },
    { icon: Droplets, label: 'Chemical-free', labelGuj: 'રસાયણ મુક્ત' },
  ],
}

export function ProductSection() {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(
      {
        id: PRODUCT.id,
        name: PRODUCT.name,
        nameGujarati: PRODUCT.nameGujarati,
        price: PRODUCT.price,
        weight: PRODUCT.weight,
        image: PRODUCT.image,
      },
      quantity
    )
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, 10))
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1))

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <span className="font-[family-name:var(--font-gujarati-serif)] text-primary">અમારી કેરી</span>
            <span className="block mt-1">Our Mangoes</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Experience the authentic taste of Talala Kesar - the king of mangoes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 border-primary/20 shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Image */}
                <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-secondary/50 to-primary/10 p-8 flex items-center justify-center">
                  <div className="absolute inset-0 pattern-paisley opacity-20" />
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full max-w-xs relative z-10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Box */}
                    <rect
                      x="30"
                      y="80"
                      width="140"
                      height="100"
                      rx="8"
                      className="fill-[oklch(0.45_0.08_50)]"
                    />
                    <rect
                      x="30"
                      y="80"
                      width="140"
                      height="20"
                      rx="4"
                      className="fill-[oklch(0.55_0.10_50)]"
                    />
                    {/* Mangoes in box */}
                    <ellipse cx="70" cy="130" rx="25" ry="30" className="fill-primary" />
                    <ellipse cx="68" cy="127" rx="22" ry="27" className="fill-[oklch(0.70_0.16_55)]" />
                    <ellipse cx="110" cy="125" rx="25" ry="30" className="fill-primary" />
                    <ellipse cx="108" cy="122" rx="22" ry="27" className="fill-[oklch(0.72_0.15_58)]" />
                    <ellipse cx="150" cy="135" rx="25" ry="30" className="fill-primary" />
                    <ellipse cx="148" cy="132" rx="22" ry="27" className="fill-[oklch(0.68_0.17_52)]" />
                    {/* Leaves */}
                    <path d="M70 95 Q80 85 90 95 Q80 100 70 95" className="fill-accent" />
                    <path d="M110 90 Q120 80 130 90 Q120 95 110 90" className="fill-accent" />
                    <path d="M145 100 Q155 90 165 100 Q155 105 145 100" className="fill-accent" />
                    {/* 10kg label */}
                    <rect x="65" y="155" width="70" height="20" rx="4" className="fill-card" />
                    <text x="100" y="169" textAnchor="middle" className="fill-foreground text-xs font-bold">10 KG</text>
                  </svg>
                </div>

                {/* Product Details */}
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{PRODUCT.name}</h3>
                        <p className="text-lg text-primary font-[family-name:var(--font-gujarati-sans)]">
                          {PRODUCT.nameGujarati}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary">₹{PRODUCT.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">per {PRODUCT.weight} box</p>
                      </div>
                    </div>

                    <p className="mt-4 text-muted-foreground leading-relaxed font-[family-name:var(--font-gujarati-sans)]">
                      {PRODUCT.descriptionGujarati}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {PRODUCT.description}
                    </p>

                    {/* Features */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {PRODUCT.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 rounded-full bg-accent/10 text-sm"
                        >
                          <feature.icon className="h-4 w-4 text-accent" />
                          <span className="text-foreground font-medium">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Quantity (Boxes)</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="h-10 w-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={incrementQuantity}
                          disabled={quantity >= 10}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">
                        ₹{(PRODUCT.price * quantity).toLocaleString()}
                      </span>
                    </div>

                    <Button
                      size="lg"
                      className="w-full h-14 text-lg font-semibold"
                      onClick={handleAddToCart}
                    >
                      {isAdded ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-5 w-5" />
                          Added to Cart!
                        </motion.span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="h-5 w-5" />
                          Add to Cart
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
