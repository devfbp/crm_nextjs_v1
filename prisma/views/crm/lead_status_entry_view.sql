SELECT
  `e`.`lead_id` AS `lead_id`,
  `u`.`name` AS `user_name`,
  `s`.`lead_status_name` AS `from_status`,
  `s2`.`lead_status_name` AS `to_status`,
  date_format(`e`.`created_at`, '%d/%m/%Y %H:%i') AS `created_at`
FROM
  (
    (
      (
        `crm`.`lead_status_entry` `e`
        JOIN `crm`.`user` `u` ON((`e`.`created_by` = `u`.`user_id`))
      )
      JOIN `crm`.`lead_status` `s` ON((`s`.`lead_status_id` = `e`.`from_status_id`))
    )
    JOIN `crm`.`lead_status` `s2` ON((`s2`.`lead_status_id` = `e`.`to_status_id`))
  )