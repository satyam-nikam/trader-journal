/*
  Warnings:

  - Made the column `userId` on table `rules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `strategy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `trade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `rules` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `strategy` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trade` MODIFY `userId` INTEGER NOT NULL;
