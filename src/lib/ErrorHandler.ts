import { AxiosError } from "axios";

export const errorHandler = (error: unknown, defaultMessage: string): Error => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const errorMessage = error.response.data?.message || defaultMessage;
      return new Error(errorMessage);
    } else if (error.request) {
      return new Error(
        "Não foi possível se conectar ao servidor. Verifique sua conexão."
      );
    }
  }
  return new Error("Ocorreu um erro inesperado.");
};
