"use client"

import { useState } from "react"

export default function MentorSection() {
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
              QUEM VAI SER O SEU
              <br />
              <span className="text-foreground">MENTOR NESSA JORNADA?</span>
            </h2>

            <h3 className="text-custom-primary-gold text-xl md:text-3xl mb-2 font-bold">Elton Euler</h3>
            <p className="text-custom-primary-gold mb-6 text-xl">Líder e Idealizador da Aliança Divergente</p>

            <div className="space-y-4 text-custom-foreground text-xl">
              <p>Elton Euler é um dos maiores exemplos de superação e transformação da atualidade.</p>

              <p>
                Antes de se tornar multimilionário e referência no desenvolvimento humano, quebrou 17 vezes e chegou a
                acreditar que sua vida não tinha mais solução.
              </p>

              <p>
                Decidido a mudar sua história, Elton descobriu o que realmente bloqueava seus resultados e, em menos de
                3 anos, saiu das dívidas e construiu uma vida de prosperidade.
              </p>

              <p>
                Hoje, já ajudou mais de 160 mil pessoas em 60 países a destravarem suas vidas financeiras, suas carreiras e suas relações emocionais com técnicas práticas e poderosas.
              </p>

              <p>
                Agora, ele vai te mostrar o que está faltando para você desbloquer sua Permissão e elevar sua vida a um
                novo patamar.
              </p>

              <p className="font-semibold text-center md:text-left">Você está pronto para descobrir?</p>
            </div>

            <button onClick={handleClick} className="bg-custom-primary-gold text-custom-foreground mt-8 px-6 py-3 rounded-md font-medium mx-auto md:mx-0 block" disabled={isSubmitting}>
              {isSubmitting ? "PROCESSANDO..." : "PARTICIPAR GRATUITAMENTE"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

