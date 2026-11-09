import { create } from "zustand";

interface ProfileState {
  email: string;
  nickname: string;
  setNickname: (nickname: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  email: "umcine@example.com",
  nickname: "무비팬",
  setNickname: (nickname) => set({ nickname }),
}));
