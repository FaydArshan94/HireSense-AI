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
    onError: async (error) => {
      console.error("Failed to rewrite resume:", error);
      let errorMessage = "Failed to rewrite resume. Please try again.";
      
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const json = JSON.parse(text);
          errorMessage = json.error || errorMessage;
        } catch (e) {
          // ignore parsing error
        }
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast.error(errorMessage);
    },
  });
}
