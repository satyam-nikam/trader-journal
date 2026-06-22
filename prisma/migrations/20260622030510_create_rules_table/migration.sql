/*
  Warnings:

  - You are about to drop the column `ruleNumberString` on the `rules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ruleNumber]` on the table `Rules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ruleNumber` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Rules_ruleNumberString_key` ON `rules`;

-- AlterTable
ALTER TABLE `rules` DROP COLUMN `ruleNumberString`,
    ADD COLUMN `ruleNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Rules_ruleNumber_key` ON `Rules`(`ruleNumber`);
