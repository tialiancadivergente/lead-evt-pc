"use client"

import { useState } from "react"

export default function MentorSection() {
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
    <section id="mentor-section" className="bg-custom-background py-16 md:py-24">

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/5 mb-10 md:mb-0">
            <div className="relative w-full">
              <img 
                src="/images/mentor-image.png" 
                alt="Elton Euler - Mentor" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 md:pl-12 mt-[-150px] md:mt-0 p-10 md:p-0">
            <h2 className="text-2xl md:text-3xl text-custom-foreground mb-6 font-bold">
              QUEM VAI TE GUIAR
              <br />
              <span className="text-foreground">NESSA JORNADA?</span>
            </h2>

            <h3 className="text-custom-primary-gold text-xl md:text-3xl mb-2 font-bold">Elton Euler</h3>
            <p className="text-custom-primary-gold mb-6 text-xl">Líder e Idealizador da Aliança Divergente</p>

            <div className="space-y-4 text-custom-foreground text-xl">
              <p>
                Elton Euler é empresário, mentor e estudioso do desenvolvimento humano, com anos de experiência ajudando pessoas a desenvolverem mais clareza sobre comportamento, decisões e crescimento pessoal.
              </p>

              <p>
                Ao longo da própria trajetória, enfrentou desafios financeiros e profissionais que o levaram a buscar novos caminhos, hábitos e formas de enxergar a vida.
              </p>

              <p>
                A partir dessa experiência, desenvolveu uma metodologia voltada para autoconhecimento, responsabilidade pessoal e construção de uma vida mais equilibrada em diferentes áreas.
              </p>

              <p>
                Nesta jornada, Elton vai compartilhar reflexões, ferramentas e estratégias que podem ajudar você a enxergar padrões, ampliar sua percepção e tomar decisões com mais consciência.
              </p>

              <p className="font-semibold text-center md:text-left">
                Você está pronto para dar esse próximo passo?
              </p>
            </div>

            <button onClick={handleClick} className="bg-custom-primary-gold text-custom-foreground mt-8 px-6 py-3 rounded-md font-medium mx-auto md:mx-0 block" disabled={isSubmitting}>
              {isSubmitting ? "PROCESSANDO..." : "QUERO ME INSCREVER "}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}