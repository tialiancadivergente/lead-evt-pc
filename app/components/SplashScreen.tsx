'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Lista de assets críticos para pré-carregar
const criticalAssets = {
  images: [
    '/images/logo.png',
    '/images/hero-images.png',
    '/images/journey-background.png',
    // Adicione outras imagens críticas
  ]
}

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    let totalAssets = criticalAssets.images.length
    let loadedAssets = 0
    
    const updateProgress = () => {
      loadedAssets++
      const newProgress = Math.round((loadedAssets / totalAssets) * 100)
      setProgress(newProgress)
      
      if (loadedAssets === totalAssets) {
        // Adiciona um pequeno atraso para uma transição suave
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }
    
    // Pré-carregar imagens
    criticalAssets.images.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = updateProgress
      img.onerror = updateProgress // Continua mesmo com erro
    })
    
    // Timeout de segurança (caso algo falhe)
    const safetyTimeout = setTimeout(() => {
      setLoading(false)
    }, 5000)
    
    return () => clearTimeout(safetyTimeout)
  }, [])
  
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-custom-background z-50"
        >
          <motion.img 
            src="/images/logo-resgate-dos-otimistas.png" 
            alt="Logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="w-64 h-2 bg-custom-primary-gold rounded-full overflow-hidden">
            <motion.div 
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: "#C0964B" }}
            ></motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 