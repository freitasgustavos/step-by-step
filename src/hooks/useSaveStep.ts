import { saveStep } from "@/services/stepService";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

export const useSaveStep = () => {
  const { notification } = App.useApp();

  const mutation = useMutation({
    mutationFn: saveStep,
    onError: (error) => {
      notification.error({
        message: "Erro ao Salvar",
        description: error.message,
      });
    },
  });

  return mutation;
};
