"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { formatRequestErrorMessage } from "@/app/modules/format-request-error-message";
import {
  isMultipleInputType,
  isOpenInputType,
} from "@/app/modules/lead-score/lead-score-input-type";
import {
  buildLeadScoreAnswerItems,
  readQuestTesteUrlContext,
} from "@/app/modules/lead-score/lead-score-transformers";
import {
  calculateTotalScore,
  formatAnswersForTracking,
  resolveFaixaByTotalScore,
} from "@/app/modules/lead-score/lead-score-tracking-helpers";
import type { AnswerValue } from "@/app/modules/lead-score/lead-score.types";
import { useGetLeadScoreQuestions } from "@/app/modules/lead-score/hook/use-get-lead-score-questions";
import { useCreateLeadScoreStart } from "@/app/modules/lead-score/hook/use-create-lead-score-start";
import {
  DEFAULT_QUEST_FORM_VERSION_ID,
  resolveQuestTesteWhatsappUrl,
} from "@/lib/config/quest-config";
import ContainerQuest from "./container";
import TagManager from "react-gtm-module";
import { useSearchParams } from "next/navigation";
import { getTagByTemperatureOro } from "@/lib/temperature-utils";
import { TRACKING_GA_PROPERTY_ID, TRACKING_LEADSCORE_EVENT_ID, TRACKING_LEADSCORE_EVENT_NAME, TRACKING_LEADSCORE_RESPONSES_WEBHOOK, TRACKING_LEADSCORE_SUMMARY_WEBHOOK } from "@/lib/config/tracking";
import { sendLeadTracking } from "@/lib/tracking/leadTracking";
import useUserIP from "../hooks/useUserIP";
import { sendLeadScoreTracking } from "@/lib/tracking/leadScoreTracking";

