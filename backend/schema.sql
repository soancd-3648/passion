
-- Drop tables if they exist
DROP TABLE IF EXISTS `projects`, `collections`, `news`, `videos`, `menu_items`, `about_info`, `contact_info`, `admins`;

-- Create tables
CREATE TABLE `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255),
  `img` VARCHAR(255),
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `collections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255),
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `date` DATE,
  `summary` TEXT,
  `img` VARCHAR(255)
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
  `img` VARCHAR(255)
);

CREATE TABLE `contact_info` (
  `id` INT PRIMARY KEY,
  `address` VARCHAR(255),
  `hotline` VARCHAR(255),
  `email` VARCHAR(255),
  `map_img` VARCHAR(255)
);

CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL
);

-- Insert sample data
INSERT INTO `projects` (`title`, `category`, `img`, `description`) VALUES
('Project 1', 'Category A', 'img/project1.jpg', 'Description for project 1'),
('Project 2', 'Category B', 'img/project2.jpg', 'Description for project 2');

INSERT INTO `collections` (`name`, `img`, `description`) VALUES
('Collection 1', 'img/collection1.jpg', 'Description for collection 1'),
('Collection 2', 'img/collection2.jpg', 'Description for collection 2');

INSERT INTO `news` (`title`, `date`, `summary`, `img`) VALUES
('News 1', '2024-01-01', 'Summary for news 1', 'img/news1.jpg'),
('News 2', '2024-01-02', 'Summary for news 2', 'img/news2.jpg');

INSERT INTO `videos` (`title`, `thumbnail`, `video_url`) VALUES
('Video 1', 'img/thumb1.jpg', 'https://www.youtube.com/watch?v=video1'),
('Video 2', 'img/thumb2.jpg', 'https://www.youtube.com/watch?v=video2');

INSERT INTO `menu_items` (`label`, `sub_label`, `path`, `sort_order`) VALUES
('Home', 'Main', '/', 1),
('Projects', 'Our Work', '/projects', 2),
('Collections', 'Our Products', '/collections', 3),
('Contact', 'Get in Touch', '/contact', 4);

INSERT INTO `about_info` (`id`, `title`, `description`, `img`) VALUES
(1, 'About Us', 'This is a description of our company.', 'img/about.jpg');

INSERT INTO `contact_info` (`id`, `address`, `hotline`, `email`, `map_img`) VALUES
(1, '123 Main St, Anytown, USA', '555-1234', 'contact@example.com', 'img/map.jpg');

INSERT INTO `admins` (`username`, `password`) VALUES ('admin', '$2b$10$TvDl.g4Phjxd75vKYuLFHeE3Yia0sOctwdkkbU33Zae5YCgAh5lsa');
