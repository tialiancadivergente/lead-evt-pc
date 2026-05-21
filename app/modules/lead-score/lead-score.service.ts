import type {
  BackendQuestionsResponse,
  LeadScoreStartPayload,
} from "@/app/modules/lead-score/lead-score.types";

export async function fetchLeadScoreQuestions(
  formVersionId: string
): Promise<BackendQuestionsResponse> {
  const response = await fetch(
    `/api/lead-score/questions/${encodeURIComponent(formVersionId)}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Falha ao buscar perguntas.");
  }

  return (await response.json()) as BackendQuestionsResponse;
}

export async function submitLeadScoreStart(
  payload: LeadScoreStartPayload
): Promise<void> {
  const response = await fetch("/api/lead-score/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText || "Falha ao enviar respostas.");
  }
}
