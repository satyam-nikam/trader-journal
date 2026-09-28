import { prisma } from "@/lib/db";


export const getDashboardDataByTrades = async (userId: number, tradeCount: number) => {
    
    const trades = await prisma.trade.findMany({
        orderBy: {
            id: "asc",
        },
        where: {
            userId,
        },
        take: tradeCount,
    });

    const profitableTrades = trades.filter((trade: any) => trade.result === "win");
    const lossTrades = trades.filter((trade: any) => trade.result === "loss");
    const capitalUsed = trades.reduce((acc: number, trade: any) => acc + trade.capitalUsed, 0);
    const totalPnl = trades.reduce((acc: number, trade: any) => acc + trade.totalPnl, 0);
    const bestTrade = trades.reduce((best: any, trade: any) => {
        if (!best || trade.totalPnl > best.totalPnl) {
            return trade;
        }
        return best;
    }, null);

    const worstTrade = trades.reduce((worst: any, trade: any) => {
        if (!worst || trade.totalPnl < worst.totalPnl) {
            return trade;
        }
        return worst;
    }, null);

    return {
        totalTrades: trades.length,
        profitableTrades: profitableTrades.length,
        lossTrades: lossTrades.length,
        capitalUsed,
        totalPnl,
        bestTrade,
        worstTrade,
    };
}

export const getDashboardDataByDateRange = async (userId: number, startDate: string, endDate: string) => {
    const trades = await prisma.trade.findMany({
        orderBy: {
            id: "asc",
        },
        where: {
            userId,
            entryDate: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    const profitableTrades = trades.filter((trade: any) => trade.result === "profit");
    const lossTrades = trades.filter((trade: any) => trade.result === "loss");
    const capitalUsed = trades.reduce((acc: number, trade: any) => acc + trade.capitalUsed, 0);
    const totalPnl = trades.reduce((acc: number, trade: any) => acc + trade.totalPnl, 0);
    const bestTrade = trades.reduce((best: any, trade: any) => {
        if (!best || trade.totalPnl > best.totalPnl) {
            return trade;
        }
        return best;
    }, null);

    const worstTrade = trades.reduce((worst: any, trade: any) => {
        if (!worst || trade.totalPnl < worst.totalPnl) {
            return trade;
        }
        return worst;
    }, null);

    return {
        totalTrades: trades.length,
        profitableTrades: profitableTrades.length,
        lossTrades: lossTrades.length,
        capitalUsed,
        totalPnl,
        bestTrade,
        worstTrade,
    };
}