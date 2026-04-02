import { useState, useEffect } from 'react'
import { getGalleryItems, GalleryItem } from '@/lib/supabase'

export function useGallery(category?: string) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getGalleryItems(category)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [category])

  return { items, loading, error }
}