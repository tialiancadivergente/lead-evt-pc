import {
  isBooleanInputType,
  isMultipleInputType,
  isNumericInputType,
  normalizeInputType,
} from "@/app/modules/lead-score/lead-score-input-type";
import type {
  AnswerValue,
  BackendOption,
  BackendQuestion,
  LeadScoreAnswerPayload,
  QuestTesteUrlContext,
  QuizQuestion,
} from "@/app/modules/lead-score/lead-score.types";

function parseOptionalNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const parsedValue = Number(value.replace(",", ".").trim());
  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function resolveBackendOptionPoints(option: BackendOption): number | undefined {
  const optionRecord = option as BackendOption & Record<string, unknown>;
  const pointsCandidates: unknown[] = [
    option.points,
    option.option_score,
    option.option_weight,
    option.weight,
    optionRecord.option_value,
    optionRecord.value,
    option.option_key,
  ];

  for (const candidate of pointsCandidates) {
    const parsedValue = parseOptionalNumber(candidate);
    if (parsedValue !== undefined) {
      return parsedValue;
    }
  }

  return undefined;
}

export function mapBackendQuestionsToQuizQuestions(
  questions: BackendQuestion[]
): QuizQuestion[] {
  return (questions || [])
    .slice()
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map((question) => ({
      id: question.question_id,
      key: question.question_key,
      question: question.question_text,
      inputType: normalizeInputType(question.input_type),
      required: Boolean(question.required),
      options: (question.options || [])
        .slice()
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        .map((option) => ({
          value: option.option_key || option.option_id,
          label: option.option_text || option.option_key || "Opcao",
          optionId: option.option_id,
          points: resolveBackendOptionPoints(option),
          score: resolveBackendOptionPoints(option),
        })),
    }));
}

export function buildLeadScoreAnswerItems(
  questions: QuizQuestion[],
  answers: Record<string, AnswerValue>
): LeadScoreAnswerPayload[] {
  const nowIso = new Date().toISOString();
  const payloadAnswers: LeadScoreAnswerPayload[] = [];

  questions.forEach((question) => {
    const answerValue = answers[question.id];

    if (answerValue === undefined || answerValue === null) {
      return;
    }

    if (isMultipleInputType(question.inputType)) {
      const selectedItems = Array.isArray(answerValue)
        ? answerValue
        : [String(answerValue)];

      selectedItems
        .filter((item) => item && item.trim().length > 0)
        .forEach((item) => {
          const matchedOption = question.options.find(
            (option) => option.value === item
          );

          payloadAnswers.push({
            question_id: question.id,
            option_id: matchedOption?.optionId,
            answer_text: matchedOption ? undefined : item,
            answered_at: nowIso,
          });
        });
      return;
    }

    const singleValue = Array.isArray(answerValue)
      ? answerValue[0] || ""
      : String(answerValue);
    const trimmedValue = singleValue.trim();

    if (!trimmedValue) {
      return;
    }

    const matchedOption = question.options.find(
      (option) => option.value === trimmedValue
    );
    const numericValue = isNumericInputType(question.inputType)
      ? Number(trimmedValue.replace(",", "."))
      : NaN;
    const lowerValue = trimmedValue.toLowerCase();
    const booleanValue = isBooleanInputType(question.inputType)
      ? ["true", "1", "sim", "yes"].includes(lowerValue)
      : undefined;

    payloadAnswers.push({
      question_id: question.id,
      option_id: matchedOption?.optionId,
      answer_text: matchedOption ? undefined : trimmedValue,
      answer_number: Number.isFinite(numericValue) ? numericValue : undefined,
      answer_bool: isBooleanInputType(question.inputType)
        ? booleanValue
        : undefined,
      answered_at: nowIso,
    });
  });

  return payloadAnswers;
}

export function readQuestTesteUrlContext(
  search: string,
  defaultFormVersionId: string
): QuestTesteUrlContext {
  const normalizedSearch = search.replace(/^\?+/, "?");
  const urlParams = new URLSearchParams(normalizedSearch);

  const temperatureFromUrl = (
    urlParams.get("temperature") ||
    urlParams.get("temperatura") ||
    ""
  )
    .toLowerCase()
    .trim();

  return {
    formVersionId: urlParams.get("formVersionId") || defaultFormVersionId,
    leadRegistrationRequestId:
      urlParams.get("requestId") ||
      urlParams.get("request_id") ||
      urlParams.get("lead_registration_request_id") ||
      "",
    temperature: temperatureFromUrl || "f",
    theme: urlParams.get("theme") || "1",
  };
}
