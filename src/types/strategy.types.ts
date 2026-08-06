export interface StrategyPayload {
  userId: number;
  name: string;
  strategyType: string;
  instrumentType: string;
  description: string;
  timeFrame: string[];
  entryConditions: string[];
  indicatorsUsed: string[];
}

export interface GetStrategyByIdPayload {
  userId: number;
  strategyId: number;
}

export interface StrategyUpdatePayload {
  id: number;
  name: string;
  strategyType: string;
  instrumentType: string;
  description: string;
  timeFrame: string[];
  entryConditions: string[];
  indicatorsUsed: string[];
}