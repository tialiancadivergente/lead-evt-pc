"use client"

import { useState } from "react"

export default function JourneySection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = () => {
    setIsSubmitting(true)
    
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
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg-journey.png')", backgroundPosition: "center top" }}></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
        <h2 className="text-2xl md:text-4xl text-custom-accent font-bold mb-8">Que bom que você não desistiu.</h2>

        <p className="text-background font-medium mb-8 md:text-2xl max-w-3xl mx-auto">
          O Resgate dos Otimistas é um treinamento online voltado para desenvolvimento pessoal, clareza emocional e tomada de decisão.
          <br />
          <br />
          <span className="font-bold">
            Ao longo do conteúdo, você terá acesso a reflexões, exercícios e estratégias para compreender melhor padrões de comportamento, organização da vida pessoal e construção de hábitos mais conscientes.
          </span>
          <br />
          <br />
          Uma experiência criada para pessoas que desejam evoluir com mais direção, responsabilidade e clareza sobre a própria trajetória.
        </p>

        <button onClick={handleClick} className="btn-secondary mt-6 bg-custom-secondary text-custom-secondary-foreground rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? "PROCESSANDO..." : "QUERO ME INSCREVER"}
        </button>
      </div>
    </section>
  )
}