function QuizNewPageContent() {
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formVersionId, setFormVersionId] = useState<string>("");
  const [leadRegistrationRequestId, setLeadRegistrationRequestId] = useState("");
  const [temperature, setTemperature] = useState("f");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [temperatura, setTemperatura] = useState<string | null>(null)
  const [domain, setDomain] = useState<string>("")
  const [launch, setLaunch] = useState<string>("[ORO][MAR26]");
  const [isLoading, setIsLoading] = useState(false)
  const [hasSent, setHasSent] = useState(false)

  const userIp = useUserIP();

  const mutationCreateLeadScoreStart = useCreateLeadScoreStart();

  // *********** INICIO - CODIGO LEGADO *********** 
  const mapTagSendFlow = {
    f: "https://redirects.aliancadivergente.com.br/q6xh",
    org: "https://redirects.aliancadivergente.com.br/oro-pages-org",
    m: "https://redirects.aliancadivergente.com.br/oro-pages-m",
    q: "https://redirects.aliancadivergente.com.br/oro-pages-q",
  } as any;

  const getWhatsappUrl = () => {
    const validKeys = ["f", "m", "q", "org"] as const;
    const key = (temperatura || "").toLowerCase();
    const resolvedKey = (validKeys as readonly string[]).includes(key) ? key : "f";
    return mapTagSendFlow[resolvedKey] || mapTagSendFlow["f"];
  }
  // Capturar o domínio da página
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      console.log('Current domain:', currentDomain);
      setDomain(currentDomain);
    }

  }, []);

  useEffect(() => {
    const tem = searchParams.get('temperature')
    setTemperatura(tem)
  }, [searchParams])

  useEffect(() => {
    if (temperatura) {
      const calculatedLaunch = getTagByTemperatureOro(temperatura);
      if (calculatedLaunch) {
        setLaunch(calculatedLaunch);
        console.log("Launch definido:", calculatedLaunch);
      }
    }
  }, [temperatura])
  // *********** FINAL - CODIGO LEGADO *********** 

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { formVersionId, leadRegistrationRequestId, temperature } =
      readQuestTesteUrlContext(
        window.location.search,
        DEFAULT_QUEST_FORM_VERSION_ID
      );

    if (!leadRegistrationRequestId) {
      window.history.back();
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    setFormVersionId(formVersionId);
    setLeadRegistrationRequestId(leadRegistrationRequestId);
    setTemperature(temperature);
    setEmail(urlParams.get("email") || "");
    setPhone(urlParams.get("phone") || urlParams.get("telefone") || "");
  }, []);

  const {
    data: questions = [],
    isPending: isQuestionsPending,
    isFetching: isQuestionsFetching,
    error: questionsError,
    refetch: refetchQuestions,
    dataUpdatedAt: questionsDataUpdatedAt,
  } = useGetLeadScoreQuestions(formVersionId);

  const isFetchingQuestions =
    !formVersionId || isQuestionsPending || isQuestionsFetching;
  const isSubmittingAnswers = mutationCreateLeadScoreStart.isPending;
  const fetchError = useMemo(() => {
    if (!questionsError) {
      return null;
    }

    return formatRequestErrorMessage(questionsError);
  }, [questionsError]);

  useEffect(() => {
    if (!questionsDataUpdatedAt) {
      return;
    }

    setAnswers({});
    setCurrentQuestion(0);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, [questionsDataUpdatedAt]);

  const whatsappUrl = useMemo(() => {
    return resolveQuestTesteWhatsappUrl(temperature);
  }, [temperature]);

  const fetchQuestions = useCallback(async () => {
    await refetchQuestions();
  }, [refetchQuestions]);

  const currentQuestionData = questions[currentQuestion];
  const selectedValue = currentQuestionData
    ? answers[currentQuestionData.id]
    : "";
  const selectedSingleValue =
    typeof selectedValue === "string" ? selectedValue : "";
  const selectedMultipleValue = Array.isArray(selectedValue)
    ? selectedValue
    : [];

  const isCurrentQuestionAnswered = useMemo(() => {
    if (!currentQuestionData) {
      return false;
    }

    if (!currentQuestionData.required) {
      return true;
    }

    if (isMultipleInputType(currentQuestionData.inputType)) {
      return selectedMultipleValue.length > 0;
    }

    return selectedSingleValue.trim().length > 0;
  }, [
    currentQuestionData,
    selectedMultipleValue.length,
    selectedSingleValue,
  ]);

  const handleAnswer = (value: string) => {
    if (!currentQuestionData) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestionData.id]: value,
    }));
  };

  const handleMultipleAnswer = (value: string) => {
    if (!currentQuestionData) {
      return;
    }

    setAnswers((previous) => {
      const previousValue = previous[currentQuestionData.id];
      const selectedItems = Array.isArray(previousValue) ? previousValue : [];
      const exists = selectedItems.includes(value);
      const nextItems = exists
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value];

      return {
        ...previous,
        [currentQuestionData.id]: nextItems,
      };
    });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const submitLeadScore = async () => {
    if (!leadRegistrationRequestId) {
      throw new Error("requestId nao encontrado na URL.");
    }

    // *********** INICIO - CODIGO LEGADO *********** 
    const executeTracking = async () => {
      setIsLoading(true);

      // Prepare detailed answers with questions and selected options
      const detailedAnswers: Record<string, string> = {};
      Object.entries(answers).forEach(([questionId, answerValue]) => {
        const questionObj = questions.find(q => q.id === questionId);
        const selectedOption = questionObj?.options.find(opt => opt.value === answerValue);

        if (questionObj) {
          const valueStr = typeof answerValue === "string" ? answerValue : Array.isArray(answerValue) ? answerValue.join(", ") : "";
          detailedAnswers[questionObj.question] = selectedOption?.label || valueStr;
        }
      });

      // Prepare the data to be sent to GTM
      const gtmData = {
        email: email,
        phone: phone,
        answers: answers,
        totalScore: Number(totalScore.toFixed(1)),
        faixa: faixa,
        temperature: temperatura,
      };

      const payload = {
        ...gtmData,
        detailedAnswers: detailedAnswers,
        domain: domain,
        launch: launch,
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_content: searchParams.get('utm_content') || '',
        utm_term: searchParams.get('utm_term') || '',
        path: window.location.pathname,
      }

      const leadScoreAnswers: string[] = questions.slice(0, 10).map((question) => {
        const answerValue = answers[question.id];
        if (answerValue === undefined || answerValue === null) {
          return "";
        }

        if (isOpenInputType(question.inputType)) {
          return typeof answerValue === "string" ? answerValue : answerValue.join(", ");
        }

        const selectedOption = question.options?.find(opt => opt.value === answerValue);
        const valueStr = typeof answerValue === "string" ? answerValue : Array.isArray(answerValue) ? answerValue.join(", ") : "";
        return selectedOption?.label || valueStr || "";
      });

      // Still send to GTM as before
      if (TagManager.dataLayer) {
        TagManager.dataLayer({
          dataLayer: {
            event: "leadscore",
            ...gtmData
          },
        });
      }

      const eventId = TRACKING_LEADSCORE_EVENT_ID || `${Date.now()}.${Math.random().toString().slice(2, 8)}`;

      try {
        await sendLeadTracking(
          {
            baseUrl: TRACKING_LEADSCORE_SUMMARY_WEBHOOK,
            eventName: TRACKING_LEADSCORE_EVENT_NAME,
            eventId,
            gaPropertyId: TRACKING_GA_PROPERTY_ID,
          },
          {
            leadEmail: email ?? undefined,
            leadPhone: phone ?? undefined,
            ipAddress: userIp ?? null,
            extraParams: {
              faixa,
              totalScore: totalScore.toFixed(1),
              temperature: temperatura ?? undefined,
              domain,
              launch,
              path: window.location.pathname,
            },
          },
        );
      } catch (error) {
        console.error("Erro ao enviar leadscore resumo:", error);
      }

      try {
        await sendLeadScoreTracking({
          baseUrl: TRACKING_LEADSCORE_RESPONSES_WEBHOOK,
          gaPropertyId: TRACKING_GA_PROPERTY_ID,
          answers: leadScoreAnswers,
          extras: {
            email: email ?? undefined,
            phone: phone ?? undefined,
            faixa,
            totalScore: Number(totalScore.toFixed(1)),
          },
        });
      } catch (error) {
        console.error("Erro ao enviar leadscore tracking:", error);
      }

      try {
        const response = await fetch('/api/quiz-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setHasSent(true);
      }
    };

    void executeTracking();
    //  *********** FINAL - CODIGO LEGADO *********** 

    const totalScore = calculateTotalScore(questions, answers);
    const faixa = resolveFaixaByTotalScore(totalScore);
    const formattedAnswers = formatAnswersForTracking(questions, answers);

    const gtmData = {
      email,
      phone,
      answers: formattedAnswers,
      totalScore,
      faixa,
    };

    const payload = {
      lead_registration_request_id: leadRegistrationRequestId,
      form_version_id: formVersionId,
      submitted_at: new Date().toISOString(),
      answers: buildLeadScoreAnswerItems(questions, answers),
      raw_payload: {
        source: "frontend",
        step: "quiz",
        gtmData,
      },
    };

    await mutationCreateLeadScoreStart.mutateAsync(payload);

    if (TagManager.dataLayer) {
      TagManager.dataLayer({
        dataLayer: {
          event: "leadscore",
          ...gtmData
        },
      });
    }
  };

  const handleNext = async () => {
    if (!currentQuestionData) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      return;
    }

    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      await submitLeadScore();
      setSubmitSuccess(true);
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Erro ao enviar respostas do quiz:", error);
      setSubmitError(formatRequestErrorMessage(error));
    }
  };

  return (
    <ContainerQuest
      isFetchingQuestions={isFetchingQuestions}
      fetchError={fetchError}
      fetchQuestions={fetchQuestions}
      currentQuestionData={currentQuestionData}
      submitError={submitError}
      submitSuccess={submitSuccess}
      totalQuestions={questions.length}
      selectedSingleValue={selectedSingleValue}
      selectedMultipleValue={selectedMultipleValue}
      handleAnswer={handleAnswer}
      handleMultipleAnswer={handleMultipleAnswer}
      currentQuestion={currentQuestion}
      handleBack={handleBack}
      handleNext={handleNext}
      isCurrentQuestionAnswered={isCurrentQuestionAnswered}
      isSubmittingAnswers={isSubmittingAnswers}
      whatsappUrl={whatsappUrl}
    />
  );
}

export default function QuizNewPage() {
  return (
    <Suspense fallback={null}>
      <QuizNewPageContent />
    </Suspense>
  );
}
