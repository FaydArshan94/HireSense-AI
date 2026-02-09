import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios/axios";

export function useAnalysisUsage() {
  return useQuery({
    queryKey: ["analysis-usage"],
    queryFn: async () => {
      const res = await api.get("/ai/usage");
      return res.data;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}
