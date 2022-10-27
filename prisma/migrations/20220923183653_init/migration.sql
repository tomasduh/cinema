-- CreateTable
CREATE TABLE `actors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `profile_path` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `country_id` INTEGER NOT NULL,

    INDEX `country_id`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies_movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,

    INDEX `company_id`(`company_id`),
    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `actor_id` INTEGER NOT NULL,
    `department_id` INTEGER NULL,
    `actor_character` VARCHAR(50) NOT NULL,

    INDEX `actor_id`(`actor_id`),
    INDEX `department_id`(`department_id`),
    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `overview` VARCHAR(250) NULL,
    `poster_path` VARCHAR(100) NULL,
    `release_date` DATE NULL,
    `popularity` FLOAT NULL,
    `vote_average` FLOAT NULL,
    `vote_count` INTEGER NULL,
    `adult` BOOLEAN NULL,
    `language_id` INTEGER NULL,
    `runtime` INTEGER UNSIGNED NULL,
    `video_key` VARCHAR(50) NULL,

    INDEX `language_id`(`language_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `releases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `country_id` INTEGER NOT NULL,
    `certification_id` INTEGER NULL,
    `release_date` DATE NULL,

    INDEX `certification_id`(`certification_id`),
    INDEX `country_id`(`country_id`),
    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `transaction_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `movie_id`(`movie_id`),
    INDEX `transaction_id`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `create_date` DATETIME(0) NOT NULL,
    `expiration_date` DATETIME(0) NOT NULL,
    `status` BOOLEAN NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies_movies` ADD CONSTRAINT `companies_movies_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies_movies` ADD CONSTRAINT `companies_movies_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credits` ADD CONSTRAINT `credits_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credits` ADD CONSTRAINT `credits_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credits` ADD CONSTRAINT `credits_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies` ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies_categories` ADD CONSTRAINT `movies_categories_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movies_categories` ADD CONSTRAINT `movies_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `releases` ADD CONSTRAINT `releases_ibfk_3` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
