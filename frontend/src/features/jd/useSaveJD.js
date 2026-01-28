import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios/axios";

export function useSaveJD() {
  return useMutation({
    mutationFn: async ({ resumeId, jobTitle, jdText }) => {
      const res = await api.post("/jd/upload-jd", {
        resumeId,
        jobTitle,
        jdText,
      });

      return res.data
    },
  });
}
