/*
  Warnings:

  - Added the required column `category` to the `Rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rules` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
