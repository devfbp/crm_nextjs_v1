CREATE VIEW `leads_view` AS
SELECT 
    l.`lead_id` as `lead_id`,
    l.`customer_name`,
    l.`rm_user_id`,
    u.`name` AS `assigned_to`,
    ss.`sub_source_name`,
    l.`mobile_no` as `mobile_no`,
    p.`project_name` as `project_name`,
    ls.`lead_status_name` AS `status`,
    l.`lead_status_id` AS `status_id`,
    l.`created_at`,
    l.`modified_at`,
    ls.`label_color` as `status_color`,
    l.`schedule_date` as `schedule_date`,
    l.`flag` as `flag`
FROM `lead` AS l
JOIN `lead_status` ls ON l.`lead_status_id` = ls.`lead_status_id`
JOIN `project` p ON l.`project_id` = p.`project_id`
JOIN `user` u ON l.`rm_user_id` = u.`user_id`
JOIN `sub_source` ss ON l.`sub_source_id` = ss.`sub_source_id`;



CREATE VIEW `lead_status_entry_view` AS
SELECT 
    le.`lead_entry_id` AS `lead_entry_id`,
    l.`lead_id` AS `lead_id`,   
    u2.`name` AS `from_user_name`, 
    u.`name` AS `user_name`,  
    le.`from_rm_user_id`,
    le.`rm_user_id`,
    ls1.`lead_status_id` AS `from_status_id`,
    ls1.`lead_status_name` AS `from_status`,
    ls1.`label_color` AS `from_status_color`,
    ls2.`lead_status_name` AS `to_status`,
    ls2.`lead_status_id` AS `to_status_id`,
    ls2.`label_color` AS `to_status_color`,
    u3.`name` AS `created_by_name`,
    le.`created_at` as `created_at`,
    le.`remarks`,
    DATE_FORMAT(le.`created_at`, '%d-%M-%Y %H:%i:%s') AS `display_created_at`
FROM `lead_status_entry` AS le
JOIN `lead` l 
    ON le.`lead_id` = l.`lead_id`
JOIN `lead_status` ls1 
    ON le.`from_status_id` = ls1.`lead_status_id`
JOIN `lead_status` ls2 
    ON le.`to_status_id` = ls2.`lead_status_id`
JOIN `user` u 
    ON le.`rm_user_id` = u.`user_id`
JOIN `user` u2 
    ON le.`from_rm_user_id` = u2.`user_id`
JOIN `user` u3
    ON le.`created_by` = u3.`user_id`;


################################# CLEANUP SCRIPT ############
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `lead_status_entry`;
DELETE FROM `lead`;
DELETE FROM `lead_file`;
DELETE FROM `project`;
DELETE FROM `sub_source`;
DELETE FROM `source`;
DELETE FROM `user_city`;
DELETE FROM `user_team`;
DELETE FROM `user_team_member`;
DELETE FROM `city`;
DELETE FROM `state`;

ALTER TABLE `lead_status_entry` AUTO_INCREMENT = 1;
ALTER TABLE `lead` AUTO_INCREMENT = 1;
ALTER TABLE `lead_file` AUTO_INCREMENT = 1;
ALTER TABLE `project` AUTO_INCREMENT = 1;
ALTER TABLE `sub_source` AUTO_INCREMENT = 1;
ALTER TABLE `source` AUTO_INCREMENT = 1;
ALTER TABLE `user_city` AUTO_INCREMENT = 1;
ALTER TABLE `user_team` AUTO_INCREMENT = 1;
ALTER TABLE `user_team_member` AUTO_INCREMENT = 1;
ALTER TABLE `city` AUTO_INCREMENT = 1;
ALTER TABLE `state` AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;
################################# END OF CLEANUP SCRIPT ############