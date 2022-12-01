-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: digitalhouse.cluster-cnyqegjgetrv.us-east-2.rds.amazonaws.com    Database: 0521PTC3N1db_GRUPO6
-- ------------------------------------------------------
-- Server version	8.0.23

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'wifi'),(2,'pool'),(3,'kitchen'),(4,'tv'),(5,'smoke'),(6,'pets'),(7,'parking'),(8,'party');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `amenity_seq`
--

LOCK TABLES `amenity_seq` WRITE;
/*!40000 ALTER TABLE `amenity_seq` DISABLE KEYS */;
INSERT INTO `amenity_seq` VALUES (1);
/*!40000 ALTER TABLE `amenity_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2022-12-12','2022-12-05','10:36:06 p. m.',2,102,NULL,NULL),(2,'2022-12-22','2022-12-20','11:30',2,102,NULL,NULL),(3,'2022-12-31','2022-12-29','10:00',2,102,NULL,NULL),(4,'2022-11-29','2022-11-27','10:00',2,254,NULL,NULL),(5,'2022-11-29','2022-11-27','10:00',2,254,NULL,NULL),(6,'2022-11-29','2022-11-27','10:00',2,254,NULL,NULL),(7,'2022-12-26','2022-12-23','10:00',2,502,NULL,NULL),(8,'2022-12-19','2022-12-16','10:00',2,502,'Camilo Martinez',_binary ''),(9,'2023-01-08','2023-01-05','13:00',2,502,'Usuario debe vacunarse antes de ingresar a la reserva',_binary ''),(10,'2022-12-11','2022-12-08','12:00',3,502,'Vacunarse antes de llegar al alojamiento',_binary '\0'),(11,'2022-12-15','2022-12-13','10:00',2,160,'',_binary ''),(12,'2022-12-03','2022-12-01','10:00',2,303,'',_binary ''),(13,'2022-12-03','2022-12-01','10:00',2,303,'',_binary ''),(14,'2022-12-03','2022-12-01','10:00',3,303,'',_binary ''),(15,'2022-12-08','2022-12-01','10:00',4,160,'',_binary ''),(16,'2022-12-15','2022-12-11','10:00',4,160,'',_binary ''),(17,'2022-12-15','2022-12-11','10:00',5,160,'',_binary ''),(18,'2022-12-28','2022-12-27','08:57',2,556,'',_binary ''),(19,'2022-12-26','2022-12-23','10:00',3,102,'Hola ',_binary ''),(20,'2022-12-31','2022-12-30','10:00',3,556,'',_binary ''),(21,'2023-03-16','2023-03-15','23:00',2,557,'Notas extras',_binary ''),(22,'2023-10-21','2023-10-21','10:00',2,558,'',_binary ''),(23,'2023-10-21','2023-10-21','10:00',2,558,'',_binary ''),(24,'2023-01-28','2023-01-15','11:00',2,559,'',_binary ''),(25,'2023-03-31','2023-03-19','10:00',2,559,'',_binary ''),(26,'2022-12-24','2022-12-23','10:00',4,254,NULL,NULL),(27,'2022-12-29','2022-12-29','10:00',4,254,NULL,NULL),(28,'2022-12-31','2022-12-31','10:00',4,254,NULL,NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'14','https://camada3grupo6.s3.amazonaws.com/Categories/hoteles.jpg','Hoteles'),(2,'10','https://camada3grupo6.s3.amazonaws.com/Categories/casas.jpg','Casas'),(3,'55','https://camada3grupo6.s3.amazonaws.com/Categories/apartamentos.jpg','Departamentos'),(4,'35','https://camada3grupo6.s3.amazonaws.com/Categories/casaCampo.jpg','Casas de campo'),(102,'Contiene espacios reducidos como sala-comedor o habitaciones pequeñas','https://camada3grupo6.s3.amazonaws.com/Categories/apartamentos.jpg','Departamento'),(1852,'descriptionTest','imageURLTest','titleTest'),(1902,'descriptionTest','imageURLTest','titleTest'),(1952,'descriptionTest','imageURLTest','titleTest'),(2002,'descriptionTest','imageURLTest','titleTest'),(2052,'descriptionTest','imageURLTest','titleTest'),(2102,'string','string','string'),(2152,'descriptionTest','imageURLTest','titleTest'),(2202,'descriptionTest','imageURLTest','titleTest'),(2252,'descriptionTest','imageURLTest','titleTest');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category_seq`
--

LOCK TABLES `category_seq` WRITE;
/*!40000 ALTER TABLE `category_seq` DISABLE KEYS */;
INSERT INTO `category_seq` VALUES (2351);
/*!40000 ALTER TABLE `category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (2,'Colombia','Cartagena de Indias','Bolivar'),(3,'Colombia','Medellin','Antioquia'),(11,'Colombia','Cali','Valle del Cauca'),(12,'Colombia','Barranquilla','Atlantico'),(13,'Colombia','Cartagena','Bolivar'),(14,'Colombia','Bucaramanga','Santander'),(15,'Colombia','Villavicencio','Meta'),(16,'Colombia','Santa Marta','Magdalena'),(17,'Colombia','Valledupar','Cesar'),(18,'Colombia','Ibague','Tolima'),(19,'Colombia','Monteria','Cordoba'),(20,'Colombia','Pereira','Risaralda'),(21,'Colombia','Manizales','Caldas'),(22,'Colombia','Pasto','Narino'),(23,'Colombia','Neiva','Huila'),(24,'Colombia','Palmira','Valle del Cauca'),(25,'Colombia','Popayan','Cauca'),(26,'Colombia','Buenaventura','Valle del Cauca'),(27,'Colombia','Floridablanca','Santander'),(28,'Colombia','Armenia','Quindio'),(29,'Colombia','Sincelejo','Sucre'),(30,'Colombia','Itagui','Antioquia'),(31,'Colombia','Tumaco','Narino'),(32,'Colombia','Envigado','Antioquia'),(33,'Colombia','Dosquebradas','Risaralda'),(34,'Colombia','Tulua','Valle del Cauca'),(35,'Colombia','Barrancabermeja','Santander'),(36,'Colombia','Riohacha','La Guajira'),(37,'Argentina','Buenos Aires','Ciudad de Buenos Aires'),(38,'Argentina','Cordoba','Cordoba'),(39,'Argentina','Rosario','Santa Fe'),(40,'Argentina','Mar del Plata','Buenos Aires'),(41,'Argentina','San Miguel de Tucuman','Tucuman'),(42,'Argentina','Salta','Salta'),(43,'Argentina','Santa Fe','Santa Fe'),(44,'Argentina','Corrientes','Corrientes'),(45,'Argentina','Bahia Blanca','Buenos Aires'),(46,'Argentina','Resistencia','Chaco'),(47,'Argentina','Posadas',' Misiones'),(48,'Argentina','Quilmes','Buenos Aires'),(49,'Argentina','San Salvador de Jujuy','Jujuy'),(51,'Argentina','	Santiago del Estero','Santiago del Estero'),(53,'Argentina','La Rioja','La Rioja'),(54,'Argentina','San Luis','San Luis'),(55,'Colombia','Bogota','Distrito Capital'),(56,'Colombia','Carmen de Apicala','Tolima');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `city_seq`
--

LOCK TABLES `city_seq` WRITE;
/*!40000 ALTER TABLE `city_seq` DISABLE KEYS */;
INSERT INTO `city_seq` VALUES (51);
/*!40000 ALTER TABLE `city_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `image_seq`
--

LOCK TABLES `image_seq` WRITE;
/*!40000 ALTER TABLE `image_seq` DISABLE KEYS */;
INSERT INTO `image_seq` VALUES (1);
/*!40000 ALTER TABLE `image_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (6,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/1.jpg','otra',2),(7,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/2.jpg','otra',2),(8,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/3.jpg','otra',2),(9,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/4.jpg','otra',2),(10,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/5.jpg','otra',2),(11,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/6.jpg','otra',2),(12,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/7.jpg','otra',2),(13,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/8.jpg','otra',2),(14,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/9.jpg','otra',2),(15,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/10.jpg','otra',2),(16,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/11.jpg','otra',2),(17,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/12.jpg','otra',2),(18,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/13.jpg','otra',2),(19,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/14.jpg','otra',2),(20,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/15.jpg','otra',2),(21,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/16.jpg','otra',2),(22,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/17.jpg','otra',2),(23,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/18.jpg','otra',2),(24,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/19.jpg','otra',2),(25,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/20.jpg','otra',2),(26,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/21.jpg','otra',2),(27,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/22.jpg','otra',2),(28,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/23.jpg','otra',2),(29,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/24.jpg','otra',2),(30,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/25.jpg','otra',2),(31,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/26.jpg','otra',2),(32,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/27.jpg','otra',2),(33,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/28.jpg','otra',2),(34,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/29.jpg','otra',2),(35,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/30.jpg','otra',2),(36,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/31.jpg','otra',2),(37,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/32.jpg','otra',2),(38,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/33.jpg','otra',2),(39,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/34.jpg','otra',2),(40,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/35.jpg','otra',2),(41,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/36.jpg','otra',2),(42,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/37.jpg','otra',2),(43,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/38.jpg','otra',2),(44,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/39.jpg','otra',2),(45,'https://camada3grupo6.s3.amazonaws.com/HotelSoyLocal/40.jpg','otra',2),(73,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/1.jpg','otra',3),(74,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/2.jpg','otra',3),(75,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/3.jpg','otra',3),(76,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/4.jpg','otra',3),(77,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/5.jpg','otra',3),(78,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/6.jpg','otra',3),(79,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/7.jpg','otra',3),(80,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/8.jpg','otra',3),(81,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/9.jpg','otra',3),(82,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/10.jpg','otra',3),(83,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/11.jpg','otra',3),(84,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/12.jpg','otra',3),(85,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/13).jpg','otra',3),(86,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/14).jpg','otra',3),(87,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/15.jpg','otra',3),(88,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/16).jpg','otra',3),(89,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/17.jpg','otra',3),(90,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/18.jpg','otra',3),(91,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/19.jpg','otra',3),(92,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/20.jpg','otra',3),(93,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/21.jpg','otra',3),(94,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/22.jpg','otra',3),(95,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/23.jpg','otra',3),(96,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/24.jpg','otra',3),(97,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/25.jpg','otra',3),(98,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/26.jpg','otra',3),(99,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/27.jpg','otra',3),(100,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/28.jpg','otra',3),(101,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/29.jpg','otra',3),(102,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/30.jpg','otra',3),(103,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/31.jpg','otra',3),(104,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/32.jpg','otra',3),(105,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/33.jpg','otra',3),(106,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/34.jpg','otra',3),(107,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/35.jpg','otra',3),(108,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/36.jpg','otra',3),(109,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/37.jpg','otra',3),(110,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/38.jpg','otra',3),(111,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/39.jpg','otra',3),(112,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/40.jpg','otra',3),(113,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/41.jpg','otra',3),(114,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/42.jpg','otra',3),(115,'https://camada3grupo6.s3.amazonaws.com/PenonDelRodadero/43.jpg','otra',3),(141,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/1.jpg','otra',4),(142,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/2.jpg','otra',4),(143,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/3.jpg','otra',4),(144,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/4.jpg','otra',4),(145,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/5.jpg','otra',4),(146,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/6.jpg','otra',4),(147,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/7.jpg','otra',4),(148,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/8.jpg','otra',4),(149,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/9.jpg','otra',4),(150,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/10.jpg','otra',4),(151,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/11.jpg','otra',4),(152,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/12.jpg','otra',4),(153,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/13.jpg','otra',4),(154,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/14.jpg','otra',4),(155,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/15.jpg','otra',4),(156,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/16.jpg','otra',4),(157,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/17.jpg','otra',4),(158,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/18.jpg','otra',4),(159,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/19.jpg','otra',4),(160,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/20.jpg','otra',4),(161,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/21.jpg','otra',4),(162,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/22.jpg','otra',4),(163,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/23.jpg','otra',4),(164,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/24.jpg','otra',4),(165,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/25.jpg','otra',4),(166,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/26.jpg','otra',4),(167,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/27.jpg','otra',4),(168,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/28.jpg','otra',4),(169,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/29.jpg','otra',4),(170,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/30.jpg','otra',4),(171,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/31.jpg','otra',4),(172,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/32.jpg','otra',4),(173,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/33.jpg','otra',4),(174,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/34.jpg','otra',4),(175,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/35.jpg','otra',4),(176,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/36.jpg','otra',4),(177,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/37.jpg','otra',4),(178,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/38.jpg','otra',4),(179,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/39.jpg','otra',4),(180,'https://camada3grupo6.s3.amazonaws.com/SanhaPlusHotel/40.jpg','otra',4),(224,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/1.jpg','otra',5),(225,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/2.jpg','otra',5),(226,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/3.jpg','otra',5),(227,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/4.jpg','otra',5),(228,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/5.jpg','otra',5),(229,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/6.jpg','otra',5),(230,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/7.jpg','otra',5),(231,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/8.jpg','otra',5),(232,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/9.jpg','otra',5),(233,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/10.jpg','otra',5),(234,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/11.jpg','otra',5),(235,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/12.jpg','otra',5),(236,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/13.jpg','otra',5),(237,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/14.jpg','otra',5),(238,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/15.jpg','otra',5),(239,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/16.jpg','otra',5),(240,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/17.jpg','otra',5),(241,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/18.jpg','otra',5),(242,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/19.jpg','otra',5),(243,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/20.jpg','otra',5),(244,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/21.jpg','otra',5),(245,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/22.jpg','otra',5),(246,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/23.jpg','otra',5),(247,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/24.jpg','otra',5),(248,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/25.jpg','otra',5),(249,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/26.jpg','otra',5),(250,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/27.jpg','otra',5),(251,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/27.jpg','otra',5),(252,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/28.jpg','otra',5),(253,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/29.jpg','otra',5),(254,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/30.jpg','otra',5),(255,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/31.jpg','otra',5),(256,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/32.jpg','otra',5),(257,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/33.jpg','otra',5),(258,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/34.jpg','otra',5),(259,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/35.jpg','otra',5),(260,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/36.jpg','otra',5),(261,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/37.jpg','otra',5),(262,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/38.jpg','otra',5),(263,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/39.jpg','otra',5),(264,'https://camada3grupo6.s3.amazonaws.com/VillaCataHotel/40.jpg','otra',5),(265,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/1.jpg','otra',6),(266,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/2.jpg','otra',6),(267,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/3.jpg','otra',6),(268,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/4.jpg','otra',6),(269,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/5.jpg','otra',6),(270,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/6.jpg','otra',6),(271,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/7.jpg','otra',6),(272,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/8.jpg','otra',6),(273,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/9.jpg','otra',6),(274,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/10.jpg','otra',6),(275,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/11.jpg','otra',6),(276,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/12.jpg','otra',6),(277,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/13.jpg','otra',6),(278,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/14.jpg','otra',6),(279,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/15.jpg','otra',6),(280,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/16.jpg','otra',6),(281,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/17.jpg','otra',6),(282,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/18.jpg','otra',6),(283,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/19.jpg','otra',6),(284,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/20.jpg','otra',6),(285,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/21.jpg','otra',6),(286,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/22.jpg','otra',6),(287,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/23.jpg','otra',6),(288,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/24.jpg','otra',6),(289,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/25.jpg','otra',6),(290,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/26.jpg','otra',6),(291,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/27.jpg','otra',6),(292,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/27.jpg','otra',6),(293,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/28.jpg','otra',6),(294,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/29.jpg','otra',6),(295,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/30.jpg','otra',6),(296,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/31.jpg','otra',6),(297,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/32.jpg','otra',6),(298,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/33.jpg','otra',6),(299,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/34.jpg','otra',6),(300,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/35.jpg','otra',6),(301,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/36.jpg','otra',6),(302,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/37.jpg','otra',6),(303,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/38.jpg','otra',6),(304,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/39.jpg','otra',6),(305,'https://camada3grupo6.s3.amazonaws.com/CasaBevant/40.jpg','otra',6),(306,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/1.jpg','otra',7),(307,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/2.jpg','otra',7),(308,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/3.jpg','otra',7),(309,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/4.jpg','otra',7),(310,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/5.jpg','otra',7),(311,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/6.jpg','otra',7),(312,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/7.jpg','otra',7),(313,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/8.jpg','otra',7),(314,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/9.jpg','otra',7),(315,'https://camada3grupo6.s3.amazonaws.com/GuemesApartNuevaCordoba/10.jpg','otra',7),(316,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/1.jpg','otra',8),(317,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/2.jpg','otra',8),(318,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/3.jpg','otra',8),(319,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/4.jpg','otra',8),(320,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/5.jpg','otra',8),(321,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/6.jpg','otra',8),(322,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/7.jpg','otra',8),(323,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/8.jpg','otra',8),(324,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/9.jpg','otra',8),(325,'https://camada3grupo6.s3.amazonaws.com/VILLADURYIX/10.jpg','otra',8);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `item_seq`
--

LOCK TABLES `item_seq` WRITE;
/*!40000 ALTER TABLE `item_seq` DISABLE KEYS */;
INSERT INTO `item_seq` VALUES (1);
/*!40000 ALTER TABLE `item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'No se permiten fiestas',1),(2,'No fumar',1),(3,'Check-out: 10:00 a.m.',1),(4,'Se aplican las politicas de distanciamiento social y otras normas relacionads',2),(5,'Detector de humo',2),(6,'Deposito de seguridad',2),(7,'Agrega las fechas de tu viaje para obtener las polticas de cancelacion',3);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `location_seq`
--

LOCK TABLES `location_seq` WRITE;
/*!40000 ALTER TABLE `location_seq` DISABLE KEYS */;
INSERT INTO `location_seq` VALUES (751);
/*!40000 ALTER TABLE `location_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (2,'Calle 19 # 8 14','11.241684146924813','-74.20734798157837',16),(3,'Calle 1 # 17 69','11.198615729277433','-74.22816698895492',16),(4,'Km. 13, Via Al Aeropuerto','11.157403656300135','-74.22288656030189',16),(5,'Km. 27 Carretera al Parque Tayrona Casa 1','11.27735976346513','-73.94550972961264',16),(6,'Vicente López 1827','-34.59033261119721','-58.39110188671169',37),(7,'250 Montevideo, 5000','-31.420225074132766','-64.1894601019803',38),(8,'Carmen De Apicalá - Cundai','4.166301307645855','-74.73109228655456',56),(502,'adressTest','latitudeTest','longitudeTest',1),(552,'adressTest','latitudeTest','longitudeTest',1),(602,'adressTest','latitudeTest','longitudeTest',1),(652,'addressTest','latitudeTest','longitudeTest',1);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `politic_seq`
--

LOCK TABLES `politic_seq` WRITE;
/*!40000 ALTER TABLE `politic_seq` DISABLE KEYS */;
INSERT INTO `politic_seq` VALUES (1);
/*!40000 ALTER TABLE `politic_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `politics`
--

LOCK TABLES `politics` WRITE;
/*!40000 ALTER TABLE `politics` DISABLE KEYS */;
INSERT INTO `politics` VALUES (1,'Normas de la Casa'),(2,'Politicas de Cancelacion'),(3,'Salud y Seguridad');
/*!40000 ALTER TABLE `politics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_seq`
--

LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (301);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'El Soy Local Santa Marta se encuentra en el centro de Santa Marta, cerca de la catedral de Santa Marta y del Museo del Oro de Santa Marta, y ofrece bar, jardín y terraza.','Soy Local Santa Marta',1,2),(3,'El Edificio El Peñón del Rodadero se encuentra en Santa Marta y ofrece vistas al jardín, pileta al aire libre, salón compartido, jardín, cancha de tenis y terraza.','Peñon de rodadero',1,3),(4,'El hotel Sánha Plus ofrece alojamiento en Santa Marta, a 500 metros de la playa (7 minutos en auto). Cuenta con 2 piscinas rodeadas de palmeras. Hay WiFi.','Sanha Plus Hotel',1,4),(5,'El Villa Cata Hotel se encuentra en Santa Marta, a 26 km de la Quinta de San Pedro Alejandrino, y ofrece alojamiento con restaurante, estacionamiento privado gratuito, pileta al aire libre y bar. Todos los alojamientos de este hotel de 3 estrellas tienen vistas a la pileta, salón compartido y jardín. Se ofrece conexión wifi gratis y room service.','Hotel Villa Cata',1,5),(6,'La Casa Bevant ofrece alojamiento en Buenos Aires, a solo 300 metros del cementerio de la Recoleta. El establecimiento proporciona conexión WiFi gratuita en todas las instalaciones.','Casa Bevant',2,6),(7,'El Guemes Apart Nueva Cordoba ofrece alojamiento con aire acondicionado y wifi gratis en Córdoba, a 200 metros del centro comercial Patio Olmos.','Guemes Apart Nueva Cordoba',3,7),(8,'Situated 21 km from Piscilago, VILLA DURYIX features accommodation with a bar, a garden and a 24-hour front desk for your convenience.','Villa Duryix',4,8);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products_amenities`
--

LOCK TABLES `products_amenities` WRITE;
/*!40000 ALTER TABLE `products_amenities` DISABLE KEYS */;
INSERT INTO `products_amenities` VALUES (2,1),(2,2),(2,4),(2,5),(2,6),(2,7),(2,8),(3,1),(3,2),(3,4),(3,5),(3,7),(4,1),(4,4),(4,5),(4,7),(4,8),(5,1),(5,2),(5,4),(5,5),(5,6),(5,7),(5,8),(6,1),(6,4),(6,5),(6,7),(7,1),(7,4),(7,6),(7,7),(8,1),(8,4),(8,6),(8,7);
/*!40000 ALTER TABLE `products_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products_items`
--

LOCK TABLES `products_items` WRITE;
/*!40000 ALTER TABLE `products_items` DISABLE KEYS */;
INSERT INTO `products_items` VALUES (2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(3,1),(3,2),(3,4),(3,5),(3,7),(4,1),(4,3),(4,4),(4,6),(4,7),(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(5,7),(6,1),(6,2),(6,3),(6,4),(6,5),(6,6),(6,7),(7,1),(7,2),(7,3),(7,5),(8,1),(8,2),(8,3),(8,5);
/*!40000 ALTER TABLE `products_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rating_seq`
--

LOCK TABLES `rating_seq` WRITE;
/*!40000 ALTER TABLE `rating_seq` DISABLE KEYS */;
INSERT INTO `rating_seq` VALUES (1);
/*!40000 ALTER TABLE `rating_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,4,102,2),(2,3,102,3),(3,5,102,4),(4,2,102,5),(5,4,152,5),(6,3,152,4),(7,5,152,3),(8,1,152,2),(9,3,160,2),(10,2,160,3),(11,4,160,4),(12,5,160,5);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role_seq`
--

LOCK TABLES `role_seq` WRITE;
/*!40000 ALTER TABLE `role_seq` DISABLE KEYS */;
INSERT INTO `role_seq` VALUES (1);
/*!40000 ALTER TABLE `role_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (651);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(102, 1, 'camilo_2510@hotmail.com','Martinez','Camilo','$2a$10$7VGlbjCwJDb8c4ypZmjS8.CDa5gp/C9EwqOpywmPuSrIEJE49Blwy',1),
(152, 1, 'juliana_aparicio@outlook.com','Aparicio','Juliana','$2a$10$Zl8BYSzMnbgCLbTz/LgE2OzgnXuaz2JD9L51V641wmZHLzY1wSRxu',1),
(160, 1, 'fernandez.agustinaelena@gmail.com','Fernandez','Agustina','$2a$10$h6iL/0UCU0GjrxUO2YJgG.Rktql6l03euevRysaH.HC/ZJDJwPzBa',1),
(202, 1, 'nmflorezr@gmail.com','Florez','Nicolas','$2a$10$Oytnw0/3hk9Wz3vSSlR9Y.g/HNeyKUh/gMBlupg90jVU9BRzL3ncq',1),
(203, 1, 'nmflorezr@gmail.com','Florez','Nicolas','$2a$10$3DeYp3Q4sfSUKmaW4o0o/OgOdGHwWsnk6zTTknMd8n2ukEDcda01K',1),
(204, 1, 'nmflorezr1@gmail.com','Florez','Nicolas','$2a$10$Fhe.R4eU8ripby4ttuPzZ.Ew0od8BeRSwppKfo5DZAB5A9pBZaNYi',1),
(205, 1, 'dummyMail@gmail.com','Lastname','User','$2a$10$gz4wlkBOiXlob64Py9/Gz.VdMDDEtTBMqAYKknSY6xj92iM7yeeN2',1),
(252, 1, 'user@gmail.com','fernandez','agustina','$2a$10$14.gPA4fxOhruTSeEIhBCe0MEgQs9/SGqfMIdiR4OfCqqQV/NlO6W',1),
(253, 1, 'dummymail@gmail.com','lastname','name','$2a$10$TjK9Gt3qzVy9wwbjABDj0OLuKsLMPOSq2.r/lsKIRIqjnEoUPRl2a',1),
(254, 1, 'owo@gmail.com','lastname','name','$2a$10$VyzLZyrmtf5HK3qcAq2k.ORbzGAe92okYT3KCjhYP2kZlnDCm8PZy',1),
(302, 1, 'mail@dummymail.com','DummyLastName','DummyName','$2a$10$09dLZ18IibQbaCQzePxJg.WgHgpYJuShrAxVVi2QOVBjs0A/7y5iq',1),
(303, 1, 'hectorjaviermorenoh@gmail.com','Moreno','Hector Javier','$2a$10$7byski/.T5aNaCD6XCDNKuI8ClAAMLd.WBpzI9UIDm0bjaGQBlTRm',1),
(502, 1, 'camilomartinez2510@gmail.com','Martinez','Milo','$2a$10$AlmseXGkFiqw3Qh2ZG9Oj.1PF.7kG8t4IMNKHIJmo8rOs59E.U6WS',1),
(552, 1, 'fernandez.ae.87@gmail.com','hongo','pepe','$2a$10$O5faILsyONlDuMJXlc/gLuIzSciEFeV1M9Sg7n811GFFgmBhXlire',1),
(553, 1, 'mjz53@hotmail.com','Zabala','Marcos ','$2a$10$9mhS8AbftYXpUqh.XA3NruWWyzohwbCJmvf5x8U8a4zkrmhcx6HxS',1),
(554, 1, 'user1@gmail.com','araz','sole','$2a$10$oitWAAwyjSKhRTVF1/n/WeW5bU4LspyzgFtodx4TXoCfosVQxdGO6',1),
(555, 1, 'juan@gmail.com','Lopez','Juan','$2a$10$iCgLE74EzG3XAwROfr058uYUb3BvRkRyu6Mvbj8DFaWH/iZ4w.ZBC',1),
(556, 1, 'abc@gmail.com','LastName','Name','$2a$10$Ev8XxA4ltg25ULt4Gswl5ORAmX7gAtGJc.k.nWg7DhudppF8GzkGu',1),
(557, 1, 'asd@gmail.com','Lastname','User','$2a$10$zEI0oVbzrhos9rXx36Mum.AFf4wf7X5mZhijh44Lr.PCgZzeN.6g6',1),
(558, 1, 'nmflorezr@correo.udistrital.edu.co','Florez','Nicolas','$2a$10$j9tTa2heBPdBIirMfefEteka/Z4d6OoyVHTd2qP1V6rUfP.uK0nfe',1),
(559, 1, 'leammau@gmail.com','Mauro','Leandro','$2a$10$lANzbLMSRAwhVdzrcYvtJ.dD14mM.uZ.POab0orvM60Eaac1EVIva',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users_products`
--

LOCK TABLES `users_products` WRITE;
/*!40000 ALTER TABLE `users_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_products` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-30 15:27:07
