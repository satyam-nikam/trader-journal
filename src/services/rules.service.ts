import { prisma } from "@/lib/db";

export const getAllRules = async () => {

    const rulesCount = await prisma.rules.count();
    if (rulesCount === 0) {
    throw new Error(
      "No rules found"
    );
  }

  const rules = await prisma.rules.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    rules,
    count: rulesCount,
  };
};

export const saveRule = async (
  rule: string,
  ruleNumber: string
) => {
  const existingRule = await prisma.rules.findUnique({
    where: {
      ruleNumber,
    },
  });

  if (existingRule) {
    throw new Error("Rule already exists");
  }

  const newRule = await prisma.rules.create({
    data: {
      rule,
      ruleNumber,
    },
  });

  return newRule;
};

export const updateRule = async (
  id: number,
  rule: string,
  ruleNumber: string
) => {
  const existingRule = await prisma.rules.findUnique({
    where: {
      id,
    },
  });

  if (!existingRule) {
    throw new Error("Rule not found");
  }

  const existingRuleWithSameNumber = await prisma.rules.findUnique({
    where: {
      ruleNumber,
    },
  });

  if (existingRuleWithSameNumber && existingRuleWithSameNumber.id !== id) {
    throw new Error("Rule number already exists");
  }

  const updatedRule = await prisma.rules.update({
    where: {
      id,
    },
    data: {
      rule,
      ruleNumber,
    },
  });

  return updatedRule;
};

export const getRuleById = async (id: number) => {
  const rule = await prisma.rules.findUnique({
    where: {
      id,
    },
  });
  if (!rule) {
    throw new Error("Rule not found");
  }
  return rule;
};
