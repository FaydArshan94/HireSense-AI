import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios/axios";

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: async ({ resumeId, jdId }) => {
      const res = await api.post("/ai/analyze-resume", {
        jdId,
      });

      return res.data;
    },

    onError: (error) => {
      if (
        error.response?.status === 429 &&
        error.response.data?.error === "DAILY_LIMIT_REACHED"
      ) {
        onLimit?.(error.response.data);
      }
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
}
