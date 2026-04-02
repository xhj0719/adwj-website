import { useState, useEffect } from 'react'
import { getProducts, Product } from '@/lib/supabase'

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getProducts(category)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [category])

  return { products, loading, error }
}