"use client"

import { useState } from "react"

export default function JourneySection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = () => {
    setIsSubmitting(true)
    
    // Pequeno atraso para garantir que a página tenha tempo de renderizar completamente
    setTimeout(() => {
      const element = document.getElementById("hero")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        console.error("Elemento com id 'cadastro' não encontrado")
      }
      setIsSubmitting(false)
    }, 100)
  }

  return (
    <section className="relative py-32 md:py-48 overflow-hidden z-[9999] lg:mt-[45px]">
      {/* Imagem de fundo com overlay */}

      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg-journey.png')", backgroundPosition: "center top" }}></div>

      {/* <div className="absolute inset-0 gradient-overlay-gold opacity-35"></div> */}

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
        <h2 className="text-2xl md:text-4xl text-custom-accent font-bold mb-8">Que bom que você não desistiu.</h2>

        <p className="text-background font-medium mb-8 md:text-2xl max-w-3xl mx-auto">
        <span className="font-bold">Chega de dar o seu máximo e só ficar se perguntando o que faltou.</span> Pare de cometer o erro de sempre se perguntar o que falta para você ter o resultado que o seu esforço realmente merece.
          <span className="font-bold"> Faça parte do Resgate dos Otimistas</span> ou continue se questionando e
          justificando o seu "quase sucesso".
        </p>

        <button onClick={handleClick} className="btn-secondary mt-6 bg-custom-secondary text-custom-secondary-foreground rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? "PROCESSANDO..." : "PARTICIPAR GRATUITAMENTE"}
        </button>
      </div>
    </section>
  )
}

