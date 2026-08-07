-- AlterTable
ALTER TABLE `rules` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `strategy` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `trade` ADD COLUMN `userId` INTEGER NULL;
