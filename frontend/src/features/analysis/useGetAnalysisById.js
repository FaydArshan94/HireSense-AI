import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axios/axios";

export function useGetAnalysisById(id) {
    return useQuery({
        queryKey: ["analysis", id],
        queryFn: async () => {
            const res = await api.get(`/ai/${id}`);
            return res.data.analysis;
        },
        enabled: !!id, // Only run query if ID is provided
    });
}
