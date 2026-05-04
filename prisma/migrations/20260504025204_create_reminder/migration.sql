-- CreateTable
CREATE TABLE `reminder_status` (
    `reminder_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `reminder_status_name_key`(`name`),
    PRIMARY KEY (`reminder_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead_reminders` (
    `lead_reminder_id` INTEGER NOT NULL AUTO_INCREMENT,
    `leader_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `remind_at` DATETIME(0) NOT NULL,
    `frequency_value` INTEGER NOT NULL DEFAULT 5,
    `limit` INTEGER NOT NULL DEFAULT 2,
    `message` VARCHAR(200) NULL,

    PRIMARY KEY (`lead_reminder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reminder_logs` (
    `reminder_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lead_reminder_id` INTEGER NOT NULL,
    `reminder_status_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL,

    PRIMARY KEY (`reminder_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lead_reminders` ADD CONSTRAINT `lead_reminders_fk_1` FOREIGN KEY (`leader_id`) REFERENCES `lead`(`lead_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `lead_reminders` ADD CONSTRAINT `lead_reminders_fk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reminder_logs` ADD CONSTRAINT `remainder_logs_fk_1` FOREIGN KEY (`reminder_status_id`) REFERENCES `reminder_status`(`reminder_status_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reminder_logs` ADD CONSTRAINT `remainder_logs_fk_2` FOREIGN KEY (`lead_reminder_id`) REFERENCES `lead_reminders`(`lead_reminder_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
