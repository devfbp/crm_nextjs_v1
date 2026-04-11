CREATE VIEW `leads_view` AS
SELECT 
    l.`lead_id` as `lead_id`,
    l.`customer_name`,
    u.`name` AS `assigned_to`,
    ss.`sub_source_name`,
    CONCAT(l.`mobile_no`, '-', p.`project_name`) AS `contact_project`,
    ls.`lead_status_name` AS `status`,
    l.`lead_status_id` AS `status_id`,
    l.`created_at`,
    ls.`label_color` as `status_color`,
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
    u.`name` AS `user_name`,
    ls1.`lead_status_name` AS `from_status`,
    ls2.`lead_status_name` AS `to_status`,
    le.`created_at`,
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
    ON l.`rm_user_id` = u.`user_id`;


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
    ls.`label_color` as `status_color`,
    l.`schedule_date` as `schedule_date`,
    l.`flag` as `flag`
FROM `lead` AS l
JOIN `lead_status` ls ON l.`lead_status_id` = ls.`lead_status_id`
JOIN `project` p ON l.`project_id` = p.`project_id`
JOIN `user` u ON l.`rm_user_id` = u.`user_id`
JOIN `sub_source` ss ON l.`sub_source_id` = ss.`sub_source_id`;