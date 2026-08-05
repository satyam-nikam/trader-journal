export interface TradePayload {
  entryDate: string;
  fromDate: string;
  toDate: string;
  tradeType: string;
  instrumentType: string;
  position: string;
  capitalUsed: number;
  entryPrice: number;
  exitPrice: number;
  qty: number;
  riskReward: number;
  totalPnl: number;
  tradeStatus: string;
  result: string;
  strategy: string;
  rulesFollowed: string[];
  notes: string;
  tradeImg: string ;
}

export interface TradeUpdatePayload extends TradePayload {
  id: number;
}