"use client";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const layout = ({ children }) => {
  const { isAuthenticated, isAuthLoading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    ); // or a loading spinner
  }

  return <>{children}</>;
};

export default layout;
