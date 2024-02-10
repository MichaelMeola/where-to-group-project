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

      savedEvents: [],

      setSavedEvents: (savedEvents) => set({ savedEvents: savedEvents }),

      likedEvents: {},

      setLikedEvents: (updatedLikedEvents) =>
        set({ likedEvents: updatedLikedEvents }),

      logout: () => set({ profile: {}, likedEvents: {} }),

      toggleMap: () => set((state) => ({ toggleMap: !state.toggleMap })),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useMapStore = create((set) => ({
  isToggle: false,
  toggle: () => set((state) => ({ isToggle: !state.isToggle })),
}));