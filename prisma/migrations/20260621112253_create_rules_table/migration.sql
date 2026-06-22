-- CreateTable
CREATE TABLE `Rules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ruleNumberString` VARCHAR(191) NOT NULL,
    `rule` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Rules_ruleNumberString_key`(`ruleNumberString`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
