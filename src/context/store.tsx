import { Objective } from "@/utils/types";
import { create } from "zustand";

interface ObjectivesStore {
  objectives: Objective[];
  setObjectives: (objectives: Objective[]) => void;
  appendObjectives: (objectives: Objective[]) => void;
  removeObjective: (objectiveId: string) => void;
  updateObjective: (objectiveId: string, newData: any) => void;
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
  updateObjective: (objectiveId, newData) =>
    set((state) => ({
      objectives: state.objectives.map((objective) =>
        objective.id === objectiveId ? { ...objective, ...newData } : objective
      ),
    })),
}));
