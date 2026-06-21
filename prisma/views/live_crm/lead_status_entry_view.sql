SELECT
  `le`.`lead_entry_id` AS `lead_entry_id`,
  `l`.`lead_id` AS `lead_id`,
  `u2`.`name` AS `from_user_name`,
  `u`.`name` AS `user_name`,
  `le`.`from_rm_user_id` AS `from_rm_user_id`,
  `le`.`rm_user_id` AS `rm_user_id`,
  `ls1`.`lead_status_id` AS `from_status_id`,
  `ls1`.`lead_status_name` AS `from_status`,
  `ls1`.`label_color` AS `from_status_color`,
  `ls2`.`lead_status_name` AS `to_status`,
  `ls2`.`lead_status_id` AS `to_status_id`,
  `ls2`.`label_color` AS `to_status_color`,
  `u3`.`name` AS `created_by_name`,
  `le`.`created_at` AS `created_at`,
  `le`.`remarks` AS `remarks`,
  date_format(`le`.`created_at`, '%d-%M-%Y %H:%i:%s') AS `display_created_at`
FROM
  (
    (
      (
        (
          (
            (
              `live_crm`.`lead_status_entry` `le`
              JOIN `live_crm`.`lead` `l` ON((`le`.`lead_id` = `l`.`lead_id`))
            )
            JOIN `live_crm`.`lead_status` `ls1` ON((`le`.`from_status_id` = `ls1`.`lead_status_id`))
          )
          JOIN `live_crm`.`lead_status` `ls2` ON((`le`.`to_status_id` = `ls2`.`lead_status_id`))
        )
        JOIN `live_crm`.`user` `u` ON((`le`.`rm_user_id` = `u`.`user_id`))
      )
      JOIN `live_crm`.`user` `u2` ON((`le`.`from_rm_user_id` = `u2`.`user_id`))
    )
    JOIN `live_crm`.`user` `u3` ON((`le`.`created_by` = `u3`.`user_id`))
  )