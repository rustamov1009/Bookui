import { create } from "zustand";
export const useUserStore = create((set) => {
  return {
    user: null,
    setUser: (user) => set((state) => ({ ...state, user })),
  };
});
