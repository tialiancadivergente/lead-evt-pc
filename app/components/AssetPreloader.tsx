'use client'

import { useState, useEffect } from 'react'

// Lista de assets críticos para pré-carregar
const criticalAssets = {
  images: [
    '/images/logo.png',
    '/images/hero-images.png',
    '/images/journey-background.png',
    // Adicione outras imagens críticas
  ],
  fonts: [
    // URLs de fontes personalizadas, se não estiver usando next/font
  ],
  // Outros assets que você queira pré-carregar
}

export default function AssetPreloader({ children }: { children: React.ReactNode }) {
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    let totalAssets = criticalAssets.images.length + criticalAssets.fonts.length
    let loadedAssets = 0
    
    const updateProgress = () => {
      loadedAssets++
      const newProgress = Math.round((loadedAssets / totalAssets) * 100)
      setProgress(newProgress)
      
      if (loadedAssets === totalAssets) {
        // Adiciona um pequeno atraso para uma transição suave
        setTimeout(() => {
          setAssetsLoaded(true)
        }, 500)
      }
    }
    
    // Pré-carregar imagens
    criticalAssets.images.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = updateProgress
      img.onerror = updateProgress // Continua mesmo com erro
    })
    
    // Pré-carregar fontes (se necessário)
    criticalAssets.fonts.forEach(fontUrl => {
      fetch(fontUrl)
        .then(response => response.blob())
        .then(() => updateProgress())
        .catch(() => updateProgress())
    })
    
    // Timeout de segurança (caso algo falhe)
    const safetyTimeout = setTimeout(() => {
      setAssetsLoaded(true)
    }, 8000)
    
    return () => clearTimeout(safetyTimeout)
  }, [])
  
  if (!assetsLoaded) {
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
  
  return children
} 