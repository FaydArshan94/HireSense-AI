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
  });
}
