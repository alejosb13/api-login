-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla login_node.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_node.migrations: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
REPLACE INTO `migrations` (`id`, `timestamp`, `name`) VALUES
	(12, 1633561894835, 'role1633561894835'),
	(16, 1633561903980, 'user1633561903980'),
	(18, 1633561939504, 'rolesUsers1633561939504');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Volcando estructura para tabla login_node.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(15) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_node.roles: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
REPLACE INTO `roles` (`id`, `display_name`, `createAt`, `updateAt`, `role`) VALUES
	(1, 'Administrator', '2021-10-11 13:20:42', '2021-10-11 13:20:42', ''),
	(2, 'User', '2021-10-11 13:23:36', '2021-10-11 13:23:37', ''),
	(6, 'test', '2021-10-11 13:46:27', '2021-10-11 13:46:27', ''),
	(7, 'test', '2021-10-11 14:03:14', '2021-10-11 14:03:14', ''),
	(8, 'test', '2021-10-11 18:37:03', '2021-10-11 18:37:03', ''),
	(9, 'test', '2021-10-11 22:44:19', '2021-10-11 22:44:19', ''),
	(10, 'test', '2021-10-11 23:06:09', '2021-10-11 23:06:09', ''),
	(11, 'test', '2021-10-16 11:58:20', '2021-10-16 11:58:20', '');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Volcando estructura para tabla login_node.roles_users
CREATE TABLE IF NOT EXISTS `roles_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_role` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_node.roles_users: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `roles_users` DISABLE KEYS */;
REPLACE INTO `roles_users` (`id`, `id_role`, `id_user`) VALUES
	(1, 1, 1);
/*!40000 ALTER TABLE `roles_users` ENABLE KEYS */;

-- Volcando estructura para tabla login_node.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_node.users: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `username`, `password`, `createAt`, `updateAt`) VALUES
	(1, 'alejo144@gmail.com', '$2a$10$DeewcxYZrHjhJxDgtuE6i.Ey26WTT9vnaO1qFW3XoOz3wgHwhkFva', '2021-10-11 13:46:27', '2021-10-11 22:55:32'),
	(6, 'alejo13@gmail.com', '$2a$10$DeewcxYZrHjhJxDgtuE6i.Ey26WTT9vnaO1qFW3XoOz3wgHwhkFva', '2021-10-11 14:03:14', '2021-10-16 12:00:16'),
	(11, 'carlos@gmail.com', '$2a$10$1mijQl3fbkek7KPYi4UgnOv7Z4RGtEr4sRD6DWFuO6mc/poFLmvoO', '2021-10-11 23:06:09', '2021-10-11 23:13:25'),
	(13, 'alejandroff@gmail.com', '$2a$10$MLnZcdKIbacWmb/g7ROJ4OVOyqXg.9yyoc3qIZeCUvqKLsfsZVPli', '2021-10-16 13:57:44', '2021-10-16 13:57:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
