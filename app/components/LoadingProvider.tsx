'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoadingProvider({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleStop = () => setLoading(false)

    // Criar um ID único para a rota atual
    const url = pathname + searchParams.toString()
    
    // Simular o fim do carregamento após um tempo
    let timeoutId
    if (loading) {
      timeoutId = setTimeout(() => {
        handleStop()
      }, 500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname, searchParams, loading])

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </>
  )
} 