import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  UserID: number;
  setUserID: (UserID: number) => void;
  selectedStrategyID: number;
  setSelectedStrategyID: (strategyID: number) => void;
  selectedTradeID: number;
  setSelectedTradeID: (strategyID: number) => void;
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
    }),
    {
      name: "UserStore",
    },
  ),
);

export default useUserStore;