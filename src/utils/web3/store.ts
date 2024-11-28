import { create } from "zustand";

type ReferalState = {
  referalState: string | null;
  setReferalState: (_value: string) => void;
};

const useStore = create<ReferalState>((set) => ({
  referalState: null,
  setReferalState: (_value) => set({ referalState: _value })
}));

export default useStore;
