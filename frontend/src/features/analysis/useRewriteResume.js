import { useMutation } from "@tanstack/react-query";
import api from "../../utils/axios/axios";
import { toast } from "react-hot-toast";

export function useRewriteResume() {
  return useMutation({
    mutationFn: async ({ analysisId }) => {
      const res = await api.post(
        "/ai/rewrite-resume",
        { analysisId },
        { responseType: "blob" }
      );
      return res.data;
    },
    onSuccess: (data) => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "hiresense_optimized_resume.pdf");
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Resume rewritten and downloaded successfully!");
    },
    onError: (error) => {
      console.error("Failed to rewrite resume:", error);
      toast.error(
        error.response?.data?.error || "Failed to rewrite resume. Please try again."
      );
    },
  });
}
