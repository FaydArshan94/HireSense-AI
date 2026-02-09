"use client";
import { useAuthStore } from "../../../store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";

const layout = ({ children }) => {
  const { isAuthenticated, isAuthLoading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center space-y-4">
          <div
            className="p-4 rounded-lg animate-bounce "
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
            }}
          >
            <Brain className="w-10 h-10 text-white" />
          </div>{" "}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default layout;
