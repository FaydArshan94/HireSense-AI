"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useMemo, useEffect } from "react";
import api from "@/utils/axios/axios";
import { useAuthStore } from "@/store/authStore";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import LayoutProvider from "@/components/layout/LayoutProvider";

export function Providers({ children }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
    [],
  );

  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          clearUser();
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        clearUser();
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LayoutProvider>{children}</LayoutProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
