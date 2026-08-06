import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  UserID: number;
  setUserID: (UserID: number) => void;
  selectedStrategyID: number;
  setSelectedStrategyID: (strategyID: number) => void;
  selectedTradeID: number;
  setSelectedTradeID: (tradeID: number) => void;
  resetUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      UserID: 0,
      setUserID: (UserID) => set({ UserID: UserID }),
      selectedStrategyID: 0,
      setSelectedStrategyID: (strategyID) => set({ selectedStrategyID: strategyID }),
      selectedTradeID: 0,
      setSelectedTradeID: (tradeID) => set({ selectedTradeID: tradeID }),
      resetUser: () => set({ UserID: 0, selectedStrategyID: 0, selectedTradeID: 0 }),
    }),
    {
      name: "UserStore",
    },
  ),
);

export default useUserStore;