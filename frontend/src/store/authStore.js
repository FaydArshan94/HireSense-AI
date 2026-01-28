import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isAuthLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    }),

  clearUser: () => set({ user: null, isAuthLoading: false }),
}));
