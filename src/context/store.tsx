import { Objective } from "@/utils/types";
import { create } from "zustand";

interface ObjectivesStore {
  objectives: Objective[];
  setObjectives: (objectives: Objective[]) => void;
  appendObjectives: (objectives: Objective[]) => void;
  removeObjective: (objectiveId: string) => void;
}

export const useObjectivesStore = create<ObjectivesStore>((set) => ({
  objectives: [],
  setObjectives: (objectives) => set({ objectives }),
  appendObjectives: (objectives) =>
    set((state) => ({ objectives: [...state.objectives, ...objectives] })),
  removeObjective: (objectiveId) =>
    set((state) => ({
      objectives: state.objectives.filter(
        (objective) => objective.id !== objectiveId
      ),
    })),
}));
