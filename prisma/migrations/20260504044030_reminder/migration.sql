/*
  Warnings:

  - You are about to drop the column `leader_id` on the `lead_reminders` table. All the data in the column will be lost.
  - Added the required column `lead_id` to the `lead_reminders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lead_reminders` DROP FOREIGN KEY `lead_reminders_fk_1`;

-- DropIndex
DROP INDEX `lead_reminders_fk_1` ON `lead_reminders`;

-- AlterTable
ALTER TABLE `lead_reminders` DROP COLUMN `leader_id`,
    ADD COLUMN `lead_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `lead_reminders` ADD CONSTRAINT `lead_reminders_fk_1` FOREIGN KEY (`lead_id`) REFERENCES `lead`(`lead_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
