import { AxiosError } from "axios";

export const formatRequestErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const { response } = error as AxiosError<{ message: string }>;

    if (response?.data.message) {
      return response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Um erro inesperado aconteceu. Tente novamente mais tarde ou entre em contato com o nosso suporte";
};
