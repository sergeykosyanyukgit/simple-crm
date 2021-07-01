CREATE DATABASE IF NOT EXISTS simplecrm;
USE `simplecrm`;
CREATE TABLE IF NOT EXISTS `ViewDashboard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `profileimage` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `elementcolorlight` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `elementcolordark` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `elementcolorshadow` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `buttoncolor` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `buttoncolorshadow` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `selected` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'false',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
INSERT INTO
  `ViewDashboard` ( `id`, `name`, `profileimage`, `elementcolorlight`, `elementcolordark`, `elementcolorshadow`, `buttoncolor`, `buttoncolorshadow`, `selected`, `createdAt`, `updatedAt`
  )
VALUES
  ( 1, 'yellow', 'yellow.jpg', '#CCCA1F', '#99A027', '204, 224, 21', '#BBD121', '243, 246, 0', 'true', '2020-01-23 07:11:49', '2020-06-16 05:56:27'
  );/*
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surname` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `middlename` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `profileimage` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `verify` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isTeacher` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TelegramId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE = InnoDB AUTO_INCREMENT = 65 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

INSERT INTO
  `User`
  (
    `id`, `surname`, `name`, `middlename`, `email`, `phone`, `profileimage`, `verify`, `password`, `isAdmin`, `isTeacher`, `createdAt`, `updatedAt`, `TelegramId`
  )
VALUES
  (
    1, 'Пользователь', 'Пользователь', 'Пользователь', 'user@gmail.com', '8(111)111-11-11', '', NULL,
    '$2a$15$CXV5cimWNZafiuvsjTzT.eOc157ObrWY.ZPyRP3wq29uIEKUoU2Du', 0, 0, '2020-01-23 06:10:01', '2020-03-12 06:02:12', NULL
  );
  
INSERT INTO
  `User`
  (
    `id`, `surname`, `name`, `middlename`, `email`, `phone`, `profileimage`, `verify`, `password`, `isAdmin`, `isTeacher`, `createdAt`, `updatedAt`, `TelegramId`
  )
VALUES
  (
    2, 'Преподаватель', 'Преподаватель', 'Преподаватель', 'teacher@gmail.com', '8(111)111-11-12', '', NULL,
    '$2a$15$CXV5cimWNZafiuvsjTzT.eOc157ObrWY.ZPyRP3wq29uIEKUoU2Du', 0, 1, '2020-01-23 06:10:01', '2020-03-12 06:02:12', NULL
  );
  
INSERT INTO
  `User`
  (
    `id`, `surname`, `name`, `middlename`, `email`, `phone`, `profileimage`, `verify`, `password`, `isAdmin`, `isTeacher`, `createdAt`, `updatedAt`, `TelegramId`
  )
VALUES
  (
    3, 'Администратор', 'Администратор', 'Администратор', 'admin@gmail.com', '8(111)111-11-13', '', NULL,
    '$2a$15$CXV5cimWNZafiuvsjTzT.eOc157ObrWY.ZPyRP3wq29uIEKUoU2Du', 1, 0, '2020-01-23 06:10:01', '2020-03-12 06:02:12', NULL
  );*/