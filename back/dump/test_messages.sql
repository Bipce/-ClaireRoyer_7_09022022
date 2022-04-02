-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` varchar(255) NOT NULL,
  `updated` varchar(255) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `imagesUrl` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  `topicId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_18325f38ae6de43878487eff98` (`id`),
  KEY `FK_4838cd4fc48a6ff2d4aa01aa646` (`userId`),
  KEY `FK_8edbb8d2cc4337aca67adffb2b7` (`topicId`),
  CONSTRAINT `FK_4838cd4fc48a6ff2d4aa01aa646` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_8edbb8d2cc4337aca67adffb2b7` FOREIGN KEY (`topicId`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (13,'1648918548924',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet ullamcorper tellus.','d49437b9-9ab5-4189-9459-82a80814ade2.jpeg|f04678c0-f653-41a1-afc0-5060a95b8777.jpeg',5,8),(14,'1648918562788',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet ullamcorper tellus.','9c5f8c88-ab86-472d-a977-2440b2900086.jpeg|021583c8-ede3-43d8-811a-488bc5e12f00.jpeg',5,7),(15,'1648918577840',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet ullamcorper tellus.','52744b91-6a60-47a8-bf84-eddd94710014.jpeg|63a6ce2e-f58c-4a55-8722-031870a69a40.jpeg',1,7),(16,'1648918717273',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet ullamcorper tellus.','4a191af1-67d7-419d-909c-53aac478a883.jpeg|cad95eef-4c05-4f4f-8ce0-4bd0647b4ce1.jpeg',1,8);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-02 19:05:28
