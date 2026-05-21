'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from "next/navigation";

// Lista de assets críticos para pré-carregar
const criticalAssets = {
  images: [
    '/images/logo.png',
    '/images/hero-images.png',
    '/images/journey-background.png',
    // Adicione outras imagens críticas
  ]
}

export default function SplashScreenV4({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const paramValue = params.temperatura as string || "";
    const parts = paramValue.split("-") || [];
    const isDarkValue = parts[2] || "";

    if (params.theme === "2" || isDarkValue === "h2") {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, [params.theme]);

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
          className="fixed inset-0 flex flex-col items-center justify-center sm:bg-center bg-left bg-cover bg-no-repeat z-50"
          style={{ backgroundImage: `${isDark ? "url('/images/v4/SplashScreenV4Dark.webp')" : "url('/images/v4/SplashScreenV4.webp')"}` }}
        >
          <motion.img 
            src={isDark ? "/images/logo-o-resgate-dos-otimistas-white.png" : "/images/logo-o-resgate-dos-otimistas.png"} 
            alt="Logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='w-[350px] ml-4'
          />
          <div className="w-64 h-2 bg-[#07242c] rounded-full overflow-hidden">
            <motion.div 
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: "#b91216" }}
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