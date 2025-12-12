
-- Drop tables if they exist
DROP TABLE IF EXISTS `projects`, `collections`, `news`, `videos`, `menu_items`, `about_info`, `contact_info`, `admins`;

-- Create tables
CREATE TABLE `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255),
  `img` TEXT,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `collections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `img` TEXT,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `date` DATE,
  `summary` TEXT,
  `img` TEXT
);

CREATE TABLE `videos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `thumbnail` VARCHAR(255),
  `video_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `menu_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `label` VARCHAR(255) NOT NULL,
  `sub_label` VARCHAR(255),
  `path` VARCHAR(255),
  `sort_order` INT
);

CREATE TABLE `about_info` (
  `id` INT PRIMARY KEY,
  `title` VARCHAR(255),
  `description` TEXT,
  `img` TEXT
);

CREATE TABLE `contact_info` (
  `id` INT PRIMARY KEY,
  `address` VARCHAR(255),
  `hotline` VARCHAR(255),
  `email` VARCHAR(255),
  `map_img` TEXT
);

CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL
);

