SELECT
  `u`.`user_id` AS `user_id`,
  `u`.`name` AS `name`,
  `u`.`email` AS `email`,
  `u`.`phone_no` AS `phone_no`,
  `u`.`role_id` AS `role_id`,
  `r`.`role_name` AS `role_name`,
  `g`.`name` AS `general_manager_name`,
  `ru`.`name` AS `reporting_user_name`,
  `u`.`active` AS `active`,
  `u`.`flag` AS `flag`
FROM
  (
    (
      (
        `live_crm`.`user` `u`
        JOIN `live_crm`.`role` `r` ON((`u`.`role_id` = `r`.`role_id`))
      )
      JOIN `live_crm`.`user` `g` ON((`u`.`general_manager_id` = `g`.`user_id`))
    )
    JOIN `live_crm`.`user` `ru` ON((`u`.`reporting_to_id` = `ru`.`user_id`))
  )