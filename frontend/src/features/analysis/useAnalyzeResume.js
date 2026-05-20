import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios/axios";
import toast from "react-hot-toast";

export function useAnalyzeResume({ onLimit, onSuccess } = {}) {
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
      } else if (error.response?.status === 429) {
        toast.error(error.response.data?.error || "Daily AI limit reached. Try again tomorrow or upgrade your plan.");
      } else {
        toast.error("Analysis failed. Please try again.");
      }
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
}
