"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomRadio } from "@/app/components/custom-input";
import {
  isMultipleInputType,
  isOpenInputType,
} from "@/app/modules/lead-score/lead-score-input-type";
import type { QuizQuestion } from "@/app/modules/lead-score/lead-score.types";

interface ContainerQuestProps {
  isFetchingQuestions: boolean;
  fetchError: string | null;
  fetchQuestions: () => void | Promise<void>;
  currentQuestionData: QuizQuestion | undefined;
  submitError: string | null;
  submitSuccess: boolean;
  totalQuestions: number;
  selectedSingleValue: string;
  selectedMultipleValue: string[];
  handleAnswer: (value: string) => void;
  handleMultipleAnswer: (value: string) => void;
  currentQuestion: number;
  handleBack: () => void;
  handleNext: () => void | Promise<void>;
  isCurrentQuestionAnswered: boolean;
  isSubmittingAnswers: boolean;
  whatsappUrl: string;
}

export default function ContainerQuest({
  isFetchingQuestions,
  fetchError,
  fetchQuestions,
  currentQuestionData,
  submitError,
  submitSuccess,
  totalQuestions,
  selectedSingleValue,
  selectedMultipleValue,
  handleAnswer,
  handleMultipleAnswer,
  currentQuestion,
  handleBack,
  handleNext,
  isCurrentQuestionAnswered,
  isSubmittingAnswers,
  whatsappUrl,
}: ContainerQuestProps) {
  const progress = totalQuestions
    ? ((currentQuestion + 1) / totalQuestions) * 100
    : 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div>
      <section
        className={`relative flex items-center justify-center overflow-hidden h-full `}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#0a3a4a] to-[#000000] opacity-100"></div>
          <Image
            src="https://resgatedosotimistas.com.br/wp-content/uploads/O-Resgate-dos-Otimistas-V7-TYP-Slice-1.webp"
            alt="Background Resgate dos Otimistas"
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.3 }}
          />
        </div>

        <div className="container mx-auto relative h-full px-4">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-6 md:mb-8 flex justify-center">
                <Image
                  src="/images/logo-resgate-dos-otimistas.png"
                  alt="Logotipo Resgate dos otimistas"
                  width={320}
                  height={196}
                  priority
                  className="object-contain select-none pointer-events-none w-[158px] md:w-[320px] h-auto"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>

              <h1
                className={`text-2xl md:text-5xl font-bold text-custom-primary-gold -mt-4 mb-1 md:mb-2 text-center`}
              >
                FALTA APENAS UM PASSO
              </h1>
              <h2
                className={`text-2xl md:text-5xl font-bold text-custom-primary-gold mb-4 md:mb-7 text-center`}
              >
                PARA GARANTIR SUA VAGA!
              </h2>

              <p
                className="text-white text-base md:text-lg mb-5 md:mb-7 text-center"
                style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}
              >
                Para concluir sua inscricao, responda:
              </p>

              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-zinc-900 rounded-lg border border-white p-4 md:p-7 mb-6 md:mb-8 ">
                  {isFetchingQuestions && (
                    <div className="text-white text-center py-8">
                      Carregando perguntas...
                    </div>
                  )}

                  {!isFetchingQuestions && fetchError && (
                    <div className="text-center py-4">
                      <p className="text-red-300 mb-4">{fetchError}</p>
                      <Button
                        onClick={fetchQuestions}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        TENTAR NOVAMENTE
                      </Button>
                    </div>
                  )}

                  {!isFetchingQuestions && !fetchError && currentQuestionData && (
                    <>
                      {submitError && (
                        <p className="text-red-300 text-sm mb-3 text-left">
                          {submitError}
                        </p>
                      )}
                      {submitSuccess && (
                        <p className="!text-green-300 text-sm mb-3 text-left">
                          Respostas enviadas com sucesso.
                        </p>
                      )}

                      <div className="mb-4">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <h3
                        className="text-white text-base md:text-lg font-medium mb-4 md:mb-5 md:text-left text-center"
                        style={{
                          color: "#fff",
                          fontFamily: '"Roboto", Sans-serif',
                        }}
                      >
                        {currentQuestionData.question}
                      </h3>

                      {isOpenInputType(currentQuestionData.inputType) ? (
                        <input
                          type="text"
                          value={selectedSingleValue}
                          onChange={(e) => handleAnswer(e.target.value)}
                          placeholder="Digite sua resposta aqui..."
                          className="w-full px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                        />
                      ) : isMultipleInputType(currentQuestionData.inputType) ? (
                        <div className="space-y-2">
                          {currentQuestionData.options.map((option) => {
                            const checked = selectedMultipleValue.includes(
                              option.value
                            );
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleMultipleAnswer(option.value)}
                                className="w-full text-left flex items-center gap-2 text-white"
                              >
                                <span
                                  className={`h-4 w-4 border border-white rounded-sm inline-flex items-center justify-center ${
                                    checked ? "bg-white" : "bg-transparent"
                                  }`}
                                >
                                  {checked && (
                                    <span className="h-2 w-2 bg-teal-700 rounded-sm" />
                                  )}
                                </span>
                                <span>{option.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <CustomRadio
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                          options={currentQuestionData.options}
                          value={selectedSingleValue}
                          onChange={handleAnswer}
                        />
                      )}

                      <div className="grid grid-cols-2 gap-3 md:gap-5 mt-5 md:mt-7">
                        {currentQuestion > 0 ? (
                          <Button
                            variant="outline"
                            onClick={handleBack}
                            className="bg-transparent border-gray-700 text-white hover:bg-gray-800 py-3 md:py-5 text-sm md:text-base"
                            style={{ fontFamily: '"Roboto", Sans-serif' }}
                          >
                            VOLTAR
                          </Button>
                        ) : (
                          <div />
                        )}
                        <Button
                          onClick={handleNext}
                          disabled={!isCurrentQuestionAnswered || isSubmittingAnswers}
                          className={`bg-teal-600 hover:bg-teal-700 text-white py-3 md:py-5 text-sm md:text-base ${
                            currentQuestion === 0 ? "col-span-2" : ""
                          }`}
                          style={{ fontFamily: '"Roboto", Sans-serif' }}
                        >
                          {isLastQuestion
                            ? isSubmittingAnswers
                              ? "ENVIANDO..."
                              : submitSuccess
                              ? "ENVIADO"
                              : "ENVIAR"
                            : "PROXIMA"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6 md:mb-8 text-center" style={{ color: "#fff" }}>
                <p
                  className="text-white text-xs md:text-sm mb-4 md:mb-5"
                  style={{ fontFamily: '"Roboto", Sans-serif' }}
                >
                  Apos responder as questoes, toque no botao abaixo
                  <br className="hidden md:block" />
                  para receber o link e materiais do evento:
                </p>

                <Button
                  className="w-full max-w-sm py-4 md:py-6 text-sm md:text-base hover:opacity-90 transition-opacity duration-300 rounded-3xl"
                  onClick={() => window.open(whatsappUrl, "_blank")}
                  style={{
                    background:
                      "linear-gradient(96.48deg, #065100 -18.33%, #49E413 159.75%)",
                    fontFamily: '"Roboto", Sans-serif',
                  }}
                >
                  Clique aqui para entrar no Grupo no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-black h-[150px] flex items-center justify-center">
        <p
          className="text-gray-400 text-sm md:text-base text-center"
          style={{ color: "#fff", fontFamily: '"Roboto", Sans-serif' }}
        >
          © 2023. All rights reserved. Politica de Privacidade.
        </p>
      </footer>
    </div>
  );
}
