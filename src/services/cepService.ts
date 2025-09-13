import { CepResponse } from "@/types/registration";
import { api } from "./api";
import { errorHandler } from "@/lib/ErrorHandler";

export async function cepService(cep: string): Promise<CepResponse> {
  const sanitizedCep = cep.replace(/\D/g, "");
  try {
    const response = await api.get<CepResponse>(`/cep/${sanitizedCep}`);
    return response.data;
  } catch (error) {
    if (error) {
      throw errorHandler(error, "Ocorreu um erro ao buscar o CEP.");
    }
    throw new Error("Ocorreu um erro inesperado ao buscar o CEP.");
  }
}
