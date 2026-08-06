export interface saveRulePayload {
  userId: number;
  rule: string;
  ruleNumber: string;
  category: string;
  status: string;
}

export interface updateRulePayload {
  id: number;
  rule: string;
  ruleNumber: string;
  category: string;
  status: string;
}

export type RulePayload = saveRulePayload | updateRulePayload;