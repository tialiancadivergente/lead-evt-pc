"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { CustomRadio } from "@/app/components/custom-input"

import { questions } from "@/lib/questions";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [weights, setWeights] = useState<Record<number, number>>({})
  const [weightsV2, setWeightsV2] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestion]
    const selectedOption = question.options.find((option) => option.value === value)

    if (selectedOption) {
      const newAnswers = { ...answers, [question.id]: value }
      const newWeights = { ...weights, [question.id]: selectedOption.weight }
      const newWeightsV2 = { ...weightsV2, [question.id]: selectedOption.weightV2 || 0 }

      setAnswers(newAnswers)
      setWeights(newWeights)
      setWeightsV2(newWeightsV2)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calcular pontuação total
      const score = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
      setTotalScore(score)
      setCompleted(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=110&width=320"
              alt="O Resgate dos Otimistas"
              width={320}
              height={110}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl font-bold text-amber-500 mb-5">OBRIGADO POR PARTICIPAR!</h1>

          <div className="bg-zinc-900 rounded-lg p-8 mb-8">
            <p className="text-white text-lg mb-7">
              Com base nas suas respostas, temos um conteúdo especial para você. Clique no botão abaixo para acessá-lo!
            </p>

            <Button
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700"
              onClick={() => window.open("#", "_blank")}
            >
              Clique aqui para entrar no Grupo no WhatsApp
            </Button>
          </div>

          <p className="text-gray-400 text-sm">© 2023. All rights reserved. Política de Privacidade.</p>
        </div>
      </div>
    )
  }

  const currentQuestionData = questions[currentQuestion]
  const selectedValue = answers[currentQuestionData.id] || ""
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-8">
          <Image
            src="/placeholder.svg?height=110&width=320"
            alt="O Resgate dos Otimistas"
            width={320}
            height={110}
            className="mx-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-amber-500 mb-2">FALTA APENAS UM PASSO</h1>
        <h2 className="text-4xl font-bold text-amber-500 mb-7">PARA GARANTIR SUA VAGA!</h2>

        <p className="text-white text-lg mb-7">Para concluir sua inscrição, responda:</p>

        <div className="mb-5">
          <Progress value={progress} className="h-1.5 bg-gray-700" />
          <p className="text-right text-sm text-gray-400 mt-1.5">
            {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-7 mb-8">
          <h3 className="text-white text-lg font-medium mb-5">{currentQuestionData.question}</h3>

          <CustomRadio options={currentQuestionData.options} value={selectedValue} onChange={handleAnswer} />

          <div className="grid grid-cols-2 gap-5 mt-7">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="bg-transparent border-gray-700 text-white hover:bg-gray-800 py-5 text-base"
              >
                VOLTAR
              </Button>
            )}
            {currentQuestion === 0 && <div></div>}
            <Button
              onClick={handleNext}
              disabled={!selectedValue}
              className="bg-teal-600 hover:bg-teal-700 text-white py-5 text-base"
            >
              {isLastQuestion ? "ENVIAR" : "PRÓXIMA"}
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-white text-sm mb-5">
            Após responder as questões, toque no botão abaixo
            <br />
            para receber o link e materiais do evento:
          </p>

          <Button className="w-full py-6 text-lg bg-green-600 hover:bg-green-700" disabled>
            Clique aqui para entrar no Grupo no WhatsApp
          </Button>
        </div>

        <p className="text-gray-400 text-sm">© 2023. All rights reserved. Política de Privacidade.</p>
      </div>
    </div>
  )
}

