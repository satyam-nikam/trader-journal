export interface StrategyPayload {
  name: string;
  strategyType: string;
  instrumentType: string;
  description: string;
  timeFrame: string[];
  entryConditions: string[];
  indicatorsUsed: string[];
}

export interface StrategyUpdatePayload extends StrategyPayload {
  id: number;
}