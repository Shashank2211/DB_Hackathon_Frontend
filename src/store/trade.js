import { create } from "zustand";

const useTradeStore = create((set) => ({
  trades: [],
  redFlags: [],
  orangeFlags: [],
  greenFlags: [],
  setTrades: (trades) => set({ trades }),
  setRedFlags: (trades) =>
    set((state) => {
      const redFlags = trades.filter((trade) => {
        const settlementDate = new Date(trade.settlementDate);
        const maturityDate = new Date(trade.security.maturityDate);
        const today = new Date();
        return today > settlementDate || settlementDate < maturityDate;
      });

      return {
        redFlags: [...redFlags],
      };
    }),
  setOrangeFlags: (trades) =>
    set((state) => {
      const orangeFlags = trades.filter((trade) => {
        const settlementDate = new Date(trade.settlementDate);
        const maturityDate = new Date(trade.security.maturityDate);
        const today = new Date();
        return today > maturityDate && today < settlementDate;
      });

      return {
        orangeFlags: [...orangeFlags],
      };
    }),
  setGreenFlags: (trades) =>
    set((state) => {
      const greenFlag = trades.filter((trade) => {
        const settlementDate = new Date(trade.settlementDate);
        const maturityDate = new Date(trade.security.maturityDate);
        const today = new Date();
        if (today < maturityDate && today < settlementDate) {
          return trade;
        }
      });

      return {
        greenFlags: [...greenFlag],
      };
    }),
}));

export default useTradeStore;
