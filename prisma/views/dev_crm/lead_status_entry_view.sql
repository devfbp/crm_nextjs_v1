SELECT
  `le`.`lead_entry_id` AS `lead_entry_id`,
  `l`.`lead_id` AS `lead_id`,
  `u`.`name` AS `user_name`,
  `ls1`.`lead_status_name` AS `from_status`,
  `ls2`.`lead_status_name` AS `to_status`,
  `le`.`created_at` AS `created_at`,
  `le`.`remarks` AS `remarks`,
  date_format(`le`.`created_at`, '%d-%M-%Y %H:%i:%s') AS `display_created_at`
FROM
  (
    (
      (
        (
          `dev_crm`.`lead_status_entry` `le`
          JOIN `dev_crm`.`lead` `l` ON((`le`.`lead_id` = `l`.`lead_id`))
        )
        JOIN `dev_crm`.`lead_status` `ls1` ON((`le`.`from_status_id` = `ls1`.`lead_status_id`))
      )
      JOIN `dev_crm`.`lead_status` `ls2` ON((`le`.`to_status_id` = `ls2`.`lead_status_id`))
    )
    JOIN `dev_crm`.`user` `u` ON((`l`.`rm_user_id` = `u`.`user_id`))
  )