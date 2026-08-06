import { prisma } from "@/lib/db";

export const getAllStrategies = async (userId: number) => {
  const strategiesCount = await prisma.strategy.count({
    where: {
      userId,
    },
  });

  const strategies = await prisma.strategy.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      userId,
    },
  });

  return { count: strategiesCount, strategies };
};

export const saveStrategy = async (
    userId: number,
    name: string,
      strategyType: string,
      instrumentType: string,
      description: string,
      timeFrame: string[],
      entryConditions: string[],
      indicatorsUsed: string[],
) => {
    const existingStrategy = await prisma.strategy.findUnique({
        where: {
            name,
        },
    });

    if (existingStrategy) {
        throw new Error("Strategy already exists");
    }

    const newStrategy = await prisma.strategy.create({
        data: {
            userId,
            name,
            strategyType,
            instrumentType,
            description,
            timeFrame,
            entryConditions,
            indicatorsUsed,
        },
    });

    return newStrategy;
};

export const getStrategyById = async (id: number, userId: number) => {
    const strategy = await prisma.strategy.findUnique({
        where: {
            id,
            userId
        },
    });
    if (!strategy) {
        throw new Error("Strategy not found");
    }
    return strategy;
};

export const updateStrategy = async (
    id: number,
    name: string,
    strategyType: string,
    instrumentType: string,
    description: string,
    timeFrame: string[],
    entryConditions: string[],
    indicatorsUsed: string[],
) => {
    const existingStrategy = await prisma.strategy.findUnique({
        where: {
            id,
        },
    });

    if (!existingStrategy) {
        throw new Error("Strategy not found");
    }

    const updatedStrategy = await prisma.strategy.update({
        where: {
            id,
        },
        data: {
            name,
            strategyType,
            instrumentType,
            description,
            timeFrame,
            entryConditions,
            indicatorsUsed,
        },
    });

    return updatedStrategy;
};

export const deleteStrategy = async (id: number) => {
    const existingStrategy = await prisma.strategy.findUnique({
        where: {
            id,
        },
    });
    if (!existingStrategy) {
        throw new Error("Strategy not found");
    }
    return await prisma.strategy.delete({
        where: {
            id,
        },
    });
};