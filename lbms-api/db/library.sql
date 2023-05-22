-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2023 at 08:03 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `token`) VALUES
(1, 'admin', 'admin@gmail.com', '123', 'ZaX9ePmuumv79MybJzUxD85Y4nRBlV0mIdpdKIAJ');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `account` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `edition` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `account`, `name`, `author`, `edition`) VALUES
(15, 1000, 'Operating System', 'Khurana Ronit ', '2nd Edition'),
(16, 1001, 'Operating System', 'Khurana Ronit ', '2nd Edition'),
(17, 1002, 'Operating System', 'Khurana Ronit ', '2nd Edition'),
(18, 1003, 'Operating System', 'Khurana Ronit ', '1nd Edition'),
(19, 1004, 'Operating System', 'Khurana Ronit ', '1nd Edition'),
(20, 1005, 'Operating System', 'Khurana Ronit ', '1nd Edition'),
(21, 2000, 'Databse Management System ', 'Raghu  Ramakrishnan ', '2nd Edition'),
(22, 2002, 'Database Management System ', 'Raghu Ramakrishnan ', '6th Edition'),
(23, 2004, 'Introduction To Database Management System ', 'Satinder Bal Gupta , Aditya Mittal ', 'New  Edition'),
(24, 2006, 'Introduction To Database Management System ', 'Chopra Rajiv ', '5th Edition'),
(25, 2006, 'Introduction To Database Management System ', 'Chopra Rajiv ', '4th Edition'),
(26, 2008, 'Introduction To Database Management System ', 'Chopra Rajiv ', '3rd Edition'),
(27, 2010, 'Introduction To Database Management System ', 'Raghu Ramakrishanan ', '5th Edition'),
(28, 3000, 'Computer Organization And Architecture (COA)', 'V.carl Hamacher , Zvonko G', '1st Edition'),
(29, 3002, 'Computer Organization And Architecture (COA)', 'Casey Kochmer , Erica Frandsen ', '2nd Edition '),
(30, 3004, 'Computer Organization And Architecture (COA)', 'Casey Kochmer , Erica Frandsen ', '4th Edition '),
(31, 3006, 'Computer Organization And Architecture (COA)', 'Casey Kochmer , Erica Frandsen ', '5th Edition '),
(32, 3008, 'Computer Organization And Architecture (COA)', 'Casey Kochmer , Erica Frandsen ', '6th Edition '),
(33, 4000, 'Formal Language And Autometa Theory (FLAT)', 'C.K Nagpal ', '2nd Edition '),
(34, 4002, 'Formal Language And Autometa Theory (FLAT)', 'C.K Nagpal ', '2nd Edition '),
(35, 4004, 'Formal Language And Autometa Theory (FLAT)', 'Shyamalendu Kandar ', ' 4th Edition'),
(36, 4006, 'Formal Language And Autometa Theory (FLAT)', 'Shyamalendu Kandar ', ' 6th Edition'),
(37, 5000, 'Software Engineering', 'Rajib Mall', '6th Edition');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `book_account` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0,
  `return` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `book_account`, `user_id`, `timestamp`, `status`, `return`) VALUES
(63, 1000, 20, '2023-03-01 05:06:48', 1, NULL),
(64, 2000, 20, '2023-03-01 05:06:48', 3, NULL),
(65, 4000, 18, '2023-03-01 05:15:32', 3, NULL),
(66, 3002, 18, '2023-03-01 05:15:32', 1, NULL),
(67, 3002, 23, '2023-03-01 05:19:24', 3, NULL),
(68, 3004, 23, '2023-03-01 05:21:54', 1, NULL),
(69, 2008, 20, '2023-03-01 05:27:33', -1, NULL),
(70, 2002, 18, '2023-03-01 06:01:13', 2, NULL),
(71, 1004, 18, '2023-03-01 06:01:13', 2, NULL),
(72, 2002, 18, '2023-03-01 06:01:19', 2, NULL),
(73, 1004, 18, '2023-03-01 06:01:19', 3, NULL),
(74, 4002, 18, '2023-03-01 06:04:49', 1, NULL),
(75, 4004, 18, '2023-03-01 06:04:50', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `registration` bigint(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(200) NOT NULL,
  `approved` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `registration`, `password`, `token`, `approved`) VALUES
(18, 'Piyush Priyadarshi ', 'piyushjha.ktr@gmail.com', 20105129032, '12345', 'oAt8x2SH9XSTM41AenvOzpH54O7wMugigrGzzB89', 1),
(19, 'User', 'user@gmail.com', 11122343, '123', 'hsjCTWQtr5VgvmIY1UNo7wD8RYUEJVsGkevf479w', 1),
(20, 'SUDHEER PANDIT', 'sudheerkumar6207386393@gmail.com', 20105129037, '1234', 'I4OoSMSsytPmb9eBdH5HKJhpkXTOQmO64TU7AmSf', 1),
(21, 'ADITYA YADAV ', 'adityayadav@gmail.com', 20105129046, '1234', 'FokYAnByG9zBLhv5neCYtXooah1YshTrdLa8YFgO', 1),
(22, 'RAHUL KUMAR  ', 'rahulkumar@mail.com', 20105129056, '1234', 'fUNbAhWS39sw0tc0PlgIlMHsbuyFJ3tyJhSAEtNg', 1),
(23, 'SANJIV KUMAR ', 'sanjeevkumar@gmail.com', 20105129028, '1234', 'RidaT8GFMItg1LNW8rBP8tXDItCBqFU9S2RcxLwT', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
