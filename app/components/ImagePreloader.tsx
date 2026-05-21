'use client'

import { useState, useEffect } from 'react'

export default function ImagePreloader({ imageUrls, onComplete }) {
  const [loadedCount, setLoadedCount] = useState(0)
  
  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      onComplete?.()
      return
    }
    
    const preloadImages = imageUrls.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          setLoadedCount(prev => prev + 1)
          resolve(src)
        }
        img.onerror = reject
      })
    })
    
    Promise.all(preloadImages)
      .then(() => {
        onComplete?.()
      })
      .catch(error => {
        console.error('Erro ao pré-carregar imagens:', error)
        onComplete?.() // Continua mesmo com erro
      })
  }, [imageUrls, onComplete])
  
  const progress = imageUrls?.length ? Math.round((loadedCount / imageUrls.length) * 100) : 100
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-24 h-24 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-700">Carregando recursos...</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{progress}%</p>
    </div>
  )
} 