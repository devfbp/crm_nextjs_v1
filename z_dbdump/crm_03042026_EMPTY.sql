-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 04, 2026 at 09:14 AM
-- Server version: 8.0.45-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int NOT NULL,
  `city_name` varchar(200) NOT NULL,
  `state_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_name`, `state_id`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Bengaluru', 1, '2026-03-24 13:08:10', 2, NULL, 0, 0, 0),
(2, 'Hyderabad', 2, '2026-03-24 13:08:33', 2, NULL, 0, 0, 0),
(3, 'Chennai', 3, '2026-03-24 13:08:46', 2, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `lead_id` int NOT NULL,
  `customer_name` varchar(200) DEFAULT NULL,
  `mobile_no` varchar(200) DEFAULT NULL,
  `email_id` varchar(200) DEFAULT NULL,
  `alternate_no` varchar(200) DEFAULT NULL,
  `whatsapp_no` varchar(200) DEFAULT NULL,
  `alternate_email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `source_id` int NOT NULL DEFAULT '0',
  `sub_source_id` int NOT NULL DEFAULT '0',
  `rm_user_id` int NOT NULL,
  `schedule_date` date DEFAULT NULL,
  `lead_status_id` int NOT NULL,
  `lead_file_id` int DEFAULT '1',
  `remarks` text,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `leads_view`
-- (See below for the actual view)
--
CREATE TABLE `leads_view` (
`lead_id` int
,`customer_name` varchar(200)
,`rm_user_id` int
,`assigned_to` varchar(200)
,`sub_source_name` varchar(200)
,`mobile_no` varchar(200)
,`project_name` varchar(200)
,`status` varchar(200)
,`status_id` int
,`created_at` datetime
,`status_color` varchar(200)
,`flag` int
);

-- --------------------------------------------------------

--
-- Table structure for table `lead_file`
--

CREATE TABLE `lead_file` (
  `lead_file_id` int NOT NULL,
  `lead_file_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead_status`
--

CREATE TABLE `lead_status` (
  `lead_status_id` int NOT NULL,
  `lead_status_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `label_color` varchar(200) NOT NULL DEFAULT 'success',
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lead_status`
--

INSERT INTO `lead_status` (`lead_status_id`, `lead_status_name`, `label_color`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(0, '-', 'success', NULL, 0, NULL, 0, 0, 0),
(1, 'New', 'new', '2026-02-18 15:03:29', 1, NULL, 0, 0, 0),
(2, 'In process', 'inprogress', '2026-02-18 15:23:39', 1, NULL, 0, 0, 0),
(3, 'Follow Up', 'followup', '2026-03-12 17:29:01', 1, NULL, 0, 0, 0),
(4, 'Site Visit Fixed', 'site-visit-fixed', '2026-03-12 17:29:11', 1, NULL, 0, 0, 0),
(5, 'Site Vistit Done', 'site-visit-done', '2026-03-12 17:29:19', 1, NULL, 0, 0, 0),
(6, 'Dead', 'dead', '2026-03-12 17:29:27', 1, NULL, 0, 0, 0),
(7, 'Closed', 'closed', '2026-03-12 17:29:35', 1, NULL, 0, 0, 0),
(8, 'F2F Fixed', 'success', '2026-03-24 13:19:52', 2, '2026-03-24 13:20:18', 2, 0, 0),
(9, 'F2F Done', 'success', '2026-03-24 13:20:29', 2, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `lead_status_entry`
--

CREATE TABLE `lead_status_entry` (
  `lead_entry_id` int NOT NULL,
  `lead_id` int NOT NULL,
  `from_status_id` int NOT NULL,
  `to_status_id` int NOT NULL,
  `rm_user_id` int NOT NULL,
  `remarks` text,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `lead_status_entry_view`
-- (See below for the actual view)
--
CREATE TABLE `lead_status_entry_view` (
`lead_entry_id` int
,`lead_id` int
,`user_name` varchar(200)
,`from_status` varchar(200)
,`to_status` varchar(200)
,`created_at` datetime
,`remarks` text
,`display_created_at` varchar(86)
);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int NOT NULL,
  `menu_name` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL DEFAULT '#',
  `parent_menu_id` int NOT NULL DEFAULT '1',
  `menu_group_id` int NOT NULL,
  `icon` varchar(200) DEFAULT NULL,
  `full_width` int NOT NULL DEFAULT '0',
  `sort_no` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menu_id`, `menu_name`, `link`, `parent_menu_id`, `menu_group_id`, `icon`, `full_width`, `sort_no`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Root', '#', -1, 1, NULL, 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(2, 'Projects', '/project', 1, 7, 'fa-layer-group', 0, 2, NULL, NULL, NULL, NULL, 0, 0),
(4, 'Manage Users', '/user', 1, 4, 'fa-light fa-user-tie', 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(6, 'Role (Designation)', '/role', 1, 4, 'fa-light fa-user-cog', 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(7, 'Manage Leads', '/leads', 1, 7, 'fa-light fa-folder-open', 1, 1, NULL, NULL, NULL, NULL, 0, 0),
(9, 'Activity Report', '/activity-report', 1, 9, 'fa-layer-group', 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(10, 'State', '/state', 1, 1, 'fa-light fa-memo-pad', 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(11, 'City', '/city', 1, 1, 'fa-light fa-table', 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(12, 'Lead Status', '/lead-status', 1, 1, 'fa-light fa-folder-open', 0, 3, NULL, NULL, NULL, NULL, 0, 0),
(13, 'Source', '/source', 1, 1, 'fa-light fa-chart-simple', 0, 3, NULL, NULL, NULL, NULL, 0, 0),
(14, 'Sub Source', '/sub-soruce', 1, 1, 'fa-light fa-chart-simple', 0, 3, NULL, NULL, NULL, NULL, 0, 0),
(15, 'Manage Team', '/user-team', 1, 4, 'fa-light fa-users', 0, 0, NULL, NULL, NULL, NULL, 0, 0),
(16, 'Website Leads', '/website-lead', 1, 7, 'fa-light fa-folder-open', 1, 1, NULL, NULL, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `menu_group`
--

CREATE TABLE `menu_group` (
  `menu_group_id` int NOT NULL,
  `menu_group_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `link` varchar(200) DEFAULT NULL,
  `sort_no` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu_group`
--

INSERT INTO `menu_group` (`menu_group_id`, `menu_group_name`, `link`, `sort_no`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Master', NULL, 9, NULL, NULL, NULL, NULL, 0, 0),
(2, 'Dashboard', '/', 1, NULL, NULL, NULL, NULL, 0, 0),
(3, 'Projects', NULL, 2, NULL, NULL, NULL, NULL, 0, 1),
(4, 'Team', NULL, 6, NULL, NULL, NULL, NULL, 0, 0),
(5, 'Attendance', '/attendance', 5, NULL, NULL, NULL, NULL, 0, 1),
(6, 'Invoice', '/invoice', 4, NULL, NULL, NULL, NULL, 0, 1),
(7, 'Leads', NULL, 3, NULL, NULL, NULL, NULL, 0, 0),
(8, 'Global Config', '/global-config', 10, NULL, NULL, NULL, NULL, 0, 0),
(9, 'Reports', NULL, 7, NULL, NULL, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int NOT NULL,
  `project_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `role_name` varchar(200) NOT NULL,
  `access_menu` json DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `access_menu`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'SUPERADMIN', '{\"edit\": [\"2\", \"7\", \"2\", \"12\", \"13\", \"14\", \"6\", \"5\", \"4\", \"9\", \"6\", \"10\", \"11\", \"8\"], \"view\": [\"2\", \"7\", \"2\", \"12\", \"13\", \"14\", \"6\", \"5\", \"4\", \"9\", \"6\", \"10\", \"11\", \"8\"], \"create\": [\"2\", \"7\", \"2\", \"12\", \"13\", \"14\", \"6\", \"5\", \"4\", \"9\", \"6\", \"10\", \"11\", \"8\"], \"delete\": [\"2\", \"7\", \"2\", \"12\", \"13\", \"14\", \"6\", \"5\", \"4\", \"9\", \"6\", \"10\", \"11\", \"8\"]}', NULL, NULL, NULL, NULL, 1, 1),
(2, 'Admin', '{\"edit\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"view\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"create\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"delete\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"parent_menu\": [\"2\", \"7\", \"6\", \"5\", \"4\", \"9\", \"1\", \"8\"]}', '2026-03-23 06:13:15', 1, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `source`
--

CREATE TABLE `source` (
  `source_id` int NOT NULL,
  `source_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` int NOT NULL,
  `state_name` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`state_id`, `state_name`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Karnataka', '2026-03-24 13:06:35', 2, NULL, 0, 0, 0),
(2, 'Telangana', '2026-03-24 13:07:02', 2, NULL, 0, 0, 0),
(3, 'Tamil Nadu', '2026-03-24 13:07:23', 2, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sub_source`
--

CREATE TABLE `sub_source` (
  `sub_source_id` int NOT NULL,
  `sub_source_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `source_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `role_id` int NOT NULL,
  `active` int NOT NULL DEFAULT '0' COMMENT '0-active, 1-deactive',
  `email` varchar(200) NOT NULL,
  `phone_no` varchar(200) NOT NULL,
  `general_manager_id` int NOT NULL DEFAULT '0',
  `reporting_to_id` int NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `role_id`, `active`, `email`, `phone_no`, `general_manager_id`, `reporting_to_id`, `password`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Nithyanandham Nagarajan', 1, 0, 'nithy.snt@gmail.com', '9944893484', 0, 0, '$2b$12$tI7gK3S2r5WoMWKu.OOe8OXT1bxmHtRbXXy4SeRO1/Vs8jNcUtkZK', '2026-02-14 08:04:54', NULL, '2026-04-04 09:08:16', NULL, 0, 0),
(2, 'Sunisha', 2, 0, 'crm@fullbasketproperty.com', '9740062744', 4, 4, '$2b$12$mcdr62AgkSxIP9O4JNZmmuOBig5sVjBq/z7oaQwrCqbhiz/sN3c46', '2026-03-23 06:14:50', NULL, '2026-03-25 13:27:54', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_city`
--

CREATE TABLE `user_city` (
  `user_city_id` int NOT NULL,
  `user_id` int NOT NULL,
  `city_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int NOT NULL DEFAULT '0',
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int NOT NULL DEFAULT '0',
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_team`
--

CREATE TABLE `user_team` (
  `user_team_id` int NOT NULL,
  `team_name` varchar(200) NOT NULL,
  `team_leader_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_team_member`
--

CREATE TABLE `user_team_member` (
  `user_team_member_id` int NOT NULL,
  `leader_id` int NOT NULL,
  `user_team_id` int NOT NULL,
  `member_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `website_leads`
--

CREATE TABLE `website_leads` (
  `website_lead_id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `form_type` varchar(200) DEFAULT NULL,
  `message` text,
  `link` varchar(200) NOT NULL,
  `ipaddress` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `company_id` int NOT NULL DEFAULT '0',
  `flag` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure for view `leads_view`
--
DROP TABLE IF EXISTS `leads_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `leads_view`  AS SELECT `l`.`lead_id` AS `lead_id`, `l`.`customer_name` AS `customer_name`, `l`.`rm_user_id` AS `rm_user_id`, `u`.`name` AS `assigned_to`, `ss`.`sub_source_name` AS `sub_source_name`, `l`.`mobile_no` AS `mobile_no`, `p`.`project_name` AS `project_name`, `ls`.`lead_status_name` AS `status`, `l`.`lead_status_id` AS `status_id`, `l`.`created_at` AS `created_at`, `ls`.`label_color` AS `status_color`, `l`.`flag` AS `flag` FROM ((((`lead` `l` join `lead_status` `ls` on((`l`.`lead_status_id` = `ls`.`lead_status_id`))) join `project` `p` on((`l`.`project_id` = `p`.`project_id`))) join `user` `u` on((`l`.`rm_user_id` = `u`.`user_id`))) join `sub_source` `ss` on((`l`.`sub_source_id` = `ss`.`sub_source_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `lead_status_entry_view`
--
DROP TABLE IF EXISTS `lead_status_entry_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lead_status_entry_view`  AS SELECT `le`.`lead_entry_id` AS `lead_entry_id`, `l`.`lead_id` AS `lead_id`, `u`.`name` AS `user_name`, `ls1`.`lead_status_name` AS `from_status`, `ls2`.`lead_status_name` AS `to_status`, `le`.`created_at` AS `created_at`, `le`.`remarks` AS `remarks`, date_format(`le`.`created_at`,'%d-%M-%Y %H:%i:%s') AS `display_created_at` FROM ((((`lead_status_entry` `le` join `lead` `l` on((`le`.`lead_id` = `l`.`lead_id`))) join `lead_status` `ls1` on((`le`.`from_status_id` = `ls1`.`lead_status_id`))) join `lead_status` `ls2` on((`le`.`to_status_id` = `ls2`.`lead_status_id`))) join `user` `u` on((`l`.`rm_user_id` = `u`.`user_id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD UNIQUE KEY `city_name` (`city_name`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`lead_id`),
  ADD KEY `lead_status_id` (`lead_status_id`),
  ADD KEY `lead_file_id` (`lead_file_id`);

--
-- Indexes for table `lead_file`
--
ALTER TABLE `lead_file`
  ADD PRIMARY KEY (`lead_file_id`);

--
-- Indexes for table `lead_status`
--
ALTER TABLE `lead_status`
  ADD PRIMARY KEY (`lead_status_id`),
  ADD UNIQUE KEY `lead_status_name` (`lead_status_name`);

--
-- Indexes for table `lead_status_entry`
--
ALTER TABLE `lead_status_entry`
  ADD PRIMARY KEY (`lead_entry_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`),
  ADD KEY `menu_group_id` (`menu_group_id`);

--
-- Indexes for table `menu_group`
--
ALTER TABLE `menu_group`
  ADD PRIMARY KEY (`menu_group_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD UNIQUE KEY `project_name` (`project_name`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `source`
--
ALTER TABLE `source`
  ADD PRIMARY KEY (`source_id`),
  ADD UNIQUE KEY `source_name` (`source_name`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`),
  ADD UNIQUE KEY `state_name` (`state_name`);

--
-- Indexes for table `sub_source`
--
ALTER TABLE `sub_source`
  ADD PRIMARY KEY (`sub_source_id`),
  ADD UNIQUE KEY `sub_source_name` (`sub_source_name`),
  ADD KEY `source_id` (`source_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_no` (`phone_no`);

--
-- Indexes for table `user_city`
--
ALTER TABLE `user_city`
  ADD PRIMARY KEY (`user_city_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_team`
--
ALTER TABLE `user_team`
  ADD PRIMARY KEY (`user_team_id`);

--
-- Indexes for table `user_team_member`
--
ALTER TABLE `user_team_member`
  ADD PRIMARY KEY (`user_team_member_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `website_leads`
--
ALTER TABLE `website_leads`
  ADD PRIMARY KEY (`website_lead_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lead`
--
ALTER TABLE `lead`
  MODIFY `lead_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lead_file`
--
ALTER TABLE `lead_file`
  MODIFY `lead_file_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lead_status`
--
ALTER TABLE `lead_status`
  MODIFY `lead_status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lead_status_entry`
--
ALTER TABLE `lead_status_entry`
  MODIFY `lead_entry_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `menu_group`
--
ALTER TABLE `menu_group`
  MODIFY `menu_group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `source`
--
ALTER TABLE `source`
  MODIFY `source_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sub_source`
--
ALTER TABLE `sub_source`
  MODIFY `sub_source_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_city`
--
ALTER TABLE `user_city`
  MODIFY `user_city_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_team`
--
ALTER TABLE `user_team`
  MODIFY `user_team_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_team_member`
--
ALTER TABLE `user_team_member`
  MODIFY `user_team_member_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `website_leads`
--
ALTER TABLE `website_leads`
  MODIFY `website_lead_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `lead`
--
ALTER TABLE `lead`
  ADD CONSTRAINT `lead_ibfk_5` FOREIGN KEY (`lead_status_id`) REFERENCES `lead_status` (`lead_status_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `lead_ibfk_6` FOREIGN KEY (`lead_file_id`) REFERENCES `lead_file` (`lead_file_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_group_id` FOREIGN KEY (`menu_group_id`) REFERENCES `menu_group` (`menu_group_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `sub_source`
--
ALTER TABLE `sub_source`
  ADD CONSTRAINT `sub_source_ibfk_1` FOREIGN KEY (`source_id`) REFERENCES `source` (`source_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_city`
--
ALTER TABLE `user_city`
  ADD CONSTRAINT `user_city_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_city_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_team_member`
--
ALTER TABLE `user_team_member`
  ADD CONSTRAINT `user_team_member_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
