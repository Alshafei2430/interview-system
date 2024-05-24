import { create } from "zustand";

type ConnectionStore = {
  isConnected: boolean;
  changeConnectionStatus: (status: boolean) => void;
};

export const useConnection = create<ConnectionStore>()((set) => ({
  isConnected: false,
  changeConnectionStatus: (status) => set(() => ({ isConnected: status })),
}));
