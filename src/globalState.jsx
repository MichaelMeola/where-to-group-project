import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// GLOBAL STATE
export const useEvents = create((set) => ({
  events: [],

  addEvent: (event) => set({ events: [...set.events, event] }),
}));

export const useProfileStore = create((set) => ({
  profile: {},
  profile: {},

  setProfile: (newProfile) => set({ profile: newProfile }),
}));
