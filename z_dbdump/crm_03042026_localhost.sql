-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 03, 2026 at 05:13 PM
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

--
-- Dumping data for table `lead`
--

INSERT INTO `lead` (`lead_id`, `customer_name`, `mobile_no`, `email_id`, `alternate_no`, `whatsapp_no`, `alternate_email`, `project_id`, `source_id`, `sub_source_id`, `rm_user_id`, `schedule_date`, `lead_status_id`, `lead_file_id`, `remarks`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(4, 'Nithyanandham N', '9944893484', 'nithy.snt@gmail.com', NULL, NULL, NULL, 3, 3, 6, 4, '2026-03-25', 2, 1, 'Test', '2026-03-25 08:24:24', 1, '2026-03-25 08:24:51', 1, 0, 0),
(5, 'Ayyarao', '9908466691', NULL, NULL, NULL, NULL, 1, 2, 3, 5, NULL, 1, 1, 'Team4 Nyla|Miyapur|Hyderabad', '2026-03-25 13:33:09', 2, NULL, NULL, 0, 0),
(6, 'Anilkumarreddy G', '8639024607', 'gudibandi213@gmail.com', NULL, NULL, NULL, 2, 2, 4, 5, NULL, 1, 1, 'Makuta Taranga', '2026-03-25 13:34:33', 2, NULL, NULL, 0, 0),
(7, 'DEE APTRANSCO Krishna Reddy K V', '9440817033', NULL, NULL, NULL, NULL, 1, 2, 4, 5, NULL, 1, 1, 'Team4 Nyla', '2026-03-25 13:35:28', 2, NULL, NULL, 0, 0),
(8, 'R R', '8125474264', NULL, NULL, NULL, NULL, 7, 2, 4, 5, NULL, 1, 1, 'Urbanrise On Cloud 33', '2026-03-25 13:36:26', 2, NULL, NULL, 0, 0),
(9, 'Manju', '9052025860', 'manjuunothda@gmail.com', NULL, NULL, NULL, 3, 2, 4, 6, '2026-03-25', 3, 1, 'Brigade Citrine', '2026-03-25 13:37:30', 2, '2026-03-27 09:46:57', 2, 0, 0),
(10, 'vinayak sharma', '9818447475', '29.vinayak@gmail.com', NULL, NULL, NULL, 3, 3, 6, 5, '2026-03-25', 2, 1, 'Siri Sirikanthi Magical Springs', '2026-03-25 13:38:41', 2, '2026-03-25 13:45:16', 5, 0, 0),
(11, 'Ayyarao', '9908466691', NULL, NULL, NULL, NULL, 1, 2, 3, 5, '2026-03-27', 1, 1, 'Team4 Nyla|Miyapur|Hyderabad', '2026-03-26 09:12:37', 2, '2026-03-27 09:42:10', 4, 0, 0),
(12, 'Varshith', '8074506498', 'varshith.vanga20@gmail.com', '', '8074506498', 'varshith.vanga20@gmail.com', 1, 2, 4, 2, NULL, 1, 2, 'Team4 Nyla', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(13, 'asif ali', '8919460209', NULL, '', '8919460209', NULL, 10, 2, 4, 2, NULL, 1, 2, 'The Trilight', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(14, 'Sanjeeva Reddy', '9701862599', 'sanjeevareddy.9701862599@abc.com', '', '9701862599', 'sanjeevareddy.9701862599@abc.com', 10, 2, 4, 2, NULL, 1, 2, 'The Trilight', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(15, 'Damodhar Rao', '7032463114', 'darishettidamodharrao@gmail.com', '', '7032463114', 'darishettidamodharrao@gmail.com', 8, 2, 4, 2, NULL, 1, 2, 'Rajapushpa Sierra', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(16, 'rani', '8897773624', 'b.j.rani1993@gmail.com', '', '8897773624', 'b.j.rani1993@gmail.com', 11, 2, 4, 2, NULL, 1, 2, 'Godrej Madison Avenue', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(17, 'prameela', '9618743810', 'pedellipedelli091@gmail.com', '', '9618743810', 'pedellipedelli091@gmail.com', 2, 2, 4, 2, NULL, 1, 2, 'Makuta Taranga', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(18, 'bhaskar', '9885355580', 'ynbhaskar@gmail.com', '', '9885355580', 'ynbhaskar@gmail.com', 12, 2, 4, 2, NULL, 1, 2, 'Urbanrise Sky Habitat', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(19, 'Mathari Navitha', '9490827815', NULL, '', '9490827815', NULL, 2, 2, 4, 2, NULL, 1, 2, 'Makuta Taranga', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(20, 'Chintha Saikrishnareddy', '9441628735', 'saikrishna2411@gmail.com', '', '9441628735', 'saikrishna2411@gmail.com', 13, 2, 4, 2, NULL, 1, 2, 'Candeur Twins', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(21, 'Chintha Saikrishnareddy', '9441628735', 'saikrishna2411@gmail.com', '', '9441628735', 'saikrishna2411@gmail.com', 14, 2, 4, 2, NULL, 1, 3, 'Candeur Twins', '2026-04-01 11:40:12', 2, NULL, NULL, 0, 0),
(22, 'Abhi Singh', '9873273244', 'nishuchandel4@gmail.com', '', '9873273244', 'nishuchandel4@gmail.com', 15, 2, 4, 2, NULL, 1, 4, 'Sumadhura Folium Phase II', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(23, 'Manoj Kumar', '9945735715', 'manojkumarpc6@gmail.com', '', '9945735715', 'manojkumarpc6@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(24, 'Paul', '9886915164', 'ppwhite0987@gmail.com', '', '9886915164', 'ppwhite0987@gmail.com', 16, 2, 4, 2, NULL, 1, 4, 'Adarsh Welkin Park Phase 2', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(25, 'Farooq', '9419040056', 'fa900926@gmail.com', '', '9419040056', 'fa900926@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(26, 'Harish', '7406155441', 'vharishrao007@gmail.com', '', '7406155441', 'vharishrao007@gmail.com', 18, 2, 4, 2, NULL, 1, 4, 'Sumadhura Epitome', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(27, 'Shylaja S', '8951630360', 'shylajahande@gmail.com', '', '8951630360', 'shylajahande@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(28, 'Karan Singh', '6284718785', 'ks4377461@gmail.com', '', '6284718785', 'ks4377461@gmail.com', 19, 2, 4, 2, NULL, 1, 4, 'Prestige Somerville', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(29, 'Sreenivas', '9995464970', 'sreenivas6@rediffmail.com', '', '9995464970', 'sreenivas6@rediffmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(30, 'Rahul Soni', '8824999313', 'sonirahul42854@gmail.com', '', '8824999313', 'sonirahul42854@gmail.com', 21, 2, 4, 2, NULL, 1, 4, 'CANVAS & COVE', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(31, 'Anjali Dokania', '7903141145', 'anjalidokania@gmail.com', '', '7903141145', 'anjalidokania@gmail.com', 22, 2, 4, 2, NULL, 1, 4, 'Embassy East Avenue', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(32, 'abhishek t', '8050588346', 'abhi.divradha@gmail.com', '', '8050588346', 'abhi.divradha@gmail.com', 23, 2, 4, 2, NULL, 1, 4, 'Brigade Lakecrest', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(33, 'Dr Balachandra S', '9902999565', 'Doctortoserve@gmail.com', '', '9902999565', 'Doctortoserve@gmail.com', 24, 2, 3, 2, NULL, 1, 4, 'Pride Euphora|KR Puram|Bangalore East', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(34, 'Pavan Jakkannavar', '8310419320', 'Pavansj95@gmail.com', '', '8310419320', 'Pavansj95@gmail.com', 25, 2, 3, 2, NULL, 1, 4, 'Sobha Brooklyn Towers|Hosur Road|Bangalore South', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(35, 'Saif', '8951729472', NULL, '', '8951729472', NULL, 26, 2, 3, 2, NULL, 1, 4, 'Goyal Orchid Platinum|Whitefield|Bangalore East', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(36, 'Col Umesh Nath Mehta', '9448356063', 'Umeshunm@mail.com', '', '9448356063', 'Umeshunm@mail.com', 3, 2, 3, 2, NULL, 1, 4, 'Brigade Citrine|Budigere Cross|Bangalore East', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(37, 'Neha Mahanty', '9771238169', 'mahantyneha27@gmail.com', '', '9771238169', 'mahantyneha27@gmail.com', 25, 2, 4, 2, NULL, 1, 4, 'Sobha Brooklyn Towers Townpark', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(38, 'Shashi', '9538745566', 'Shashik.0027@gmail.com', '', '9538745566', 'Shashik.0027@gmail.com', 27, 2, 3, 2, NULL, 1, 4, 'Sattva Songbird|Budigere Cross|Bangalore East', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(39, 'Sreelekha', '9449829598', 'Sreebhaskar8@gmail.com', '', '9449829598', 'Sreebhaskar8@gmail.com', 28, 2, 3, 2, NULL, 1, 4, 'Assetz Ren and Rei|Hosa Road|Bangalore South', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(40, 'DR GOKULDAS TRIVHUBANDAS JOSHI', '7980705211', 'Agmgncbvhghmvmnsmmmkmsmbbbmsnb@gmail.com', '', '7980705211', 'Agmgncbvhghmvmnsmmmkmsmbbbmsnb@gmail.com', 29, 2, 3, 2, NULL, 1, 4, 'Purva Silversky|Electronic City|Bangalore South', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(41, 'Kushal', '9449938598', 't.s.kushal9919@gmail.com', '', '9449938598', 't.s.kushal9919@gmail.com', 30, 2, 4, 2, NULL, 1, 4, 'BLOOM & DELL', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(42, 'amitha g', '8105907664', 'amitha.g1@gmail.com', '', '8105907664', 'amitha.g1@gmail.com', 31, 2, 4, 2, NULL, 1, 4, 'Assetz Soho And Sky', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(43, 'Ramesh', '9281452088', 'Rameshummed11@gmail.com', '', '9281452088', 'Rameshummed11@gmail.com', 23, 2, 4, 2, NULL, 1, 4, 'Brigade Lakecrest', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(44, 'N N MURTHY', '9742536537', 'nittur_murthy1@yahoo.com', '', '9742536537', 'nittur_murthy1@yahoo.com', 32, 2, 4, 2, NULL, 1, 4, 'The Midsummer Rain Phase 1', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(45, 'Kartikeswar Parida', '9789832303', 'kartik.prox@gmail.com', '', '9789832303', 'kartik.prox@gmail.com', 23, 2, 4, 2, NULL, 1, 4, 'Brigade Lakecrest', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(46, 'Sunil Valluri', '9952996068', NULL, '', '9952996068', NULL, 33, 2, 3, 2, NULL, 1, 4, 'Vaishnavi Life|Bettenahalli|Bangalore North', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(47, 'Vishwanath', '9886455044', 'Puni.sv@gmail.com', '', '9886455044', 'Puni.sv@gmail.com', 34, 2, 3, 2, NULL, 1, 4, 'Assetz Sora and Saki|Bagalur|Bangalore North', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(48, 'Manoj Singh', '8733839238', 'manojsingh49105@gmail.com', '', '8733839238', 'manojsingh49105@gmail.com', 23, 2, 4, 2, NULL, 1, 4, 'Brigade Lakecrest', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(49, 'Ananda Murthy', '6362128389', NULL, '', '6362128389', NULL, 35, 2, 4, 2, NULL, 1, 4, 'Sobha City Athena', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(50, 'vicky', '8098788586', 'greenmodularkitchen@gmail.com', '', '8098788586', 'greenmodularkitchen@gmail.com', 23, 2, 4, 2, NULL, 1, 4, 'Brigade Lakecrest', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(51, 'Sureshhhm1194', '8296664825', 'sureshhm1194@gmail.com', '', '8296664825', 'sureshhm1194@gmail.com', 27, 2, 4, 2, NULL, 1, 4, 'Sattva Songbird', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(52, 'Dhinesh', '8088236894', 'dhina.1432@gmail.com', '', '8088236894', 'dhina.1432@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(53, 'name', '7349082837', 'kavithanageneni123@gmail.com', '', '7349082837', 'kavithanageneni123@gmail.com', 36, 2, 4, 2, NULL, 1, 4, 'The Secret Lake', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(54, 'Ashok', '9742474041', 'ashwiniv915@gmail.com', '', '9742474041', 'ashwiniv915@gmail.com', 37, 2, 4, 2, NULL, 1, 4, 'TVS Emerald Auralis', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(55, 'Dhananjaya K H', '9945766596', NULL, '', '9945766596', NULL, 29, 2, 3, 2, NULL, 1, 4, 'Purva Silversky|Electronic City|Bangalore South', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(56, 'Arpit Anand', '7900523596', NULL, '', '7900523596', NULL, 38, 2, 3, 2, NULL, 1, 4, 'Arvind Greatlands|Devanahalli|Bangalore North', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(57, 'Sagar Arora', '8197671706', 'Arora.sagar007@gmail.com', '', '8197671706', 'Arora.sagar007@gmail.com', 39, 2, 3, 2, NULL, 1, 4, 'Bren Imperia|Sarjapur Road|Bangalore East', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(58, 'ttk', '8762187658', 'euroquake@ymail.com', '', '8762187658', 'euroquake@ymail.com', 16, 2, 11, 2, NULL, 1, 4, 'Adarsh Welkin Park Villas', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(59, 'Mikki Shrivastav', '9980675093', 'mikki.shrivastav@gmail.com', '', '9980675093', 'mikki.shrivastav@gmail.com', 35, 2, 4, 2, NULL, 1, 4, 'Sobha City Athena', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(60, 'anand', '9964238404', 'abhijithnpatil121@gmail.com', '', '9964238404', 'abhijithnpatil121@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(61, 'Mamta dhanotiya', '9981022154', 'ashishdhanotiya@gmail.com', '', '9981022154', 'ashishdhanotiya@gmail.com', 40, 2, 4, 2, NULL, 1, 4, 'Mizumi Reserve', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(62, 'Deepthi N', '9686127847', 'Deepthi9686@gmail.com', '', '9686127847', 'Deepthi9686@gmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(63, 'Pragyan', '9583826013', 'Pragyan9583@gmail.com', '', '9583826013', 'Pragyan9583@gmail.com', 41, 2, 4, 2, NULL, 1, 4, 'TREES & TANDEM', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(64, 'Mohan Mengre', '6300813076', 'mengremohan3@gmail.com', '', '6300813076', 'mengremohan3@gmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(65, 'Shilpa R', '9113686105', 'Shilpa9113@gmail.com', '', '9113686105', 'Shilpa9113@gmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(66, 'Mekala S', '9092793641', 'Meghlamani02@gmail.com', '', '9092793641', 'Meghlamani02@gmail.com', 42, 2, 3, 2, NULL, 1, 4, 'Mahindra Zen|Begur|Bangalore South', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(67, 'Sujith Antony', '8095222091', 'Mail2say@gmail.com', '', '8095222091', 'Mail2say@gmail.com', 17, 2, 3, 2, NULL, 1, 4, 'Godrej Woodscapes|Budigere Cross|Bangalore East', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(68, 'Ankush Rajpal', '7278784257', NULL, '', '7278784257', NULL, 20, 2, 3, 2, NULL, 1, 4, 'Assetz Melodies of Life Apartments|Sarjapur Road|Bangalore East', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(69, 'Surekha', '9845031842', 'Surekhark_123@yahoo.com', '', '9845031842', 'Surekhark_123@yahoo.com', 40, 2, 3, 2, NULL, 1, 4, 'Assetz Mizumi Reserve|HSR Layout|Bangalore South', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(70, 'Sudarshan', '7208652948', 'Sudharshan14@gmail.com', '', '7208652948', 'Sudharshan14@gmail.com', 15, 2, 3, 2, NULL, 1, 4, 'Folium By Sumadhura Phase 2|Whitefield|Bangalore East', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(71, 'Usha', '9663322766', 'Ushacnrb@yahoo.in', '', '9663322766', 'Ushacnrb@yahoo.in', 39, 2, 3, 2, NULL, 1, 4, 'Bren Imperia|Sarjapur Road|Bangalore East', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(72, 'Mubarak Mubarak', '7892997725', 'Mubarakmd1997md@gmail.com', '', '7892997725', 'Mubarakmd1997md@gmail.com', 43, 2, 3, 2, NULL, 1, 4, 'Sumadhura Capitol Residences|Whitefield|Bangalore East', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(73, 'ChennakesavaReddy KR', '8971258546', 'ckreddy14@gmail.com', '', '8971258546', 'ckreddy14@gmail.com', 36, 2, 11, 2, NULL, 1, 4, 'The Secret Lake', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(74, 'Rajesh', '9948798672', 'rajeshkonduru70@gmail.com', '', '9948798672', 'rajeshkonduru70@gmail.com', 27, 2, 4, 2, NULL, 1, 4, 'Sattva Songbird', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(75, 'Kalyanasundaram', '9884616100', 'vksundaram2001@gmail.com', '', '9884616100', 'vksundaram2001@gmail.com', 44, 2, 11, 2, NULL, 1, 4, 'Concorde Mayfair', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(76, 'Urban Lane Design Studio', '9606204360', 'urbanlanestudio.01@gmail.com', '', '9606204360', 'urbanlanestudio.01@gmail.com', 45, 2, 11, 2, NULL, 1, 4, 'Bhartiya Garden Estate', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(77, 'Bhavik Katriya', '9545334281', 'Bhavikkatriya@gmail.com', '', '9545334281', 'Bhavikkatriya@gmail.com', 40, 2, 4, 2, NULL, 1, 4, 'Mizumi Reserve', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(78, 'Naveen', '9995767948', 'nkbnaveenk@gmail.com', '', '9995767948', 'nkbnaveenk@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(79, 'Pradeep', '6361348404', 'pradeepkumarbh92@gmail.com', '', '6361348404', 'pradeepkumarbh92@gmail.com', 46, 2, 4, 2, NULL, 1, 4, 'Prestige Marigold Phase II', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(80, 'Suresh Babu', '7090737370', 'Sureshbabu@gmailcom', '', '7090737370', 'Sureshbabu@gmailcom', 29, 2, 4, 2, NULL, 1, 4, 'Purva Silversky', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(81, 'Syed', '9980102049', 'Syed9980@gmail.com', '', '9980102049', 'Syed9980@gmail.com', 29, 2, 4, 2, NULL, 1, 4, 'Purva Silversky', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(82, 'Niraj Jhunjhunwalla', '9731901452', 'Niraj9731@gmail.com', '', '9731901452', 'Niraj9731@gmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(83, 'Binth Rasik', '7299737756', 'Binth7299@gmail.com', '', '7299737756', 'Binth7299@gmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(84, 'Akshay Kumar V G', '9845349878', 'akshaylaw143@gmail.com', '', '9845349878', 'akshaylaw143@gmail.com', 37, 2, 4, 2, NULL, 1, 4, 'TVS Emerald Auralis', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(85, 'Shubham Singh', '8604743802', NULL, '', '8604743802', NULL, 15, 2, 3, 2, NULL, 1, 4, 'Folium By Sumadhura Phase 2|Whitefield|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(86, 'Priyanka Mishra', '8884611132', NULL, '', '8884611132', NULL, 40, 2, 3, 2, NULL, 1, 4, 'Assetz Mizumi Reserve|HSR Layout|Bangalore South', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(87, 'Prathyusha', '9986212833', 'Prathyusha.g12@gmail.com', '', '9986212833', 'Prathyusha.g12@gmail.com', 28, 2, 3, 2, NULL, 1, 4, 'Assetz Ren and Rei|Hosa Road|Bangalore South', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(88, 'Sandhya', '7069612641', 'Singhsandhyarocks@gmail.com', '', '7069612641', 'Singhsandhyarocks@gmail.com', 27, 2, 3, 2, NULL, 1, 4, 'Sattva Songbird|Budigere Cross|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(89, 'AV V', '8792630894', NULL, '', '8792630894', NULL, 38, 2, 3, 2, NULL, 1, 4, 'Arvind Greatlands|Devanahalli|Bangalore North', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(90, 'Jyove Makeup Artist', '8830700624', NULL, '', '8830700624', NULL, 39, 2, 3, 2, NULL, 1, 4, 'Bren Imperia|Sarjapur Road|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(91, 'Vijeth Biradar', '8310236984', 'Vijeth.vvb@gmail.com', '', '8310236984', 'Vijeth.vvb@gmail.com', 40, 2, 3, 2, NULL, 1, 4, 'Assetz Mizumi Reserve|HSR Layout|Bangalore South', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(92, 'Sreekar Vemula', '9380720632', 'Sreekarvemula@gmail.com', '', '9380720632', 'Sreekarvemula@gmail.com', 27, 2, 3, 2, NULL, 1, 4, 'Sattva Songbird|Budigere Cross|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(93, 'Pradeep Kumar', '9964465515', 'Pradeep.pk926@gmail.com', '', '9964465515', 'Pradeep.pk926@gmail.com', 38, 2, 3, 2, NULL, 1, 4, 'Arvind Greatlands|Devanahalli|Bangalore North', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(94, 'Aliya', '7353766569', NULL, '', '7353766569', NULL, 47, 2, 3, 2, NULL, 1, 4, 'Bhartiya Nikoo Homes 5|Chokkanahalli|Bangalore North', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(95, 'Kratant', '7746991373', NULL, '', '7746991373', NULL, 15, 2, 3, 2, NULL, 1, 4, 'Folium By Sumadhura Phase 2|Whitefield|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(96, 'Sunil', '9886866993', 'Suni.kv4u@gmail.com', '', '9886866993', 'Suni.kv4u@gmail.com', 48, 2, 3, 2, NULL, 1, 4, 'Brigade Eternia|Yelahanka|Bangalore North', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(97, 'Manjula', '7842760130', 'Manjula.sk44@gmail.com', '', '7842760130', 'Manjula.sk44@gmail.com', 45, 2, 3, 2, NULL, 1, 4, 'Bhartiya Garden Estate|Sadahalli|Bangalore North', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(98, 'Vijayendra', '9663387091', NULL, '', '9663387091', NULL, 28, 2, 3, 2, NULL, 1, 4, 'Assetz Ren and Rei|Hosa Road|Bangalore South', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(99, 'Chandra Raju', '9110892410', 'chandrakantha495@gmail.com', '', '9110892410', 'chandrakantha495@gmail.com', 30, 2, 4, 2, NULL, 1, 4, 'BLOOM & DELL', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(100, 'Abhinav Sharma', '9019403047', 'abhinav.bhanu@gmail.com', '', '9019403047', 'abhinav.bhanu@gmail.com', 31, 2, 4, 2, NULL, 1, 4, 'Assetz Soho And Sky', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(101, 'Harshita', '9008266554', 'deepslb.hb@gmail.com', '', '9008266554', 'deepslb.hb@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(102, 'Abdul Khader', '9886796196', 'abdulkhader1945@gmail.com', '', '9886796196', 'abdulkhader1945@gmail.com', 48, 2, 4, 2, NULL, 1, 4, 'Brigade Eternia', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(103, 'Fasi Mohamed', '9606155898', 'Fasi9606@gmail.com', '', '9606155898', 'Fasi9606@gmail.com', 38, 2, 4, 2, NULL, 1, 4, 'Arvind Greatlands', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(104, 'Nikhil Mondkar', '9972011163', 'nikhilbgm@gmail.com', '', '9972011163', 'nikhilbgm@gmail.com', 43, 2, 4, 2, NULL, 1, 4, 'Sumadhura Capitol Residences', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(105, 'Yarava Chandra Babu reddy', '9901003887', 'chandrababu233@gmail.com', '', '9901003887', 'chandrababu233@gmail.com', 31, 2, 4, 2, NULL, 1, 4, 'Assetz Soho And Sky', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(106, 'GURU PRASADA R', '9880369698', 'mrguru4447@gmail.com', '', '9880369698', 'mrguru4447@gmail.com', 20, 2, 4, 2, NULL, 1, 4, 'MELODIES OF LIFE', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(107, 'Malli Mallikarjuna', '9900702754', 'mallikarjuna2742@gmail.com', '', '9900702754', 'mallikarjuna2742@gmail.com', 49, 2, 4, 2, NULL, 1, 4, 'Prestige Camden Gardens', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(108, 'Babu', '9886366944', 'turaiyurbabu@yahoo.com', '', '9886366944', 'turaiyurbabu@yahoo.com', 46, 2, 4, 2, NULL, 1, 4, 'Prestige Marigold', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(109, 'Pranayini Patnaik', '7894731506', 'skm240167@gmail.com', '', '7894731506', 'skm240167@gmail.com', 50, 2, 4, 2, NULL, 1, 4, 'SNN Estates Felicity', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(110, 'Jenifer', '7411958995', 'ajenifer21@gmail.com', '', '7411958995', 'ajenifer21@gmail.com', 37, 2, 4, 2, NULL, 1, 4, 'TVS Emerald Auralis', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(111, 'Mozam Hussain', '9972334671', NULL, '', '9972334671', NULL, 51, 2, 4, 2, NULL, 1, 4, 'Bricks and Milestones The Earthscape Phase 1', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(112, 'Honnaraj Narasimha', '9986256826', 'honnaraju74@gmail.com', '', '9986256826', 'honnaraju74@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(113, 'Sushant', '9975056092', 'sushantrathod55@gmail.com', '', '9975056092', 'sushantrathod55@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(114, 'ANISH PARHI', '9958097981', 'Parhianish@gmail.com', '', '9958097981', 'Parhianish@gmail.com', 43, 2, 3, 2, NULL, 1, 4, 'Sumadhura Capitol Residences|Whitefield|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(115, 'NARAYANA HEGDE', '9880842500', 'NH130373@GMAIL.COM', '', '9880842500', 'NH130373@GMAIL.COM', 28, 2, 3, 2, NULL, 1, 4, 'Assetz Ren and Rei|Hosa Road|Bangalore South', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(116, 'Ankur', '9036861863', NULL, '', '9036861863', NULL, 52, 2, 3, 2, NULL, 1, 4, 'Ranka Ankura|Thanisandra|Bangalore North', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(117, 'Radhika', '9910591361', 'Radhika2195@gmail.com', '', '9910591361', 'Radhika2195@gmail.com', 53, 2, 3, 2, NULL, 1, 4, 'Sobha Neopolis|Panathur|Bangalore East', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(118, 'Ashish Bodra', '8600033082', 'Ashish.bodra@yahoo.com', '', '8600033082', 'Ashish.bodra@yahoo.com', 6, 2, 3, 2, NULL, 1, 4, 'Sobha Infinia|Agara Village|Bangalore South', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(119, 'SumithaRD', '9880935963', 'Sumitha_dk@yahoo.com', '', '9880935963', 'Sumitha_dk@yahoo.com', 40, 2, 4, 2, NULL, 1, 4, 'Mizumi Reserve', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(120, 'soujanya', '8977681888', 'sai.sagi9@gmail.com', '', '8977681888', 'sai.sagi9@gmail.com', 47, 2, 4, 2, NULL, 1, 4, 'Bhartiya Nikoo Homes VI Phase 2', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(121, 'Napa Karthikeya Prasad', '8099808890', 'napakarthikeyaprasad@gmail.com', '', '8099808890', 'napakarthikeyaprasad@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(122, 'Shruthi', '9591761966', 'shruthiravim@gmail.com', '', '9591761966', 'shruthiravim@gmail.com', 27, 2, 4, 2, NULL, 1, 4, 'Sattva Songbird', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(123, 'Sreenivas', '9886012170', 'sreepgrreddy@gmail.com', '', '9886012170', 'sreepgrreddy@gmail.com', 54, 2, 11, 2, NULL, 1, 4, 'Lodha Azur', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(124, 'Rahul Sagar', '9945504157', 'chetanchethu914@gmail.com', '', '9945504157', 'chetanchethu914@gmail.com', 29, 2, 11, 2, NULL, 1, 4, 'Purva Silversky', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(125, 'Sv S', '7676365991', 'venkatasrikanth084@gmail.com', '', '7676365991', 'venkatasrikanth084@gmail.com', 50, 2, 4, 2, NULL, 1, 4, 'SNN Estates Felicity', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(126, 'Ashish', '9901357999', 'ash.shetty2006@gmail.com', '', '9901357999', 'ash.shetty2006@gmail.com', 55, 2, 4, 2, NULL, 1, 4, 'Vajram Vivera', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(127, 'Sombir', '7676501351', 'sombirkd@gmail.com', '', '7676501351', 'sombirkd@gmail.com', 56, 2, 4, 2, NULL, 1, 4, 'Sobha Magnus', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(128, 'Krishnamurthy', '8861286723', 'krishnamurthy.8861286723@abc.com', '', '8861286723', 'krishnamurthy.8861286723@abc.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(129, 'Karan Kumar', '8618230753', NULL, '', '8618230753', NULL, 55, 2, 4, 2, NULL, 1, 4, 'Vajram Vivera', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(130, 'Sayd Esamil', '8971314955', 'saydesmaile@gmail.com', '', '8971314955', 'saydesmaile@gmail.com', 29, 2, 4, 2, NULL, 1, 4, 'Purva Silversky', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(131, 'fahmitha sherin', '8867635596', 'fahmithasherin954431@gmail.com', '', '8867635596', 'fahmithasherin954431@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(132, 'SUMITHA', '8547666820', 'ssumitha@gmail.com', '', '8547666820', 'ssumitha@gmail.com', 46, 2, 4, 2, NULL, 1, 4, 'Prestige Marigold', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(133, 'Lalitha', '9241113420', 'manojlkumar5230@gmail.com', '', '9241113420', 'manojlkumar5230@gmail.com', 55, 2, 4, 2, NULL, 1, 4, 'Vajram Vivera', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(134, 'R G', '9885767171', NULL, '', '9885767171', NULL, 27, 2, 3, 2, NULL, 1, 4, 'Sattva Songbird|Budigere Cross|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(135, 'Kal', '9880241910', 'Kalpana@ti.com', '', '9880241910', 'Kalpana@ti.com', 36, 2, 3, 2, NULL, 1, 4, 'The Secret Lake|Devanahalli|Bangalore North', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(136, 'Tarun', '9901504240', NULL, '', '9901504240', NULL, 40, 2, 3, 2, NULL, 1, 4, 'Assetz Mizumi Reserve|HSR Layout|Bangalore South', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(137, 'Usman ali', '9759026319', 'Subhanali070707@gmail.com', '', '9759026319', 'Subhanali070707@gmail.com', 27, 2, 3, 2, NULL, 1, 4, 'Sattva Songbird|Budigere Cross|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(138, 'Selva Kumar', '9952888863', 'Skunar_sp@live.com', '', '9952888863', 'Skunar_sp@live.com', 57, 2, 3, 2, NULL, 1, 4, 'Concorde Eleve|KR Puram|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(139, 'Kavitha', '8618818587', NULL, '', '8618818587', NULL, 33, 2, 3, 2, NULL, 1, 4, 'Vaishnavi Life|Bettenahalli|Bangalore North', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(140, 'RAMYA', '9945533377', NULL, '', '9945533377', NULL, 28, 2, 3, 2, NULL, 1, 4, 'Assetz Ren and Rei|Hosa Road|Bangalore South', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(141, 'jenniferdiana', '7019407292', 'jenniferdiana8885@gmail.com', '', '7019407292', 'jenniferdiana8885@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(142, 'Sakshi', '8789856848', 'sakshi02052000@gmail.com', '', '8789856848', 'sakshi02052000@gmail.com', 55, 2, 4, 2, NULL, 1, 4, 'Vajram Vivera', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(143, 'Kamaraju Khuntia', '9678887983', 'khuntiakamabaji@gmail.com', '', '9678887983', 'khuntiakamabaji@gmail.com', 47, 2, 4, 2, NULL, 1, 4, 'Bhartiya Nikoo Homes VI Phase 2', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(144, 'GAYATHRI S', '8892238950', 'Gayathrisrinivas2012@gmail.com', '', '8892238950', 'Gayathrisrinivas2012@gmail.com', 58, 2, 3, 2, NULL, 1, 4, 'Sarang by Sumadhura|Whitefield|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(145, 'Sagar', '9945304614', NULL, '', '9945304614', NULL, 17, 2, 3, 2, NULL, 1, 4, 'Godrej Woodscapes|Budigere Cross|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(146, 'Dhakshayani', '9148980347', 'dhaksh.staypolis@gmail.com', '', '9148980347', 'dhaksh.staypolis@gmail.com', 15, 2, 4, 2, NULL, 1, 4, 'Sumadhura Folium Phase II', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(147, 'Guru', '9916383430', 'guru.jippy@gmail.com', '', '9916383430', 'guru.jippy@gmail.com', 49, 2, 4, 2, NULL, 1, 4, 'Prestige Camden Gardens', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(148, 'Virmaram Virmaram', '9024847562', 'virmaram207@gmail.com', '', '9024847562', 'virmaram207@gmail.com', 29, 2, 4, 2, NULL, 1, 4, 'Purva Silversky', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(149, 'yadavshavnandan498', '6284380264', 'yadavshavnandan498@gmail.com', '', '6284380264', 'yadavshavnandan498@gmail.com', 59, 2, 4, 2, NULL, 1, 4, 'SLV Golden Towers', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(150, 'Jashrith', '7013895101', 'kiranbairu21@gmail.com', '', '7013895101', 'kiranbairu21@gmail.com', 60, 2, 4, 2, NULL, 1, 4, 'Bren Cosmo', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(151, 'Rishay RAJ', '9667816422', NULL, '', '9667816422', NULL, 29, 2, 3, 2, NULL, 1, 4, 'Purva Silversky|Electronic City|Bangalore South', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(152, 'Vaseem', '7975712406', NULL, '', '7975712406', NULL, 15, 2, 3, 2, NULL, 1, 4, 'Folium By Sumadhura Phase 2|Whitefield|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(153, 'Abdul Rahim Syed', '9611844899', 'Rahim3020@gmail.com', '', '9611844899', 'Rahim3020@gmail.com', 61, 2, 3, 2, NULL, 1, 4, 'Brigade Calista|Budigere Cross|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(154, 'Prasad Naidu Y', '9840464745', 'Prasad.info.etl@gmail.com', '', '9840464745', 'Prasad.info.etl@gmail.com', 58, 2, 3, 2, NULL, 1, 4, 'Sarang by Sumadhura|Whitefield|Bangalore East', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(155, 'Umme Kulsum', '8618405075', 'kumme303@gmail.com', '', '8618405075', 'kumme303@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(156, 'Reddy Lakshman', '8553153203', 'reddylakshman380@gmail.com', '', '8553153203', 'reddylakshman380@gmail.com', 47, 2, 4, 2, NULL, 1, 4, 'Bhartiya Nikoo Homes VI Phase 2', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(157, 'RAKESH THAKOR', '9638757966', NULL, '', '9638757966', NULL, 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(158, 'Shri Jith', '9449905502', 'sgcjith@gmail.com', '', '9449905502', 'sgcjith@gmail.com', 48, 2, 4, 2, NULL, 1, 4, 'Brigade Eternia', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(159, 'Rishi', '8088830423', '750bhardwaj@gmail.com', '', '8088830423', '750bhardwaj@gmail.com', 59, 2, 4, 2, NULL, 1, 4, 'SLV Golden Towers', '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(160, 'Yatish Pathak', '9099938119', 'yatishppathak@gmail.com', '', '9099938119', 'yatishppathak@gmail.com', 62, 2, 4, 2, NULL, 1, 4, 'SB Urban Park', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(161, 'Amrith', '9449854770', 'Amrith111@yahoo.com', '', '9449854770', 'Amrith111@yahoo.com', 36, 2, 3, 2, NULL, 1, 4, 'The Secret Lake|Devanahalli|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(162, 'Roopa', '9945785397', 'Roopa.jalakantan@gmail.com', '', '9945785397', 'Roopa.jalakantan@gmail.com', 56, 2, 3, 2, NULL, 1, 4, 'Sobha Magnus|Bannerghatta Road|Bangalore South', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(163, 'SAKSHI RAHEJA', '9999675005', NULL, '', '9999675005', NULL, 48, 2, 3, 2, NULL, 1, 4, 'Brigade Eternia|Yelahanka|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(164, 'Sathish', '9994385856', 'sathiappu1313@gmail.com', '', '9994385856', 'sathiappu1313@gmail.com', 37, 2, 4, 2, NULL, 1, 4, 'TVS Emerald Auralis', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(165, 'Praveen Kumar P', '9738732151', 'praveen.friends17@gmail.com', '', '9738732151', 'praveen.friends17@gmail.com', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(166, 'Deepa Ramesh', '9942533691', 'deepa56231@gmail.com', '', '9942533691', 'deepa56231@gmail.com', 59, 2, 4, 2, NULL, 1, 4, 'SLV Golden Towers', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(167, 'Bodala Mahesh', '8792160498', 'bodala.mahesh@gmail.com', '', '8792160498', 'bodala.mahesh@gmail.com', 27, 2, 4, 2, NULL, 1, 4, 'Sattva Songbird', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(168, 'shabeena', '8553327105', 'shiny.shabnum@gmail.c9m', '', '8553327105', 'shiny.shabnum@gmail.c9m', 3, 2, 4, 2, NULL, 1, 4, 'Brigade Citrine', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(169, 'Harshita', '8105261328', 'Harshitguptaupdate@gmail.com', '', '8105261328', 'Harshitguptaupdate@gmail.com', 42, 2, 3, 2, NULL, 1, 4, 'Mahindra Zen|Begur|Bangalore South', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(170, 'Sinchu Gowda', '9742944866', NULL, '', '9742944866', NULL, 58, 2, 3, 2, NULL, 1, 4, 'Sarang by Sumadhura|Whitefield|Bangalore East', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(171, 'Lokesh S', '9740483980', NULL, '', '9740483980', NULL, 63, 2, 3, 2, NULL, 1, 4, 'Lodha Haven|Hosa Road|Bangalore South', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(172, 'Supriya', '7760326103', NULL, '', '7760326103', NULL, 19, 2, 3, 2, NULL, 1, 4, 'Prestige Somerville|Whitefield|Bangalore East', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(173, 'Ashwini', '8971822191', 'Ashwini4291@gmail.com', '', '8971822191', 'Ashwini4291@gmail.com', 56, 2, 3, 6, '2026-04-10', 1, 4, 'Sobha Magnus|Bannerghatta Road|Bangalore South', '2026-04-03 05:02:46', 2, '2026-04-03 15:38:10', 2, 0, 0),
(174, 'abhishek', '9738280706', 'abhishekvijaykumar7@gmail.com', '', '9738280706', 'abhishekvijaykumar7@gmail.com', 18, 2, 4, 2, NULL, 1, 4, 'Sumadhura Epitome', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(175, 'muralidharanpradhan Pradhan', '7008427969', 'muralidharanpradhan@gmail.com', '', '7008427969', 'muralidharanpradhan@gmail.com', 43, 2, 4, 2, NULL, 1, 4, 'Sumadhura Capitol Residences', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(176, 'Leela Krishna', '8585010182', 'krrish.korada@gmail.com', '', '8585010182', 'krrish.korada@gmail.com', 30, 2, 4, 2, NULL, 1, 4, 'BLOOM & DELL', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(177, 'Basavaraj Chilajeri', '8867644751', NULL, '', '8867644751', NULL, 48, 2, 4, 2, NULL, 1, 4, 'Brigade Eternia', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(178, 'Chandan', '9886021924', 'viswanathchandan1924@gmail.com', '', '9886021924', 'viswanathchandan1924@gmail.com', 47, 2, 4, 2, NULL, 1, 4, 'Bhartiya Nikoo Homes VI Phase 2', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(179, 'Nanda', '8050665199', 'Nandagandham@yahoo.com', '', '8050665199', 'Nandagandham@yahoo.com', 44, 2, 3, 2, NULL, 1, 4, 'Concorde Mayfair|Yelahanka|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(180, 'Jagannati S.s', '8106239740', NULL, '', '8106239740', NULL, 24, 2, 4, 2, NULL, 1, 4, 'Pride Euphora', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(181, 'Raveesh', '8150840013', 'raveeshawasthi@gmail.com', '', '8150840013', 'raveeshawasthi@gmail.com', 53, 2, 4, 2, NULL, 1, 4, 'Sobha Neopolis', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(182, 'Sai Ravi', '7892785147', 'sairavi491@gmail.com', '', '7892785147', 'sairavi491@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(183, 'Maryjerjinal', '9901362956', 'maryjerjinal62@gmail.com', '', '9901362956', 'maryjerjinal62@gmail.com', 24, 2, 4, 2, NULL, 1, 4, 'Pride Euphora', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(184, 'Sudha Raj', '9884277050', 'teet2four@gmail.com', '', '9884277050', 'teet2four@gmail.com', 17, 2, 4, 2, NULL, 1, 4, 'Godrej Woodscapes', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(185, 'sama', '6366229789', 'sama@gmail.com', '', '6366229789', 'sama@gmail.com', 29, 2, 4, 2, NULL, 1, 4, 'Purva Silversky', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(186, 'Lakshmi TS', '8281668385', 'lakshmi.snehadas@gmail.com', '', '8281668385', 'lakshmi.snehadas@gmail.com', 16, 2, 4, 2, NULL, 1, 4, 'Adarsh Welkin Park Phase 2', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(187, 'Suva', '9035310825', 'siva205643@gmail.com', '', '9035310825', 'siva205643@gmail.com', 38, 2, 11, 2, NULL, 1, 4, 'Arvind Greatlands', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(188, 'Raveendra', '7845097397', 'ravi_indra86@yahoo.co.in', '', '7845097397', 'ravi_indra86@yahoo.co.in', 53, 2, 4, 2, NULL, 1, 4, 'Sobha Neopolis', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(189, 'nayana', '9353991358', 'nayanamc96@gmail.com', '', '9353991358', 'nayanamc96@gmail.com', 50, 2, 4, 2, NULL, 1, 4, 'SNN Estates Felicity', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(190, 'Gurusree Reality', '9663213346', 'naveen390@gmail.com', '', '9663213346', 'naveen390@gmail.com', 56, 2, 4, 2, NULL, 1, 4, 'Sobha Magnus', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(191, 'Nishank', '8142370066', 'nishankgupta.jiet@gmail.com', '', '8142370066', 'nishankgupta.jiet@gmail.com', 36, 2, 4, 2, NULL, 1, 4, 'The Secret Lake', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(192, 'Suresh Uppunda', '9916881070', NULL, '', '9916881070', NULL, 61, 2, 4, 2, NULL, 1, 4, 'Brigade Calista', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(193, 'Dr Nandinireddy', '9701656528', 'Nandinireddy.kanupuru@gmail.com', '', '9701656528', 'Nandinireddy.kanupuru@gmail.com', 43, 2, 3, 2, NULL, 1, 4, 'Sumadhura Capitol Residences|Whitefield|Bangalore East', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(194, 'Suma Naik', '7204212255', NULL, '', '7204212255', NULL, 37, 2, 3, 2, NULL, 1, 4, 'TVS Emerald Auralis|Yelahanka|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(195, 'Shagun', '8527531571', NULL, '', '8527531571', NULL, 45, 2, 3, 2, NULL, 1, 4, 'Bhartiya Garden Estate|Sadahalli|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(196, 'Anoop J S', '9787298664', 'Js.anoop1@gmail.com', '', '9787298664', 'Js.anoop1@gmail.com', 36, 2, 3, 2, NULL, 1, 4, 'The Secret Lake|Devanahalli|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(197, 'Vini', '8291464637', 'Vinny.goel09@gmail.com', '', '8291464637', 'Vinny.goel09@gmail.com', 18, 2, 3, 2, NULL, 1, 4, 'Sumadhura Epitome 1|Hebbal|Bangalore North', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(198, 'Joshma Joseph', '8600007705', 'Joshmajoseph2602@gmail.com', '', '8600007705', 'Joshmajoseph2602@gmail.com', 16, 2, 3, 2, NULL, 1, 4, 'Adarsh Welkin Park|Sarjapur Road|Bangalore East', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(199, 'Krishna', '9742023373', NULL, '', '9742023373', NULL, 42, 2, 3, 2, NULL, 1, 4, 'Mahindra Zen|Begur|Bangalore South', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(200, 'Puja', '9972450714', 'Puja2024@gmail.com', '', '9972450714', 'Puja2024@gmail.com', 53, 2, 3, 2, NULL, 1, 4, 'Sobha Neopolis|Panathur|Bangalore East', '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(201, 'Pooja Dp', '9513158729', 'Dpooja2201@gmail.com', '', '9513158729', 'Dpooja2201@gmail.com', 36, 2, 3, 6, '2026-04-10', 1, 4, 'The Secret Lake|Devanahalli|Bangalore North', '2026-04-03 05:02:47', 2, '2026-04-03 15:37:27', 2, 0, 0),
(202, 'Nithyanandham', '9944893484', 'nithy.snt@gmail.com', '9156639739', '9944893484', 'nithy.snt@gmail.com', 64, 7, 12, 2, NULL, 1, 5, 'Test Remarks 1', '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0),
(203, 'Hiran', '1234567890', 'hiran@gmail.com', '1234567890', '1234567890', 'hiran@gmail.com', 65, 8, 13, 2, NULL, 1, 5, 'Test Remarks 2', '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0),
(204, 'Vikesh', '1234567890', 'vikesh@gmail.com', '1234567890', '1234567890', 'vikesh@gmail.com', 66, 9, 14, 2, NULL, 1, 5, 'Test Remarks 3', '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `leads_view`
-- (See below for the actual view)
--
CREATE TABLE `leads_view` (
`assigned_to` varchar(200)
,`created_at` datetime
,`customer_name` varchar(200)
,`flag` int
,`lead_id` int
,`mobile_no` varchar(200)
,`project_name` varchar(200)
,`rm_user_id` int
,`status` varchar(200)
,`status_color` varchar(200)
,`status_id` int
,`sub_source_name` varchar(200)
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
(2, '1775043468079_example-lead-format.xlsx', '/home/dev/crm_nextjs_v1/src/uploads/leads/1775043468079_example-lead-format.xlsx', '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(3, '1775043612073_example-lead-format.xlsx', '/home/dev/crm_nextjs_v1/src/uploads/leads/1775043612073_example-lead-format.xlsx', '2026-04-01 11:40:12', 2, NULL, NULL, 0, 0),
(4, '1775192561718_example-lead-format.xlsx', '/home/dev/crm_nextjs_v1/src/uploads/leads/1775192561718_example-lead-format.xlsx', '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(5, '1775232484488_example-lead-format.xlsx', '/home/nithyanandham/projects/crm_nextjs_v1/src/uploads/leads/1775232484488_example-lead-format.xlsx', '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0),
(6, '1775232497216_example-lead-format.xlsx', '/home/nithyanandham/projects/crm_nextjs_v1/src/uploads/leads/1775232497216_example-lead-format.xlsx', '2026-04-03 16:08:17', 2, NULL, NULL, 0, 0),
(7, '1775232574754_example-lead-format.xlsx', '/home/nithyanandham/projects/crm_nextjs_v1/src/uploads/leads/1775232574754_example-lead-format.xlsx', '2026-04-03 16:09:35', 2, NULL, NULL, 0, 0),
(8, '1775232616877_example-lead-format.xlsx', '/home/nithyanandham/projects/crm_nextjs_v1/src/uploads/leads/1775232616877_example-lead-format.xlsx', '2026-04-03 16:10:17', 2, NULL, NULL, 0, 0),
(9, '1775232666027_example-lead-format.xlsx', '/home/nithyanandham/projects/crm_nextjs_v1/src/uploads/leads/1775232666027_example-lead-format.xlsx', '2026-04-03 16:11:06', 2, NULL, NULL, 0, 0);

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

--
-- Dumping data for table `lead_status_entry`
--

INSERT INTO `lead_status_entry` (`lead_entry_id`, `lead_id`, `from_status_id`, `to_status_id`, `rm_user_id`, `remarks`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 4, 0, 1, 1, 'New Lead Created', '2026-03-25 08:24:24', 1, NULL, NULL, 0, 0),
(2, 4, 1, 2, 1, 'In', '2026-03-25 08:24:51', 1, NULL, NULL, 0, 0),
(3, 5, 0, 1, 2, 'New Lead Created', '2026-03-25 13:33:09', 2, NULL, NULL, 0, 0),
(4, 6, 0, 1, 2, 'New Lead Created', '2026-03-25 13:34:33', 2, NULL, NULL, 0, 0),
(5, 7, 0, 1, 2, 'New Lead Created', '2026-03-25 13:35:28', 2, NULL, NULL, 0, 0),
(6, 8, 0, 1, 2, 'New Lead Created', '2026-03-25 13:36:26', 2, NULL, NULL, 0, 0),
(7, 9, 0, 1, 2, 'New Lead Created', '2026-03-25 13:37:30', 2, NULL, NULL, 0, 0),
(8, 10, 0, 1, 2, 'New Lead Created', '2026-03-25 13:38:41', 2, NULL, NULL, 0, 0),
(9, 10, 1, 2, 5, 'Ringing no response', '2026-03-25 13:45:16', 5, NULL, NULL, 0, 0),
(10, 9, 1, 3, 5, 'Looking for 3BHK', '2026-03-25 13:52:46', 5, NULL, NULL, 0, 0),
(11, 11, 0, 1, 2, 'New Lead Created', '2026-03-26 09:12:37', 2, NULL, NULL, 0, 0),
(12, 12, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(13, 13, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(14, 14, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(15, 15, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(16, 16, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(17, 17, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(18, 18, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(19, 19, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(20, 20, 0, 1, 0, NULL, '2026-04-01 11:37:48', 2, NULL, NULL, 0, 0),
(21, 21, 0, 1, 0, NULL, '2026-04-01 11:40:12', 2, NULL, NULL, 0, 0),
(22, 22, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(23, 23, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(24, 24, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(25, 25, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(26, 26, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(27, 27, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(28, 28, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(29, 29, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(30, 30, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(31, 31, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(32, 32, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(33, 33, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(34, 34, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(35, 35, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(36, 36, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(37, 37, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(38, 38, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(39, 39, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(40, 40, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(41, 41, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(42, 42, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(43, 43, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(44, 44, 0, 1, 0, NULL, '2026-04-03 05:02:42', 2, NULL, NULL, 0, 0),
(45, 45, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(46, 46, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(47, 47, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(48, 48, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(49, 49, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(50, 50, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(51, 51, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(52, 52, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(53, 53, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(54, 54, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(55, 55, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(56, 56, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(57, 57, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(58, 58, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(59, 59, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(60, 60, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(61, 61, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(62, 62, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(63, 63, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(64, 64, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(65, 65, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(66, 66, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(67, 67, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(68, 68, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(69, 69, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(70, 70, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(71, 71, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(72, 72, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(73, 73, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(74, 74, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(75, 75, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(76, 76, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(77, 77, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(78, 78, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(79, 79, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(80, 80, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(81, 81, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(82, 82, 0, 1, 0, NULL, '2026-04-03 05:02:43', 2, NULL, NULL, 0, 0),
(83, 83, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(84, 84, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(85, 85, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(86, 86, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(87, 87, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(88, 88, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(89, 89, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(90, 90, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(91, 91, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(92, 92, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(93, 93, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(94, 94, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(95, 95, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(96, 96, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(97, 97, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(98, 98, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(99, 99, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(100, 100, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(101, 101, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(102, 102, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(103, 103, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(104, 104, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(105, 105, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(106, 106, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(107, 107, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(108, 108, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(109, 109, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(110, 110, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(111, 111, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(112, 112, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(113, 113, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(114, 114, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(115, 115, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(116, 116, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(117, 117, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(118, 118, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(119, 119, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(120, 120, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(121, 121, 0, 1, 0, NULL, '2026-04-03 05:02:44', 2, NULL, NULL, 0, 0),
(122, 122, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(123, 123, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(124, 124, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(125, 125, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(126, 126, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(127, 127, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(128, 128, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(129, 129, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(130, 130, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(131, 131, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(132, 132, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(133, 133, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(134, 134, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(135, 135, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(136, 136, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(137, 137, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(138, 138, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(139, 139, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(140, 140, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(141, 141, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(142, 142, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(143, 143, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(144, 144, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(145, 145, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(146, 146, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(147, 147, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(148, 148, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(149, 149, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(150, 150, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(151, 151, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(152, 152, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(153, 153, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(154, 154, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(155, 155, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(156, 156, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(157, 157, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(158, 158, 0, 1, 0, NULL, '2026-04-03 05:02:45', 2, NULL, NULL, 0, 0),
(159, 159, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(160, 160, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(161, 161, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(162, 162, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(163, 163, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(164, 164, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(165, 165, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(166, 166, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(167, 167, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(168, 168, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(169, 169, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(170, 170, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(171, 171, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(172, 172, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(173, 173, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(174, 174, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(175, 175, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(176, 176, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(177, 177, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(178, 178, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(179, 179, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(180, 180, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(181, 181, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(182, 182, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(183, 183, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(184, 184, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(185, 185, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(186, 186, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(187, 187, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(188, 188, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(189, 189, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(190, 190, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(191, 191, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(192, 192, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(193, 193, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(194, 194, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(195, 195, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(196, 196, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(197, 197, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(198, 198, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(199, 199, 0, 1, 0, NULL, '2026-04-03 05:02:46', 2, NULL, NULL, 0, 0),
(200, 200, 0, 1, 0, NULL, '2026-04-03 05:02:47', 2, NULL, NULL, 0, 0),
(201, 201, 0, 1, 0, NULL, '2026-04-03 05:02:47', 2, NULL, NULL, 0, 0),
(202, 202, 0, 1, 0, NULL, '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0),
(203, 203, 0, 1, 0, NULL, '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0),
(204, 204, 0, 1, 0, NULL, '2026-04-03 16:08:05', 2, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lead_status_entry_view`
-- (See below for the actual view)
--
CREATE TABLE `lead_status_entry_view` (
`created_at` datetime
,`display_created_at` varchar(86)
,`from_status` varchar(200)
,`lead_entry_id` int
,`lead_id` int
,`remarks` text
,`to_status` varchar(200)
,`user_name` varchar(200)
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
(5, 'Attendance', '/attendance', 5, NULL, NULL, NULL, NULL, 0, 0),
(6, 'Invoice', '/invoice', 4, NULL, NULL, NULL, NULL, 0, 0),
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
(1, 'Team4 Nyla', 2, '2026-03-24 13:24:22', 2, NULL, 0, 0, 0),
(2, 'Makuta Taranga', 2, '2026-03-24 13:26:35', 2, NULL, 0, 0, 0),
(3, 'Brigade Citrine', 1, '2026-03-24 13:26:56', 2, NULL, 0, 0, 0),
(4, 'Mahindra NewHaven', 1, '2026-03-24 13:28:06', 2, NULL, 0, 0, 0),
(5, 'Godrej Parkshire', 1, '2026-03-24 13:28:16', 2, NULL, 0, 0, 0),
(6, 'SOBHA Infinia', 1, '2026-03-24 13:28:28', 2, NULL, 0, 0, 0),
(7, 'Urbanrise On Cloud 33', 2, '2026-03-24 13:28:44', 2, NULL, 0, 0, 0),
(8, 'Rajapushpa Sierra', 2, '2026-03-24 13:28:53', 2, NULL, 0, 0, 0),
(9, 'Ramky One Astra', 2, '2026-03-24 13:29:03', 2, NULL, 0, 0, 0),
(10, 'The Trilight', 1, '2026-04-01 11:37:48', 2, NULL, 0, 0, 0),
(11, 'Godrej Madison Avenue', 1, '2026-04-01 11:37:48', 2, NULL, 0, 0, 0),
(12, 'Urbanrise Sky Habitat', 1, '2026-04-01 11:37:48', 2, NULL, 0, 0, 0),
(13, 'Candeur Twins', 1, '2026-04-01 11:37:48', 2, '2026-04-01 11:39:12', 2, 0, 0),
(14, 'Candeur Twins ', 1, '2026-04-01 11:40:12', 2, NULL, 0, 0, 0),
(15, 'Sumadhura Folium', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(16, 'Adarsh Welkin Park', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(17, 'Godrej Woodscapes', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(18, 'Sumadhura Epitome', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(19, 'Prestige Somerville', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(20, 'Assetz Inspira Melodies of Life', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(21, 'Assetz Canvas & Cove', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(22, 'Embassy East Avenue', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(23, 'Brigade Lakecrest', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(24, 'Pride Euphora', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(25, 'SOBHA Brooklyn Towers', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(26, 'Goyal Orchid Platinum', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(27, 'Sattva Songbird', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(28, 'Assetz Ren & REI', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(29, 'Purva Silversky', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(30, 'Assetz Bloom & Dell', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(31, 'Assetz Soho & Sky', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(32, 'The Midsummer Rain', 1, '2026-04-03 05:02:42', 2, NULL, 0, 0, 0),
(33, 'Vaishnavi Life', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(34, 'Assetz Sora & Saki', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(35, 'SOBHA Athena', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(36, 'Assetz The Secret Lake', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(37, 'TVS Emerald Auralis', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(38, 'Arvind Greatlands', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(39, 'Bren Imperia', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(40, 'Assetz Mizumi Reserve', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(41, 'Assetz Trees & Tandem', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(42, 'Mahindra Zen', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(43, 'Sumadhura Capitol Residences', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(44, 'Concorde Mayfair', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(45, 'Bhartiya Garden Estate', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(46, 'Prestige Marigold', 1, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(47, 'Nikoo Homes 6', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(48, 'Brigade Eternia', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(49, 'Prestige Camden Gardens', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(50, 'SNN Felicity', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(51, 'The Earthscape', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(52, 'RANKA ANKURA', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(53, 'Sobha Neopolis', 1, '2026-04-03 05:02:44', 2, NULL, 0, 0, 0),
(54, 'Lodha Azur', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(55, 'Vajram VIVERA', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(56, 'SOBHA Magnus', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(57, 'Concorde Eleve', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(58, 'Sumadhura Sarang', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(59, 'SLV Golden Towers', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(60, 'Bren Cosmo', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(61, 'Brigade Calista', 1, '2026-04-03 05:02:45', 2, NULL, 0, 0, 0),
(62, 'SB Urban Park', 1, '2026-04-03 05:02:46', 2, NULL, 0, 0, 0),
(63, 'Lodha Haven', 1, '2026-04-03 05:02:46', 2, NULL, 0, 0, 0),
(64, 'Test Project 1', 1, '2026-04-03 16:08:05', 2, NULL, 0, 0, 0),
(65, 'Test Project 2', 1, '2026-04-03 16:08:05', 2, NULL, 0, 0, 0),
(66, 'Test Project 3', 1, '2026-04-03 16:08:05', 2, NULL, 0, 0, 0);

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
(2, 'Admin', '{\"edit\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"view\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"create\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"delete\": [\"7\", \"16\", \"2\", \"4\", \"6\", \"15\", \"9\", \"10\", \"11\", \"12\", \"13\", \"14\"], \"parent_menu\": [\"2\", \"7\", \"6\", \"5\", \"4\", \"9\", \"1\", \"8\"]}', '2026-03-23 06:13:15', 1, NULL, NULL, 0, 0),
(3, 'MIS Executive', '{\"edit\": [], \"view\": [\"7\"], \"create\": [], \"delete\": [], \"parent_menu\": [\"2\", \"7\"]}', '2026-03-23 17:13:37', 2, '2026-04-03 15:59:38', 2, 0, 0),
(4, 'Team Manager', '{\"edit\": [\"7\"], \"view\": [\"7\", \"15\", \"9\"], \"create\": [], \"delete\": [], \"parent_menu\": [\"2\", \"7\", \"4\", \"9\"]}', '2026-03-23 17:17:54', 2, '2026-03-25 13:32:21', 2, 0, 0);

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
(1, 'Google PPC', '2026-03-24 13:14:31', 0, NULL, 0, 0, 0),
(2, 'Online Portal', '2026-03-24 13:14:43', 0, NULL, 0, 0, 0),
(3, 'Social Media', '2026-03-24 13:14:57', 0, NULL, 0, 0, 0),
(4, 'Website', '2026-03-24 13:15:04', 0, NULL, 0, 0, 0),
(5, 'Sub Broker', '2026-03-24 13:15:31', 0, NULL, 0, 0, 0),
(6, 'Self Generated', '2026-03-24 13:15:41', 0, NULL, 0, 0, 0),
(7, 'Test Source 1', '2026-04-03 16:08:05', 2, NULL, 0, 0, 0),
(8, 'Test Source 2', '2026-04-03 16:08:05', 2, NULL, 0, 0, 0),
(9, 'Test Source 3', '2026-04-03 16:08:05', 2, NULL, 0, 0, 0);

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

--
-- Dumping data for table `sub_source`
--

INSERT INTO `sub_source` (`sub_source_id`, `sub_source_name`, `source_id`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES
(1, 'PPC - Pintu', 1, '2026-03-24 13:16:51', 2, NULL, 0, 0, 0),
(2, 'A-Z', 1, '2026-03-24 13:17:07', 2, NULL, 0, 0, 0),
(3, '99Acres', 2, '2026-03-24 13:17:21', 2, NULL, 0, 0, 0),
(4, 'Housing', 2, '2026-03-24 13:17:33', 2, NULL, 0, 0, 0),
(5, 'Commonfloor', 2, '2026-03-24 13:17:48', 2, NULL, 0, 0, 0),
(6, 'Facebook', 3, '2026-03-24 13:18:01', 2, NULL, 0, 0, 0),
(7, 'FBP Website', 4, '2026-03-24 13:18:13', 2, NULL, 0, 0, 0),
(8, 'FB1', 5, '2026-03-24 13:18:25', 2, NULL, 0, 0, 0),
(9, 'HC1', 5, '2026-03-24 13:18:35', 2, NULL, 0, 0, 0),
(10, 'Self Generated', 6, '2026-03-24 13:18:57', 2, NULL, 0, 0, 0),
(11, 'Common floor', 2, '2026-04-03 05:02:43', 2, NULL, 0, 0, 0),
(12, 'Test Sub Source 1', 7, '2026-04-03 16:08:05', 2, NULL, 0, 0, 0),
(13, 'Test Sub Source 2', 8, '2026-04-03 16:08:05', 2, NULL, 0, 0, 0),
(14, 'Test Sub Source 3', 9, '2026-04-03 16:08:05', 2, NULL, 0, 0, 0);

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
(1, 'Nithyanandham Nagarajan', 1, 0, 'nithy.snt@gmail.com', '9944893484', 0, 0, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-02-14 08:04:54', NULL, NULL, NULL, 0, 0),
(2, 'Sunisha', 2, 0, 'crm@fullbasketproperty.com', '9740062744', 4, 4, '$2b$12$mcdr62AgkSxIP9O4JNZmmuOBig5sVjBq/z7oaQwrCqbhiz/sN3c46', '2026-03-23 06:14:50', NULL, '2026-03-25 13:27:54', NULL, 0, 0),
(4, 'Sunisha G', 4, 0, 'Sunisha@fullbasketproperty.com', '6364908218', 2, 1, '$2b$12$C/pylz8LK3TD.3gsJh2ZPeq7G4qyhGLsJfw8gVS8AgcFZpsnMNFl.', '2026-03-23 17:23:28', NULL, '2026-03-23 17:27:19', NULL, 0, 0),
(5, 'B Girish', 4, 0, 'girish@fullbasketproperty.com', '9381986180', 4, 4, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-03-23 17:26:07', NULL, '2026-04-03 16:57:43', NULL, 0, 0),
(6, 'Ashwaq Ahmed', 3, 0, 'ashwaq@fullbasketproperty.com', '6366974276', 4, 4, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-03-24 13:26:09', NULL, '2026-03-27 09:48:30', NULL, 0, 0),
(7, 'Arbaz khan', 3, 1, 'arbazkhan@fullbasketproperty.com', '6364895021', 2, 4, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-04-03 04:49:29', NULL, '2026-04-03 16:50:53', NULL, 0, 0),
(8, 'Gunaseelan A S', 3, 0, 'gunaseelan@fullbasketproperty.com', '7204326728', 2, 4, '$2b$12$.0hfMRqqWuENkmumkPyDYevvpB9/LLYVJ2yUXWDkk4PBP3evznDoy', '2026-04-03 04:52:02', NULL, NULL, NULL, 0, 0);

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
(1, 'Sunisha Team', 2, '2026-04-03 15:42:25', NULL, NULL, NULL, 0, 0),
(2, 'Test', 5, '2026-04-03 16:55:56', NULL, NULL, NULL, 0, 0);

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
(1, 2, 1, 6, '2026-04-03 15:42:25', NULL, NULL, NULL, 0, 0),
(2, 5, 2, 8, '2026-04-03 16:55:56', NULL, NULL, NULL, 0, 0),
(3, 5, 2, 6, '2026-04-03 16:55:56', NULL, NULL, NULL, 0, 0);

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
  MODIFY `lead_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- AUTO_INCREMENT for table `lead_file`
--
ALTER TABLE `lead_file`
  MODIFY `lead_file_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lead_status`
--
ALTER TABLE `lead_status`
  MODIFY `lead_status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lead_status_entry`
--
ALTER TABLE `lead_status_entry`
  MODIFY `lead_entry_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

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
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `sub_source_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_city`
--
ALTER TABLE `user_city`
  MODIFY `user_city_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_team`
--
ALTER TABLE `user_team`
  MODIFY `user_team_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_team_member`
--
ALTER TABLE `user_team_member`
  MODIFY `user_team_member_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
