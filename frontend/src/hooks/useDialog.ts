import { create } from "zustand";

type DialogProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDialog = create<DialogProps>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
