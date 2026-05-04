-- CreateTable
CREATE TABLE `menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(200) NOT NULL,
    `link` VARCHAR(200) NOT NULL DEFAULT '#',
    `parent_menu_id` INTEGER NOT NULL DEFAULT 1,
    `menu_group_id` INTEGER NOT NULL,
    `icon` VARCHAR(200) NULL,
    `full_width` INTEGER NOT NULL DEFAULT 0,
    `sort_no` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    INDEX `menu_group_id`(`menu_group_id`),
    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_group` (
    `menu_group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_group_name` VARCHAR(200) NOT NULL,
    `link` VARCHAR(200) NULL,
    `sort_no` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`menu_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(200) NOT NULL,
    `access_menu` JSON NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `role_name`(`role_name`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `active` INTEGER NOT NULL DEFAULT 0,
    `email` VARCHAR(200) NOT NULL,
    `phone_no` VARCHAR(200) NOT NULL,
    `general_manager_id` INTEGER NOT NULL DEFAULT 0,
    `reporting_to_id` INTEGER NOT NULL DEFAULT 0,
    `password` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `phone_no`(`phone_no`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state` (
    `state_id` INTEGER NOT NULL AUTO_INCREMENT,
    `state_name` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `state_name`(`state_name`),
    PRIMARY KEY (`state_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `city_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(200) NOT NULL,
    `state_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `city_name`(`city_name`),
    INDEX `state_id`(`state_id`),
    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead_status` (
    `lead_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lead_status_name` VARCHAR(200) NULL,
    `label_color` VARCHAR(200) NOT NULL DEFAULT 'success',
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `lead_status_name`(`lead_status_name`),
    PRIMARY KEY (`lead_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead` (
    `lead_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(200) NULL,
    `mobile_no` VARCHAR(200) NULL,
    `email_id` VARCHAR(200) NULL,
    `alternate_no` VARCHAR(200) NULL,
    `whatsapp_no` VARCHAR(200) NULL,
    `alternate_email` VARCHAR(200) NULL,
    `project_id` INTEGER NULL,
    `source_id` INTEGER NOT NULL DEFAULT 0,
    `sub_source_id` INTEGER NOT NULL DEFAULT 0,
    `rm_user_id` INTEGER NOT NULL,
    `schedule_date` DATE NULL,
    `lead_file_id` INTEGER NULL DEFAULT 1,
    `lead_status_id` INTEGER NOT NULL,
    `remarks` TEXT NULL,
    `closed_date` DATETIME(0) NULL,
    `revenue` FLOAT NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`lead_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead_status_entry` (
    `lead_entry_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lead_id` INTEGER NOT NULL,
    `from_status_id` INTEGER NOT NULL,
    `to_status_id` INTEGER NOT NULL,
    `from_rm_user_id` INTEGER NOT NULL,
    `rm_user_id` INTEGER NOT NULL,
    `remarks` TEXT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`lead_entry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(200) NULL,
    `city_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `project_name`(`project_name`),
    INDEX `city_id`(`city_id`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `source` (
    `source_id` INTEGER NOT NULL AUTO_INCREMENT,
    `source_name` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `source_name`(`source_name`),
    PRIMARY KEY (`source_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_source` (
    `sub_source_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_source_name` VARCHAR(200) NULL,
    `source_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `sub_source_name`(`sub_source_name`),
    INDEX `source_id`(`source_id`),
    PRIMARY KEY (`sub_source_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_city` (
    `user_city_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NOT NULL DEFAULT 0,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    INDEX `city_id`(`city_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`user_city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead_file` (
    `lead_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lead_file_name` VARCHAR(200) NOT NULL,
    `file_path` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`lead_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_team` (
    `user_team_id` INTEGER NOT NULL AUTO_INCREMENT,
    `team_name` VARCHAR(200) NOT NULL,
    `team_leader_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_team_member` (
    `user_team_member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `leader_id` INTEGER NOT NULL,
    `user_team_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    INDEX `member_id`(`member_id`),
    PRIMARY KEY (`user_team_member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `website_leads` (
    `website_lead_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `email` VARCHAR(200) NULL,
    `phone` VARCHAR(200) NULL,
    `form_type` VARCHAR(200) NULL,
    `message` TEXT NULL,
    `link` VARCHAR(200) NOT NULL,
    `ipaddress` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL,
    `created_by` INTEGER NULL,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL,
    `company_id` INTEGER NOT NULL DEFAULT 0,
    `flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`website_lead_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_group_id` FOREIGN KEY (`menu_group_id`) REFERENCES `menu_group`(`menu_group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `city` ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state`(`state_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city`(`city_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sub_source` ADD CONSTRAINT `sub_source_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES `source`(`source_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_city` ADD CONSTRAINT `user_city_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city`(`city_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_city` ADD CONSTRAINT `user_city_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_team_member` ADD CONSTRAINT `user_team_member_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

