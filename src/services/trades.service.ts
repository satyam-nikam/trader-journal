import { prisma } from "@/lib/db";

export const saveTrade = async (
  entryDate: string,
  fromDate: string,
  toDate: string,
  tradeType: string,
  instrumentType: string,
  position: string,
  capitalUsed: number,
  entryPrice: number,
  exitPrice: number,
  qty: number,
  riskReward: number,
  totalPnl: number,
  tradeStatus: string,
  result: string,
  strategy: string,
  rulesFollowed: string[],
  notes: string,
  tradeImg: string,
  userId: number
) => {
  const newTrade = await prisma.trade.create({
    data: {
      entryDate,
      fromDate,
      toDate,
      tradeType,
      instrumentType,
      position,
      capitalUsed,
      entryPrice,
      exitPrice,
      qty,
      riskReward,
      totalPnl,
      tradeStatus,
      result,
      strategy,
      rulesFollowed,
      notes,
      tradeImg,
      userId,
    },
  });

  return newTrade;
};

export const updateTrade = async (
  id: number,
  entryDate: string,
  fromDate: string,
  toDate: string,
  tradeType: string,
  instrumentType: string,
  position: string,
  capitalUsed: number,
  entryPrice: number,
  exitPrice: number,
  qty: number,
  riskReward: number,
  totalPnl: number,
  tradeStatus: string,
  result: string,
  strategy: string,
  rulesFollowed: string[],
  notes: string,
  tradeImg: string,
  userId: number,
) => {
  const existingTrade = await prisma.trade.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingTrade) {
    throw new Error("Trade not found");
  }

  const updatedTrade = await prisma.trade.update({
    where: {
      id,
      userId,
    },
    data: {
      entryDate,
      fromDate,
      toDate,
      tradeType,
      instrumentType,
      position,
      capitalUsed,
      entryPrice,
      exitPrice,
      qty,
      riskReward,
      totalPnl,
      tradeStatus,
      result,
      strategy,
      rulesFollowed,
      notes,
      tradeImg,
    },
  });

  return updatedTrade;
};

export const deleteTrade = async (id: number, userId: number) => {
  const existingTrade = await prisma.trade.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!existingTrade) {
    throw new Error("Trade not found");
  }
  return await prisma.trade.delete({
    where: {
      id,
      userId,
    },
  });
}

export const getTradeById = async (id: number, userId: number) => {
  const trade = await prisma.trade.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!trade) {
    throw new Error("Trade not found");
  }
  return trade;
}

export const getAllTrades = async (userId: number) => {

  const tradesCount = await prisma.trade.count({
    where: {
      userId,
    },
  });

  const trades = await prisma.trade.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });
  return { count: tradesCount, trades };
}