import {
  AddressData,
  ContactData,
  DocumentData,
  IdentificationData,
  Submission,
} from "@/types/registration";
import { api } from "@/services/api";
import { errorHandler } from "@/lib/ErrorHandler";

type StepPayload = {
  submissionId?: string | null;
  step: number;
  data: IdentificationData | DocumentData | ContactData | AddressData;
};

export const saveStep = async (payload: StepPayload): Promise<Submission> => {
  try {
    const response = await api.post<Submission>("/submission/step", payload);
    return response.data;
  } catch (error) {
    throw errorHandler(error, "Ocorreu um erro ao salvar a etapa.");
  }
};

export const completeSetp = async (
  submissionId?: string | null
): Promise<Submission> => {
  try {
    if (!submissionId) {
      throw errorHandler(
        null,
        "ID do cadastro é obrigatório para completar o envio."
      );
    }
    const response = await api.patch<Submission>(
      `/submission/${submissionId}/complete`
    );
    return response.data;
  } catch (error) {
    throw errorHandler(error, "Ocorreu um erro ao finalizar o cadastro.");
  }
};
