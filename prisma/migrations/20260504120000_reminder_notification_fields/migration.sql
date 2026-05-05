-- AddColumn notification_count to lead_reminders
ALTER TABLE `lead_reminders` ADD COLUMN `notification_count` INT NOT NULL DEFAULT 0;

-- AddColumn last_notified_at to lead_reminders
ALTER TABLE `lead_reminders` ADD COLUMN `last_notified_at` DATETIME(0) NULL;

-- AddColumn is_acknowledged to lead_reminders
ALTER TABLE `lead_reminders` ADD COLUMN `is_acknowledged` TINYINT(1) NOT NULL DEFAULT 0;

-- Upsert SENT status into reminder_status
INSERT INTO `reminder_status` (`name`, `is_active`) VALUES ('SENT', 1)
ON DUPLICATE KEY UPDATE `is_active` = 1;

-- Upsert ACKNOWLEDGED status into reminder_status
INSERT INTO `reminder_status` (`name`, `is_active`) VALUES ('ACKNOWLEDGED', 1)
ON DUPLICATE KEY UPDATE `is_active` = 1;
