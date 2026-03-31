-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 01, 2026 at 12:41 AM
-- Server version: 8.0.45-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.23

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
(1, 'Bengaluru', 1, '2026-02-14 08:50:04', 0, NULL, 0, 0, 0),
(2, 'Chennai', 2, '2026-02-14 08:50:19', 0, '2026-02-18 15:23:26', 1, 0, 0);

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

--
-- Dumping data for table `lead`
--

INSERT INTO `lead` (`lead_id`, `customer_name`, `mobile_no`, `email_id`, `alternate_no`, `whatsapp_no`, `alternate_email`, `project_id`, `source_id`, `sub_source_id`, `rm_user_id`, `schedule_date`, `lead_status_id`, `lead_file_id`, `remarks`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Hiran', '9944893484', NULL, NULL, NULL, NULL, 5, 10, 10, 4, '2026-03-31', 2, 1, 'Test', '2026-03-31 15:01:00', 1, '2026-03-31 15:40:15', 1, 0, 0),
(20, 'Nithyanandham', '9944893484', 'nithy.snt@gmail.com', '9156639739', '9944893484', 'nithy.snt@gmail.com', 15, 11, 11, 1, NULL, 1, 14, 'Test Remarks 1', '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(21, 'Hiran', '1234567890', 'hiran@gmail.com', '1234567890', '1234567890', 'hiran@gmail.com', 16, 12, 12, 1, NULL, 1, 14, 'Test Remarks 2', '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(22, 'Vikesh', '1234567890', 'vikesh@gmail.com', '1234567890', '1234567890', 'vikesh@gmail.com', 17, 13, 13, 1, NULL, 1, 14, 'Test Remarks 3', '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(23, 'Nithyanandham', '9944893484', 'nithy.snt@gmail.com', '9156639739', '9944893484', 'nithy.snt@gmail.com', 18, 11, 11, 1, NULL, 1, 27, 'Test Remarks 1', '2026-03-31 18:24:15', 1, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `leads_view`
-- (See below for the actual view)
--
CREATE TABLE `leads_view` (
`lead_id` int
,`customer_name` varchar(200)
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

--
-- Dumping data for table `lead_file`
--

INSERT INTO `lead_file` (`lead_file_id`, `lead_file_name`, `file_path`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Manual', '/', NULL, NULL, NULL, NULL, 0, 0),
(2, '1774979444172_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774979444172_example-lead-format.xlsx', '2026-03-31 17:50:44', 1, NULL, NULL, 0, 0),
(3, '1774979666193_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774979666193_example-lead-format.xlsx', '2026-03-31 17:54:26', 1, NULL, NULL, 0, 0),
(4, '1774979753274_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774979753274_example-lead-format.xlsx', '2026-03-31 17:55:53', 1, NULL, NULL, 0, 0),
(5, '1774979918922_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774979918922_example-lead-format.xlsx', '2026-03-31 17:58:39', 1, NULL, NULL, 0, 0),
(6, '1774979982175_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774979982175_example-lead-format.xlsx', '2026-03-31 17:59:42', 1, NULL, NULL, 0, 0),
(7, '1774980060170_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980060170_example-lead-format.xlsx', '2026-03-31 18:01:00', 1, NULL, NULL, 0, 0),
(8, '1774980210278_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980210278_example-lead-format.xlsx', '2026-03-31 18:03:30', 1, NULL, NULL, 0, 0),
(9, '1774980247221_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980247221_example-lead-format.xlsx', '2026-03-31 18:04:07', 1, NULL, NULL, 0, 0),
(10, '1774980265119_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980265119_example-lead-format.xlsx', '2026-03-31 18:04:25', 1, NULL, NULL, 0, 0),
(11, '1774980317609_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980317609_example-lead-format.xlsx', '2026-03-31 18:05:18', 1, NULL, NULL, 0, 0),
(12, '1774980338178_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980338178_example-lead-format.xlsx', '2026-03-31 18:05:38', 1, NULL, NULL, 0, 0),
(13, '1774980415341_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980415341_example-lead-format.xlsx', '2026-03-31 18:06:55', 1, NULL, NULL, 0, 0),
(14, '1774980465786_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980465786_example-lead-format.xlsx', '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(15, '1774980496650_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980496650_example-lead-format.xlsx', '2026-03-31 18:08:17', 1, NULL, NULL, 0, 0),
(16, '1774980529196_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980529196_example-lead-format.xlsx', '2026-03-31 18:08:49', 1, NULL, NULL, 0, 0),
(17, '1774980600453_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980600453_example-lead-format.xlsx', '2026-03-31 18:10:00', 1, NULL, NULL, 0, 0),
(18, '1774980615788_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980615788_example-lead-format.xlsx', '2026-03-31 18:10:16', 1, NULL, NULL, 0, 0),
(19, '1774980628609_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980628609_example-lead-format.xlsx', '2026-03-31 18:10:29', 1, NULL, NULL, 0, 0),
(20, '1774980720974_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980720974_example-lead-format.xlsx', '2026-03-31 18:12:01', 1, NULL, NULL, 0, 0),
(21, '1774980740046_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980740046_example-lead-format.xlsx', '2026-03-31 18:12:20', 1, NULL, NULL, 0, 0),
(22, '1774980890038_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980890038_example-lead-format.xlsx', '2026-03-31 18:14:50', 1, NULL, NULL, 0, 0),
(23, '1774980988014_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774980988014_example-lead-format.xlsx', '2026-03-31 18:16:28', 1, NULL, NULL, 0, 0),
(24, '1774981058977_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774981058977_example-lead-format.xlsx', '2026-03-31 18:17:39', 1, NULL, NULL, 0, 0),
(25, '1774981369990_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774981369990_example-lead-format.xlsx', '2026-03-31 18:22:50', 1, NULL, NULL, 0, 0),
(26, '1774981420865_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774981420865_example-lead-format.xlsx', '2026-03-31 18:23:41', 1, NULL, NULL, 0, 0),
(27, '1774981454962_example-lead-format.xlsx', '/home/nithyanandam/office-ubuntu/crm_nextjs_v1/src/uploads/leads/1774981454962_example-lead-format.xlsx', '2026-03-31 18:24:15', 1, NULL, NULL, 0, 0);

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
(0, '-', 'success', '2026-03-31 20:34:03', 0, '2026-03-31 20:34:03', 0, 0, 0),
(1, 'New', 'new', '2026-02-18 15:03:29', 1, NULL, 0, 0, 0),
(2, 'In process', 'inprogress', '2026-02-18 15:23:39', 1, NULL, 0, 0, 0),
(3, 'Follow Up', 'followup', '2026-03-12 17:29:01', 1, NULL, 0, 0, 0),
(4, 'Site Visit Fixed', 'site-visit-fixed', '2026-03-12 17:29:11', 1, NULL, 0, 0, 0),
(5, 'Site Vistit Done', 'site-visit-done', '2026-03-12 17:29:19', 1, NULL, 0, 0, 0),
(6, 'Dead', 'dead', '2026-03-12 17:29:27', 1, NULL, 0, 0, 0),
(7, 'Closed', 'closed', '2026-03-12 17:29:35', 1, NULL, 0, 0, 0);

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

--
-- Dumping data for table `lead_status_entry`
--

INSERT INTO `lead_status_entry` (`lead_entry_id`, `lead_id`, `from_status_id`, `to_status_id`, `rm_user_id`, `remarks`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 1, 0, 1, 1, 'New Lead Created', '2026-03-31 15:01:00', 1, NULL, NULL, 0, 0),
(2, 1, 1, 2, 1, 'test', '2026-03-31 15:40:15', 1, NULL, NULL, 0, 0),
(3, 2, 0, 1, 0, NULL, '2026-03-31 17:54:26', 1, NULL, NULL, 0, 0),
(4, 3, 0, 1, 0, NULL, '2026-03-31 17:54:27', 1, NULL, NULL, 0, 0),
(5, 4, 0, 1, 0, NULL, '2026-03-31 17:54:27', 1, NULL, NULL, 0, 0),
(6, 5, 0, 1, 0, NULL, '2026-03-31 17:55:53', 1, NULL, NULL, 0, 0),
(7, 6, 0, 1, 0, NULL, '2026-03-31 17:55:53', 1, NULL, NULL, 0, 0),
(8, 7, 0, 1, 0, NULL, '2026-03-31 17:55:54', 1, NULL, NULL, 0, 0),
(9, 8, 0, 1, 0, NULL, '2026-03-31 17:58:39', 1, NULL, NULL, 0, 0),
(10, 9, 0, 1, 0, NULL, '2026-03-31 17:58:39', 1, NULL, NULL, 0, 0),
(11, 10, 0, 1, 0, NULL, '2026-03-31 17:58:39', 1, NULL, NULL, 0, 0),
(12, 11, 0, 1, 0, NULL, '2026-03-31 17:59:42', 1, NULL, NULL, 0, 0),
(13, 12, 0, 1, 0, NULL, '2026-03-31 17:59:42', 1, NULL, NULL, 0, 0),
(14, 13, 0, 1, 0, NULL, '2026-03-31 17:59:42', 1, NULL, NULL, 0, 0),
(15, 14, 0, 1, 0, NULL, '2026-03-31 18:01:00', 1, NULL, NULL, 0, 0),
(16, 15, 0, 1, 0, NULL, '2026-03-31 18:01:00', 1, NULL, NULL, 0, 0),
(17, 16, 0, 1, 0, NULL, '2026-03-31 18:01:01', 1, NULL, NULL, 0, 0),
(18, 17, 0, 1, 0, NULL, '2026-03-31 18:05:18', 1, NULL, NULL, 0, 0),
(19, 18, 0, 1, 0, NULL, '2026-03-31 18:05:18', 1, NULL, NULL, 0, 0),
(20, 19, 0, 1, 0, NULL, '2026-03-31 18:05:18', 1, NULL, NULL, 0, 0),
(21, 20, 0, 1, 0, NULL, '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(22, 21, 0, 1, 0, NULL, '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(23, 22, 0, 1, 0, NULL, '2026-03-31 18:07:46', 1, NULL, NULL, 0, 0),
(24, 23, 0, 1, 0, NULL, '2026-03-31 18:24:15', 1, NULL, NULL, 0, 0);

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

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `city_id`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Test', 2, '2026-02-18 15:05:31', 1, '2026-02-18 15:22:49', 1, 0, 0),
(3, 'Test e', 2, '2026-02-18 15:29:50', 1, NULL, 0, 0, 0),
(4, 'Testdfasd dsafds', 1, '2026-02-22 19:13:42', 1, NULL, 0, 0, 0),
(5, 'Assetz Canvas & Cove', 1, '2026-02-22 19:21:59', 1, NULL, 0, 0, 0),
(6, 'Ren & Rei', 1, '2026-02-22 19:23:20', 1, NULL, 0, 0, 0),
(7, 'Sharath', 1, '2026-02-22 19:29:22', 1, NULL, 0, 0, 0),
(8, 'Radha', 1, '2026-02-22 19:33:07', 1, NULL, 0, 0, 0),
(12, 'Test1', 2, '2026-02-18 15:05:31', 1, '2026-02-18 15:22:49', 1, 0, 0),
(13, 'Test 2', 2, '2026-02-18 15:29:50', 1, NULL, 0, 0, 0),
(14, 'Testd 3', 1, '2026-02-22 19:13:42', 1, NULL, 0, 0, 0),
(15, 'Test Project 1', 1, '2026-03-31 17:50:44', 1, NULL, 0, 0, 0),
(16, 'Test Project 2', 1, '2026-03-31 17:54:27', 1, NULL, 0, 0, 0),
(17, 'Test Project 3', 1, '2026-03-31 17:54:27', 1, NULL, 0, 0, 0),
(18, 'Project 1', 1, '2026-03-31 18:24:15', 1, NULL, 0, 0, 0);

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
(2, 'Admin', '{\"edit\": [\"7\", \"2\", \"12\", \"13\", \"14\", \"4\", \"9\", \"6\", \"10\", \"11\"], \"view\": [\"7\", \"2\", \"12\", \"13\", \"14\", \"4\", \"9\", \"6\", \"10\", \"11\"], \"create\": [\"7\", \"2\", \"12\", \"13\", \"14\", \"4\", \"9\", \"6\", \"10\", \"11\"], \"delete\": [\"7\", \"2\", \"12\", \"13\", \"14\", \"4\", \"9\", \"6\", \"10\", \"11\"], \"parent_menu\": [\"2\", \"7\", \"6\", \"5\"]}', '2026-02-14 08:39:16', NULL, '2026-02-17 10:47:53', 1, 0, 0),
(3, ' Vice President', NULL, '2026-02-14 08:39:40', NULL, NULL, NULL, 0, 0),
(4, ' Associate Vice President', NULL, '2026-02-14 08:40:09', NULL, NULL, NULL, 0, 0),
(5, ' Senior Sales Manager', NULL, '2026-02-14 08:40:53', NULL, NULL, NULL, 0, 0),
(6, ' Sales Manager', NULL, '2026-02-14 08:41:04', NULL, NULL, NULL, 0, 0),
(7, 'Senior Relationship Manager', NULL, '2026-02-14 08:41:33', NULL, NULL, NULL, 0, 0),
(8, 'Relationship Manager', NULL, '2026-02-14 08:41:47', NULL, NULL, NULL, 0, 0),
(9, 'Area Manager', NULL, '2026-02-14 08:42:49', NULL, NULL, NULL, 0, 0),
(10, 'Business Development Manager', NULL, '2026-02-14 08:43:14', NULL, NULL, NULL, 0, 0),
(11, 'City Head', NULL, '2026-02-14 08:43:52', NULL, NULL, NULL, 0, 0),
(12, 'Marketing', NULL, '2026-02-14 08:44:17', NULL, NULL, NULL, 0, 0),
(13, 'MIS Executive', NULL, '2026-02-14 08:44:50', NULL, NULL, NULL, 0, 0),
(14, 'Resales Head', NULL, '2026-02-14 08:45:28', NULL, NULL, NULL, 0, 0),
(1004, 'Test', '{\"edit\": [\"7\", \"2\", \"4\", \"10\", \"12\"], \"view\": [\"7\", \"2\", \"4\", \"6\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"create\": [\"4\", \"6\", \"10\", \"13\"], \"delete\": [\"4\", \"10\", \"11\", \"14\"], \"parent_menu\": [\"7\", \"4\", \"1\"]}', '2026-02-16 10:07:51', NULL, '2026-03-12 16:30:53', 1, 0, 0),
(1005, 'Tests', '{\"edit\": [\"9\"], \"view\": [\"2\", \"2\", \"6\", \"6\"], \"create\": [\"2\", \"2\", \"9\", \"8\"], \"delete\": [\"14\", \"9\"]}', '2026-02-16 12:15:56', NULL, '2026-02-16 12:24:34', NULL, 0, 1);

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

--
-- Dumping data for table `source`
--

INSERT INTO `source` (`source_id`, `source_name`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(9, 'Online Portal', '2026-02-22 19:54:57', 1, NULL, 0, 0, 0),
(10, 'Google PPC', '2026-02-22 19:54:58', 1, NULL, 0, 0, 0),
(11, 'Test Source 1', '2026-03-31 17:50:44', 1, NULL, 0, 0, 0),
(12, 'Test Source 2', '2026-03-31 17:54:27', 1, NULL, 0, 0, 0),
(13, 'Test Source 3', '2026-03-31 17:54:27', 1, NULL, 0, 0, 0);

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
(1, 'Karnataka', '2026-02-14 08:49:11', 0, NULL, 0, 0, 0),
(2, 'Tamil Nadu', '2026-02-14 08:49:31', 0, '2026-02-18 15:23:11', 1, 0, 0);

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

--
-- Dumping data for table `sub_source`
--

INSERT INTO `sub_source` (`sub_source_id`, `sub_source_name`, `source_id`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(9, '99 Acres', 9, '2026-02-22 19:54:57', 1, NULL, 0, 0, 0),
(10, 'A-Z', 10, '2026-02-22 19:54:58', 1, NULL, 0, 0, 0),
(11, 'Test Sub Source 1', 11, '2026-03-31 17:50:44', 1, NULL, 0, 0, 0),
(12, 'Test Sub Source 2', 12, '2026-03-31 17:54:27', 1, NULL, 0, 0, 0),
(13, 'Test Sub Source 3', 13, '2026-03-31 17:54:27', 1, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `role_id` int NOT NULL,
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

INSERT INTO `user` (`user_id`, `name`, `role_id`, `email`, `phone_no`, `general_manager_id`, `reporting_to_id`, `password`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'Nithyanandham Nagarajan', 1, 'nithy.snt@gmail.com', '9944893484', 0, 0, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-02-14 08:04:54', NULL, NULL, NULL, 0, 0),
(2, 'Sunisha', 2, 'crm@fullbasketproperty.com', '9740062744', 1, 1, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-02-15 08:42:45', NULL, '2026-02-16 08:11:41', NULL, 0, 0),
(3, 'test', 1004, 'test@gmail.com', '1212121212', 2, 1, '$2b$12$Ymre9vryJznwmTAlIPWDQ.Mn0eGdVoqIFR27KjTno.36ToRb3EKS6', '2026-02-16 17:08:35', NULL, '2026-03-29 15:06:37', NULL, 0, 0),
(4, 'Dedeeo', 3, 'dedeep@gmail.com', '9790513131', 2, 1, '$2b$12$NC4D0/pvEm9nYcoCozLL5uAJ2s.0WBMEXmwz8urb40/f08bpOdKA6', '2026-03-29 11:56:07', NULL, NULL, NULL, 0, 0),
(5, 'Hiran', 4, 'hiran@gmail.com', '1234567890', 4, 4, '$2b$12$nL11q49xJRqWtIgCP22U1utahPDD5e44wPeAuZ821gfSD7o1dGZF2', '2026-03-29 12:00:53', NULL, NULL, NULL, 0, 0);

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

--
-- Dumping data for table `user_team`
--

INSERT INTO `user_team` (`user_team_id`, `team_name`, `team_leader_id`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(3, 'Admin', 4, '2026-03-31 09:12:08', NULL, NULL, NULL, 0, 0),
(4, 'SALES TEAM', 3, '2026-03-15 15:05:01', NULL, '2026-03-15 15:08:29', NULL, 0, 1),
(5, 'Sales', 4, '2026-03-29 15:05:17', NULL, NULL, NULL, 0, 0);

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

--
-- Dumping data for table `user_team_member`
--

INSERT INTO `user_team_member` (`user_team_member_id`, `leader_id`, `user_team_id`, `member_id`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(3, 3, 4, 2, '2026-03-15 15:05:01', NULL, NULL, NULL, 0, 0),
(19, 4, 5, 5, '2026-03-29 15:05:17', NULL, NULL, NULL, 0, 0),
(20, 4, 5, 2, '2026-03-29 15:05:17', NULL, NULL, NULL, 0, 0),
(21, 4, 5, 3, '2026-03-29 15:05:17', NULL, NULL, NULL, 0, 0),
(26, 4, 3, 3, '2026-03-31 09:12:08', NULL, NULL, NULL, 0, 0),
(27, 4, 3, 2, '2026-03-31 09:12:08', NULL, NULL, NULL, 0, 0);

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

--
-- Dumping data for table `website_leads`
--

INSERT INTO `website_leads` (`website_lead_id`, `name`, `email`, `phone`, `form_type`, `message`, `link`, `ipaddress`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'test', 'test@gmail.com', '9944893484', 'Property_Enquiry', 'test', 'http://test.co', '192.168.1.1', '2026-03-15 17:21:51', 0, '2026-03-15 17:21:51', 0, 0, 0),
(2, 'test', 'test@gmail.com', '9944893484', 'Property_Enquiry', 'test', 'http://test.co', '192.168.1.1', '2026-03-15 17:53:45', 0, '2026-03-15 17:53:45', 0, 0, 0),
(3, 'test', 'test@gmail.com', '9944893484', 'Property_Enquiry', 'test', 'http://test.co', '192.168.1.1', '2026-03-15 17:53:47', 0, '2026-03-15 17:53:47', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure for view `leads_view`
--
DROP TABLE IF EXISTS `leads_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `leads_view`  AS SELECT `l`.`lead_id` AS `lead_id`, `l`.`customer_name` AS `customer_name`, `u`.`name` AS `assigned_to`, `ss`.`sub_source_name` AS `sub_source_name`, `l`.`mobile_no` AS `mobile_no`, `p`.`project_name` AS `project_name`, `ls`.`lead_status_name` AS `status`, `l`.`lead_status_id` AS `status_id`, `l`.`created_at` AS `created_at`, `ls`.`label_color` AS `status_color`, `l`.`flag` AS `flag` FROM ((((`lead` `l` join `lead_status` `ls` on((`l`.`lead_status_id` = `ls`.`lead_status_id`))) join `project` `p` on((`l`.`project_id` = `p`.`project_id`))) join `user` `u` on((`l`.`rm_user_id` = `u`.`user_id`))) join `sub_source` `ss` on((`l`.`sub_source_id` = `ss`.`sub_source_id`))) ;

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
  MODIFY `city_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lead`
--
ALTER TABLE `lead`
  MODIFY `lead_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `lead_file`
--
ALTER TABLE `lead_file`
  MODIFY `lead_file_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `lead_status`
--
ALTER TABLE `lead_status`
  MODIFY `lead_status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `lead_status_entry`
--
ALTER TABLE `lead_status_entry`
  MODIFY `lead_entry_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `project_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1006;

--
-- AUTO_INCREMENT for table `source`
--
ALTER TABLE `source`
  MODIFY `source_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sub_source`
--
ALTER TABLE `sub_source`
  MODIFY `sub_source_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_city`
--
ALTER TABLE `user_city`
  MODIFY `user_city_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_team`
--
ALTER TABLE `user_team`
  MODIFY `user_team_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_team_member`
--
ALTER TABLE `user_team_member`
  MODIFY `user_team_member_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `website_leads`
--
ALTER TABLE `website_leads`
  MODIFY `website_lead_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
