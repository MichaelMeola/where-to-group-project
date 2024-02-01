import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// GLOBAL STATE
export const useEventsStore = create((set) => ({
  events: [],
  setEvents: (events) => set({ events: events }),
  addEvent: (event) => set({ events: [...set.events, event] }),
}));

export const useProfileStore = create(
  persist(
    (set) => ({
      profile: {},
      setProfile: (newProfile) => set({ profile: newProfile }),
      logout: () => set({ profile: {} }),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
