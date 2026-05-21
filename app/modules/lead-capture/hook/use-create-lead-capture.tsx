import { formatRequestErrorMessage } from "@/app/modules/format-request-error-message";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { LeadRegistrationPayload, LeadCaptureStartResponse } from "../lead-capture.model";

export const useCreateLeadCapture = () => {
  return useMutation({
    mutationFn: (body: LeadRegistrationPayload) => {
      return axios.post<LeadCaptureStartResponse>("/api/lead-registration/start", body);
    },
    onError: (error) => {
      toast.error(formatRequestErrorMessage(error), {
        duration: 4000,
      });
      return false;
    },
    onSuccess: () => {
      toast.success(("SUCESSO"), {
        duration: 10000,
      })
    }
  });
};
