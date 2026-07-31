-- CreateTable
CREATE TABLE `Trade` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `entryDate` VARCHAR(191) NULL,
  `fromDate` VARCHAR(191) NULL,
  `toDate` VARCHAR(191) NULL,
  `tradeType` VARCHAR(191) NULL,
  `instrumentType` VARCHAR(191) NULL,
  `position` VARCHAR(191) NULL,
  `capitalUsed` DOUBLE NULL,
  `entryPrice` DOUBLE NULL,
  `exitPrice` DOUBLE NULL,
  `qty` INTEGER NULL,
  `riskReward` DOUBLE NULL,
  `totalPnl` DOUBLE NULL,
  `tradeStatus` VARCHAR(191) NULL,
  `result` VARCHAR(191) NULL,
  `strategy` VARCHAR(191) NULL,
  `rulesFollowed` JSON NULL,
  `notes` VARCHAR(191) NULL,
  `tradeImg` VARCHAR(191) NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Set starting auto-increment value
ALTER TABLE `Trade` AUTO_INCREMENT = 1000000;
