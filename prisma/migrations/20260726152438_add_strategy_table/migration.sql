-- CreateTable
CREATE TABLE `Strategy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `strategyType` VARCHAR(191) NOT NULL,
    `instrumentType` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `timeFrame` JSON NOT NULL,
    `entryConditions` JSON NOT NULL,
    `indicatorsUsed` JSON NOT NULL,

    UNIQUE INDEX `Strategy_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
