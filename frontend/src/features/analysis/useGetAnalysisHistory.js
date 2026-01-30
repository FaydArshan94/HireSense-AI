import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axios/axios";

export function useGetAnalysisHistory() {
    return useQuery({
        queryKey: ["analysisHistory"],
        queryFn: async () => {
            const res = await api.get("/ai/history");
            return res.data.analyses;
        },
    });
}
