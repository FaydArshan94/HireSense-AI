"use client";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const layout = ({children}) => {
  const { isAuthenticated,isAuthLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isAuthLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  if (isAuthLoading) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default layout;
