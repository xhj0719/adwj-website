import { useState, useEffect } from 'react'
import { getCompanyInfo } from '@/lib/supabase'
import type { CompanyInfo } from '@/lib/supabase'

export function useCompanyInfo(sectionKey?: string) {
  const [info, setInfo] = useState<CompanyInfo | CompanyInfo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getCompanyInfo(sectionKey)
      .then(setInfo)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [sectionKey])

  return { info, loading, error }
}