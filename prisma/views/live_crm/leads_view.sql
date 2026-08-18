SELECT
  `l`.`lead_id` AS `lead_id`,
  `l`.`customer_name` AS `customer_name`,
  `l`.`rm_user_id` AS `rm_user_id`,
  `u`.`name` AS `assigned_to`,
  `ss`.`sub_source_name` AS `sub_source_name`,
  `l`.`mobile_no` AS `mobile_no`,
  `p`.`project_id` AS `project_id`,
  `p`.`project_name` AS `project_name`,
  `ls`.`lead_status_name` AS `status`,
  `l`.`lead_status_id` AS `status_id`,
  `l`.`created_at` AS `created_at`,
  `l`.`modified_at` AS `modified_at`,
  `ls`.`label_color` AS `status_color`,
  `l`.`schedule_date` AS `schedule_date`,
  `l`.`flag` AS `flag`
FROM
  (
    (
      (
        (
          `live_crm`.`lead` `l`
          JOIN `live_crm`.`lead_status` `ls` ON((`l`.`lead_status_id` = `ls`.`lead_status_id`))
        )
        JOIN `live_crm`.`project` `p` ON((`l`.`project_id` = `p`.`project_id`))
      )
      JOIN `live_crm`.`user` `u` ON((`l`.`rm_user_id` = `u`.`user_id`))
    )
    JOIN `live_crm`.`sub_source` `ss` ON((`l`.`sub_source_id` = `ss`.`sub_source_id`))
  )