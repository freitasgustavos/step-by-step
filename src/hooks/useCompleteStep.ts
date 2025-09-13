import { completeSetp } from "@/services/stepService";
import { useRegistrationStore } from "@/stores/registrationStore";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

export const useCompleteStep = () => {
  const { notification } = App.useApp();
  const submissionId = useRegistrationStore((state) => state.submissionId);

  const mutation = useMutation({
    mutationFn: () => completeSetp(submissionId),
    onError: (error) => {
      notification.error({
        message: "Erro ao concluir",
        description: error.message,
      });
    },
  });

  return mutation;
};
