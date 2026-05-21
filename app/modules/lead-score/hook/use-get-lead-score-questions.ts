import { useQuery } from "@tanstack/react-query";
import { fetchLeadScoreQuestions } from "@/app/modules/lead-score/lead-score.service";
import { mapBackendQuestionsToQuizQuestions } from "@/app/modules/lead-score/lead-score-transformers";
import type { QuizQuestion } from "@/app/modules/lead-score/lead-score.types";

export const LEAD_SCORE_QUESTIONS_QUERY_KEY = "lead-score-questions";

export const useGetLeadScoreQuestions = (formVersionId: string) => {
  return useQuery<QuizQuestion[]>({
    queryKey: [LEAD_SCORE_QUESTIONS_QUERY_KEY, formVersionId],
    enabled: Boolean(formVersionId),
    queryFn: async () => {
      const data = await fetchLeadScoreQuestions(formVersionId);
      const normalizedQuestions = mapBackendQuestionsToQuizQuestions(
        data.questions || []
      );

      if (!normalizedQuestions.length) {
        throw new Error("Nenhuma pergunta encontrada para esta versao.");
      }

      return normalizedQuestions;
    },
  });
};
