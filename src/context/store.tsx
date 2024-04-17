import { Objective } from "@/utils/types";
import { create } from "zustand";

interface ObjectivesStore {
  objectives: Objective[];
  setObjectives: (objectives: Objective[]) => void;
  appendObjectives: (objectives: Objective[]) => void;
}

export const useObjectivesStore = create<ObjectivesStore>((set) => ({
  objectives: [],
  setObjectives: (objectives) => set({ objectives }),
  appendObjectives: (objectives) =>
    set((state) => ({ objectives: [...state.objectives, ...objectives] })),
}));
