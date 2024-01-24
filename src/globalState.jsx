import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// GLOBAL STATE
export const useEvents = create((set) => ({
  events: [],

  addEvent: (event) => set({ events: [...set.events, event] }),
}));
