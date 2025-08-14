import { create } from "zustand";

type ProcessStatus = "created" | "extracting" | "understanding" | "generating" | "done" | "error";

type ProcessState = {
  currentProcessId?: string;
  status?: ProcessStatus;
  progress: number;
  setProcessId: (id?: string) => void;
  setStatus: (status?: ProcessStatus) => void;
  setProgress: (progress: number) => void;
};

export const useProcessStore = create<ProcessState>((set) => ({
  currentProcessId: undefined,
  status: undefined,
  progress: 0,
  setProcessId: (id) => set({ currentProcessId: id }),
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
}));


