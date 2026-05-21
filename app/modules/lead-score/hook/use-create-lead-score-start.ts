import { useMutation } from "@tanstack/react-query";
import { submitLeadScoreStart } from "@/app/modules/lead-score/lead-score.service";
import type { LeadScoreStartPayload } from "@/app/modules/lead-score/lead-score.types";

export const useCreateLeadScoreStart = () => {
  return useMutation({
    mutationFn: (payload: LeadScoreStartPayload) =>
      submitLeadScoreStart(payload),
  });
};
