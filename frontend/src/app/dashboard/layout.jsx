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
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default layout;
