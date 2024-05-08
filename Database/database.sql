-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: Globetrotter
-- ------------------------------------------------------
-- Server version	8.1.0
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `Auctions`
--

CREATE Database Globetrotter;
USE Globetrotter;
DROP TABLE IF EXISTS `Auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Auctions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(510) NOT NULL,
  `valuationPrice` int NOT NULL,
  `priceRange` int NOT NULL,
  `images` varchar(1020) NOT NULL,
  `endTime` datetime NOT NULL,
  `category` int NOT NULL,
  `company` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Auctions_Categories_id_fk` (`category`),
  KEY `Auctions_Companies_id_fk` (`company`),
  CONSTRAINT `Auctions_Categories_id_fk` FOREIGN KEY (`category`) REFERENCES `Categories` (`id`),
  CONSTRAINT `Auctions_Companies_id_fk` FOREIGN KEY (`company`) REFERENCES `Companies` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 39 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Auctions`
--

INSERT INTO `Auctions` (
    `id`,
    `title`,
    `slug`,
    `description`,
    `valuationPrice`,
    `priceRange`,
    `images`,
    `endTime`,
    `category`,
    `company`
  )
VALUES (
    2,
    'Blue Star Jaz Aquamarine ,HURGHADA-KUSTEN, EGYPTEN',
    'blue-star-jaz-aquamarine-hurghada-kusten-egypten',
    'På Blue Star Jaz Aquamarine bor du och din familj precis vid havet i södra delen av Hurghada. Här finns 17 pooler, en stor vattenpark och många sportaktiviteter. Hotellet har också ett lyxigt spa för de vuxna',
    30000,
    8000,
    '\"https://i.postimg.cc/tCRTtWRQ/ACC-009898-MEX-25-Web-Original-Compressed.avif\",\r\n        \"https://i.postimg.cc/8kxGsvFm/i-0278508-Web-Original-Compressed.jpg\",\r\n        \"https://i.postimg.cc/brhRFLCR/TEQ-18-009-Pools-Web-Original-Compressed.avif\",\r\n        \"https://i.postimg.cc/DyCqq2T6/TEQ-18-001-USPWeb-Original-Compressed.avif\"',
    '2024-03-04 09:45:15',
    1,
    1
  ),
(
    3,
    'Livin Mykonos, Mykonos, Grekland',
    'livin-mykonos-mykonos-grekland',
    'Livin Mykonos har ett lugnt läge strax utanför Mykonos stad. Här bor du på ett mindre hotell med boutiquekänsla i kykladisk stil med vitkalkade väggar och färger som går i dämpade toner. På hotellet finns pool, bekväma solsängar och en intiliggande barservering och restaurang.',
    40000,
    8000,
    '\"https://i.postimg.cc/L8L8mTNP/464481a-hb-p-002.avif\",\r\n        \"https://i.postimg.cc/sxb3rQWK/464481a-hb-a-006.avif\",\r\n        \"https://i.postimg.cc/kX825q5D/015669a-hb-t-001.avif\",\r\n        \"https://i.postimg.cc/hjfjRqwD/MYK-PYL-F004-plati-yialos-mykonos-beach-rocks.jpg\"',
    '2024-04-18 12:53:07',
    1,
    1
  ),
(
    4,
    'Royalton Splash Riviera Cancun, CANCUN, MEXICO',
    'royalton-splash-riviera-cancun-cancun-mexico',
    'Längs den vita sandstranden och turkosa havet några mil utanför Cancun ligger nybyggda Royalton Splash Riviera Cancun. Här finns ett häftigt vattenland där du kan svischa ner för en av de 14 vattenrutschbanorna och flera pooler för både stora och små.',
    50000,
    10000,
    'https://i.postimg.cc/7644209d/4-Premier-Beach-Front-View-4-Web-Original-Compressed.jpg\",\r\n        \"https://i.postimg.cc/k5D9Bvyw/drone-image-pool-beach-ayara-villas-khao-lak-thailand.avif\",\r\n        \"https://i.postimg.cc/cJVq6yC4/pool-area-sunbeds-baan-karon-resort-karon-beach-phuket-thailand.avif\",\r\n        \"https://i.postimg.cc/nz85p4SX/garden-hotel-ayara-villas-khao-lak-thailand.avif\"',
    '2024-04-23 12:53:07',
    1,
    3
  ),
(
    14,
    'Ocean Riviera Paradise,CARMEN, MEXICO',
    'ocean-riviera-paradise-carmen-mexico',
    'Ocean Riviera Paradise ligger precis intill Rivieran Maya-stranden en bit utanför Playa del Carmen. Här finns allt du kan tänka dig för att få en lyckad semester – luta dig tillbaka i en solstol, spela beach volleyball eller en serie bowling.',
    20000,
    4000,
    '\"https://i.postimg.cc/Dz7JDHn0/hotel-overview-riu-palace-santa-maria-sal-cape-verde-tui.avif\",\r\n        \"https://i.postimg.cc/QCCczPg1/Cape-Verde-Boa-Vista-VIP-Discovery-46-Web-Original-Compressed.jpg\",\r\n        \"https://i.postimg.cc/wBJzXTSs/lobby-reception-riu-palace-santa-maria-sal-cape-verde-tui.avif\",\r\n        \"https://i.postimg.cc/fT6gxjZB/pool-and-terrace-swim-up-double-room-riu-palace-santa-maria-sal-cape-verde-tui.avif\"',
    '2024-04-18 09:57:21',
    1,
    3
  ),
(
    15,
    'COMO Uma Punakha, Bhutan',
    'como-uma-punakha-bhuata',
    'Den lilla intima lodgen COMO Uma Punakha ligger i en sagolikt vacker, avlägsen och stillsam dal i konungariket Bhutan. Med utsikt över Himalayas höga toppar slingrar sig floden Mo Chu genom risfält och fruktträdgårdar.  Lodgen har nio rymliga rum och två fristående villor som erbjuder ett boende utöver det vanliga. Rummen har hisnande vyer över dalen, varav några med privata terrasser. ',
    40000,
    7000,
    '\"https://i.postimg.cc/kgvzqR3s/shutterstock-1034070004.webp\",\r\n        \"https://i.postimg.cc/cJKRTPm3/bt-uma-punakha-one-shambala-retreat-web.webp\",\r\n        \"https://i.postimg.cc/GtRvLt1P/bt-uma-punakha-terrace2-web.jpg\",\r\n        \"https://i.postimg.cc/KYgTtBGr/bt-uma-punakha-spa-web.webp\"',
    '2024-04-27 09:58:38',
    2,
    3
  ),
(
    16,
    'Origins Lodge, Costa Rica',
    'origins-lodge-costa-rica',
    'I norra Costa Rica med milsvid utsikt över Nicaraguasjön ligger lyxiga Origins Lodge. Här radas naturupplevelserna upp på rad, där naturvandringar till närliggande vattenfall, fisketurer och hästridning står på dagens agenda. Platsen är även perfekt för den som söker balans mellan kropp och själ.',
    50000,
    10000,
    '\"https://i.postimg.cc/N0hFqVtm/bt-uma-punakha-food-web.webp\",\r\n        \"https://i.postimg.cc/fbjz4RBQ/cr-origins-architectural-lodge-3-web.webp\",\r\n        \"https://i.postimg.cc/d15J1NbW/cr-origins-architectural-villa-4-web.webp\",\r\n        \"https://i.postimg.cc/k4pLLr3d/cr-origins-architectural-lodge-1-web.webp\"',
    '2024-04-24 10:01:42',
    2,
    3
  ),
(
    17,
    'Six Senses Vana, Indien',
    'six-senses-vana-indien',
    'Den okända staden Dehradun är en av Indiens mest andliga platser och ligger på en skogsklädd bergsplatå mellan Himalaya och Rajasthan. I en sparsmakad elegans tar Six Senses Vana hänsyn till varje aspekt av en människas välbefinnande: kropp, själ, känsla och tanke.',
    30000,
    8000,
    '\"https://i.postimg.cc/9XqWVbxB/cr-nayara-tented-camp-volcano-2-web.webp\",\r\n        \"https://i.postimg.cc/fTnMbdpQ/cr-nayara-tented-camp-room-4-web.webp\",\r\n        \"https://i.postimg.cc/pdg6BfD2/cr-origins-architectural-lodge-4-web.webp\",\r\n        \"https://i.postimg.cc/FKR46Vd3/cr-nayara-tented-camp-pool-2-web.webp\"',
    '2024-04-29 10:31:06',
    2,
    3
  ),
(
    18,
    'Marbella Club Hotel, Golf Resort & Spa, Spanien',
    'marbella-club-hotel-golf-resort-spa-spanien',
    'Marbella Club är en exklusiv blandning av gammalt och nytt med en kunglig historia. Här är klirret av kristall lika naturligt som gyllene mosaik, praktfulla trädgårdar och Marbellas magiska klimat. Det underbara läget direkt på stranden bidrar till den avslappnade atmosfären som tillsamman med all elegans gör Marbella Club till en oförglömlig semester.',
    40000,
    10000,
    '\"https://i.postimg.cc/8P2fNsB7/cr-nayara-tented-camp-bathroom-1-web.webp\",\r\n        \"https://i.postimg.cc/44MmQn0W/gr-euphoria-feel-alive-again-in-the-outdoor-infinity-pool-web.webp\",\r\n        \"https://i.postimg.cc/c1KQWqy5/gr-euphoria-leoncini-outdoor-dinning-area-web.webp\",\r\n        \"https://i.postimg.cc/SKsnG8mt/gr-euphoria-monrings-at-euphoria-web.webp\"',
    '2024-04-26 10:32:17',
    2,
    4
  ),
(
    19,
    'Lily of the Valley, Frankrike',
    'lily-of-the-valley-frankrike',
    'Lily of the Valley är beläget på toppen av en kulle med en hisnande utsikt över Medelhavet. På denna exklusiva wellnessretreat som välkomnar gäster året runt, bor du bara 20 minuter från Saint-Tropez och endast en kort promenad från den fem kilometer långa sandstranden Gigaro.',
    50000,
    10000,
    '\"https://i.postimg.cc/qRHd7VDX/fr-lily-of-the-valley-pool-area-sunset.webp\",\r\n        \"https://i.postimg.cc/d3Qp7q2d/fr-lily-of-the-valley-suite.webp\",\r\n        \"https://i.postimg.cc/hvhMWh8C/fr-lily-of-the-valley-pool.webp\",\r\n        \"https://i.postimg.cc/Nf6bhhRv/gr-euphoria-meditation-room-web.webp\"',
    '2024-04-25 10:33:51',
    2,
    4
  ),
(
    20,
    'Hotel Voltaire , Paris',
    'hotel-voltaire-paris',
    'Med centralt läge i Paris ligger hotell Voltaire. Här bor du nära välkända sevärdheter som Triumfbågen och Eiffeltornet. Paradgatan Champs Elysées med shopping och restauranger har du i närheten och både tunnelbana och busshållplatser finns några minuter bort. ',
    30000,
    8000,
    '\"https://i.postimg.cc/D0jv0pXv/017136a-hb-a-043.avif\",\r\n        \"https://i.postimg.cc/nLJJFfPK/017136a-hb-r-026.avif\",\r\n        \"https://i.postimg.cc/qgVms4nj/017136a-hb-ro-004.avif\",\r\n        \"https://i.postimg.cc/L8mcw3Yv/017136a-hb-l-033.avif\"',
    '2024-04-27 10:35:05',
    3,
    4
  ),
(
    21,
    'Clutadella, Budapest',
    'clutadella-budapest',
    'Clutadella är ett modernt inrett hotell i centrala Budapest. Från hotellet kan du promenera till sevärdheter som St Stefans Basilikan, parkområdet Erzsébet tér och Stadsoperan. Vill du ta en tur med kanalbåt på Donau tar det ca 10 min att promenera till floden.',
    60000,
    7000,
    '\"https://i.postimg.cc/T1qkJB9x/181748a-hb-a-006.avif\",\r\n        \"https://i.postimg.cc/1XJGtSB8/181748a-hb-a-054.avif\",\r\n        \"https://i.postimg.cc/N0qHQLtN/181748a-hb-l-024.avif\",\r\n        \"https://i.postimg.cc/5tS613n0/181748a-hb-ro-023.avif\"',
    '2024-04-14 10:36:10',
    3,
    4
  ),
(
    22,
    'Rixos, Dubrovnik',
    'rixos-dubrovnik',
    'Rixos Premium Dubrovnik är beläget på en utskjutande klippa vid havet och nästan överallt har du fantastisk panoramavy mot Adriatiska havet. Precis nedanför poolområdet hittar du badplattformar och bara 20 minuters promenad från hotellet ligger Dubrovniks medeltida stadskärna.',
    40000,
    10000,
    '\"https://i.postimg.cc/pdcypTMb/ACC-018378-AC2004882-rixos-premium-dubrovnik-dubrovnik-croatia-pool-sea-sunbeds.avif\",\r\n        \"https://i.postimg.cc/RZM0dfMx/coast-line-view-libertas-terrace-rixos-premium-dubrovnik-croatia-tui.avif\",\r\n        \"https://i.postimg.cc/sDfF0JZm/LOC-000465-CRO-DUB-F233-Web-Original-Compressed.jpg\",\r\n        \"https://i.postimg.cc/wjtGS4xX/front-desk-rixos-premium-dubrovnik-croatia-tui.avif\"',
    '2024-05-03 10:37:14',
    3,
    4
  ),
(
    23,
    'Albert Premier, Nice ',
    'albert-premier-nice',
    'Hotellet Albert Premier har utsikt över havet och ligger i hjärtat av Nice, nära gamla stan. Här bor du på promenadavstånd till Place Masséna och den berömda gatan Promenade des Anglais.',
    20000,
    10000,
    '\"https://i.postimg.cc/J4H38fJz/014029a-hb-a-011.avif\",\r\n        \"https://i.postimg.cc/PxNK02jG/014029a-hb-a-012.avif\",\r\n        \"https://i.postimg.cc/rmvG3TjW/014029a-hb-a-025.avif\",\r\n        \"https://i.postimg.cc/tgsxjfYz/014029a-hb-a-029.avif\"',
    '2024-05-12 10:38:23',
    3,
    4
  ),
(
    24,
    'Catalonia Port, Barcelona',
    'catalonia-port-barcelona',
    'Hotell Catalonia Park ligger i Barcelonas äldsta stadsdel, de gotiska kvarteren, mellan La Ramla och Parc de la Ciutadella. Du bor dessutom bara en gata bort från hamnpromenaden och har gångavstånd till Picassomuseet. Hotellet i sig är modernt och bekvämt.',
    70000,
    11000,
    '\"https://i.postimg.cc/RVq9Xz8G/336197a-hb-a-001.avif\",\r\n        \"https://i.postimg.cc/DzPt7CH8/336197a-hb-l-002.avif\",\r\n        \"https://i.postimg.cc/FHtq35QY/336197a-hb-ro-032.avif\",\r\n        \"https://i.postimg.cc/bJQ07MBB/336197a-hb-ro-009.avif\"',
    '2024-05-09 10:40:16',
    4,
    4
  ),
(
    26,
    'VANDRING TIROL ÖARNA & ETNA, SICILIEN',
    'vanrding-pa-eoliska-oarna-&-etna-sicilien',
    'På denna resa färdas vi med båt ut till Eoliska öarna för spektakulära vulkanvandringar och avslutar med att vandra på Europas högsta aktiva vulkan, Etna.',
    10000,
    20000,
    '\"https://i.postimg.cc/Qd9f66hR/0005-Vulcano-Eolie-scaled-362x272.jpg\",\r\n        \"https://i.postimg.cc/C1LD21bz/sicilien-05-390x234.jpg\",\r\n        \"https://i.postimg.cc/CM97RGj7/IMG-4063-scaled-760x507.jpg\",\r\n        \"https://i.postimg.cc/ncv4M6VV/Vulcano-solnedgang-scaled-378x252.jpg\"',
    '2024-05-12 10:42:55',
    4,
    2
  ),
(
    27,
    'VANDRING, TOUR DU MONT BLANC',
    'varnding-tour-du-mont-blanc',
    'På gränsen mellan Frankrike och Italien finner man Alpernas högsta berg; Mont Blanc. Vandra Tour du Mont Blanc och upplev storheten i denna klassiska alpmiljö.',
    30000,
    5000,
    '\"https://i.postimg.cc/PJHq7VgK/Chamdlux-006-2-1024x570.jpg\",\r\n        \"https://i.postimg.cc/NG8FXYXn/Chamdlux-005-scaled-1-741x538.jpg\",\r\n        \"https://i.postimg.cc/rmXydYwc/chamex02-1-412x309.jpg\",\r\n        \"https://i.postimg.cc/xC3YFvKS/nedladdning.jpg\"',
    '2024-05-14 10:43:55',
    4,
    2
  ),
(
    28,
    'VANDRA I SAGHROMASSIVET, SÖDRA MAROCKO',
    'vandra-i-saghromamassivet-sodra-marocko',
    'Denna vandring i Saghromassivet ger dig fascinerande bergslandskap, klara stjärnhimlar och svindlande naturupplevelser.',
    20000,
    5000,
    '\"https://i.postimg.cc/mD5wNMKb/saghroheader01-scaled-399x224.jpg\",\r\n        \"https://i.postimg.cc/kX80GXtV/Set-Width2500-IMG-2028-red-webb-377x251.jpg\",\r\n        \"https://i.postimg.cc/YCzTNnRM/saghromaroc04-1024x683.jpg\",\r\n        \"https://i.postimg.cc/Zn3JJPSn/Set-Width2500-IMG-2526-red-webb-760x507.jpg\"',
    '2024-04-29 10:45:07',
    4,
    2
  ),
(
    29,
    'VANDRA I KAPPADOKIEN & ALLA DAGLAR, TURKIET',
    'vandra-i-kappadokien-&-alla-dagar-turkiet',
    'Följ med på en vandring till några av världens mest fascinerande och intressanta landskap. Vi varvar kulturupplevelser med vandring och knyter an till regionens rika historia.',
    20000,
    6000,
    '\"https://i.postimg.cc/v8jpz6d2/Turkiet-header-1024x683-1-760x507.jpg\",\r\n        \"https://i.postimg.cc/9Qp2JFb4/Turkiet03-775x517.jpg\",\r\n        \"https://i.postimg.cc/rpmBjGzb/Turkiet04-375x250.jpg\",\r\n        \"https://i.postimg.cc/vTg8KFBJ/Turkiet06-1-1024x667.jpg\"',
    '2024-04-30 10:46:15',
    4,
    2
  ),
(
    31,
    'Malaga',
    'malaga-trip',
    'Bada och sola i fina Malaga',
    10000,
    1000,
    '\"https://i.postimg.cc/v8jpz6d2/Turkiet-header-1024x683-1-760x507.jpg\",\n        \"https://i.postimg.cc/9Qp2JFb4/Turkiet03-775x517.jpg\",\n        \"https://i.postimg.cc/rpmBjGzb/Turkiet04-375x250.jpg\",\n        \"https://i.postimg.cc/vTg8KFBJ/Turkiet06-1-1024x667.jpg\"',
    '2024-04-10 16:38:00',
    4,
    2
  ),
(
    33,
    'malaga',
    'malaga',
    'malaga-sun',
    10000,
    2000,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s',
    '2024-04-20 15:03:00',
    1,
    1
  ),
(
    34,
    'rom',
    'rom',
    'rom-trip',
    20000,
    2000,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjcKJLklsHLHDaAMFarlHOtw0-fITnSgzKXcfh0Mcruw&s,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsD_cjH7AHJC7v1Aa36hvZlCvpCze53TGGB0Ew14Nirw&s',
    '2024-04-12 10:43:00',
    3,
    12
  ),
(
    35,
    'Grekland',
    'grekland',
    'Båtluffa mellan fina öar',
    20000,
    5000,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ht5TDSU8NJX_YMK6B-J0iIP_0JoEjEHD_ut6CZ_lQQ&s',
    '2024-04-18 10:15:00',
    2,
    13
  ),
(
    36,
    'malaga',
    'malaga',
    'hej',
    10000,
    2000,
    'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSl3nTHQSFrvFOpR_rkbYaA9nFJSNGxkL_ujmFdpG8ezOzdghIZf0oMdMqmm4LxOo4YuQUT0VqyypdP1GgExoA4Iyh3dFtXWP7DsYAWSA',
    '2024-04-15 11:34:00',
    1,
    13
  ),
(
    37,
    'Dags tur i Barccelona',
    'dags-tur-i-barccelona',
    'Vandra genom Barcelona och upptäck allt från mat och kultur.',
    15000,
    5000,
    '',
    '2024-04-15 11:40:00',
    1,
    13
  ),
(
    38,
    'hej',
    'hej',
    'heej',
    2000,
    1000,
    '',
    '2024-05-16 10:03:00',
    4,
    2
  );
--
-- Table structure for table `Bids`
--

DROP TABLE IF EXISTS `Bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Bids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auctionId` int NOT NULL,
  `userId` int NOT NULL,
  `amount` int NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Bids_Auctions_id_fk` (`auctionId`),
  KEY `Bids_Users_id_fk` (`userId`),
  CONSTRAINT `Bids_Auctions_id_fk` FOREIGN KEY (`auctionId`) REFERENCES `Auctions` (`id`),
  CONSTRAINT `Bids_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Bids`
--

INSERT INTO `Bids` (`id`, `auctionId`, `userId`, `amount`, `time`)
VALUES (1, 2, 2, 56000, '2024-04-08 11:09:48'),
(2, 2, 2, 57000, '2024-04-08 12:10:29'),
(3, 2, 3, 1000, '2024-04-08 13:11:14'),
(11, 2, 3, 1500, '2024-04-11 11:36:09'),
(12, 2, 3, 2000, '2024-04-11 11:36:21'),
(13, 20, 21, 1000, '2024-04-12 13:39:18'),
(14, 19, 21, 15000, '2024-04-15 09:08:50'),
(15, 35, 21, 20000, '2024-04-15 10:14:17'),
(16, 36, 21, 7000, '2024-04-15 11:31:36'),
(17, 37, 21, 4000, '2024-04-15 11:38:20');
--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `description`)
VALUES (
    1,
    'all inclusive',
    'När du vill slippa rodda med allt själv och få lösningen i dina händer.'
  ),
(2, 'spa', 'Unna dig en avkopplande resa.'),
(
    3,
    'city',
    'Res till jordens mest spännande städer och upplev kultur med puls.'
  ),
(
    4,
    'adventure',
    'Utmana dig själv och följ adrenalinet.'
  );
--
-- Table structure for table `ClosedAuctions`
--

DROP TABLE IF EXISTS `ClosedAuctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ClosedAuctions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auctionId` int NOT NULL,
  `winner` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClosedAuctions_Auctions_id_fk` (`auctionId`),
  KEY `ClosedAuctions_Users_id_fk` (`winner`),
  CONSTRAINT `ClosedAuctions_Auctions_id_fk` FOREIGN KEY (`auctionId`) REFERENCES `Auctions` (`id`),
  CONSTRAINT `ClosedAuctions_Users_id_fk` FOREIGN KEY (`winner`) REFERENCES `Users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 54 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ClosedAuctions`
--

INSERT INTO `ClosedAuctions` (`id`, `auctionId`, `winner`, `amount`)
VALUES (34, 31, NULL, NULL),
(35, 2, 2, 57000),
(36, 34, NULL, NULL),
(37, 21, NULL, NULL),
(38, 35, 21, 20000),
(39, 36, NULL, NULL),
(40, 37, NULL, NULL),
(41, 3, NULL, NULL),
(42, 4, NULL, NULL),
(43, 14, NULL, NULL),
(44, 15, NULL, NULL),
(45, 16, NULL, NULL),
(46, 17, NULL, NULL),
(47, 18, NULL, NULL),
(48, 19, NULL, NULL),
(49, 20, NULL, NULL),
(50, 28, NULL, NULL),
(51, 29, NULL, NULL),
(52, 33, NULL, NULL),
(53, 22, NULL, NULL);
--
-- Table structure for table `Companies`
--

DROP TABLE IF EXISTS `Companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `logo` varchar(1020) DEFAULT 'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
  `about` varchar(1020) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Companies`
--

INSERT INTO `Companies` (`id`, `companyName`, `logo`, `about`)
VALUES (
    1,
    'Suntrip AB',
    'https://seeklogo.com/images/S/SunTrip-logo-DD2B572E4F-seeklogo.com.gif',
    'Vi vet allt och lite till om resor'
  ),
(
    2,
    'Horisont Resebyrå',
    'https://www.logomoose.com/wp-content/uploads/2018/02/1150px-x-5683.png',
    'Med blicken mot horisonten flyger vi dig till ditt nästa äventyr'
  ),
(
    3,
    'Värmeresor AB',
    'https://th.bing.com/th/id/OIP.mSBne6mQDye67u7oW3hJkAHaEL?rs=1&pid=ImgDetMain',
    'En ledande global turistgrupp och verkar över hela världen.'
  ),
(
    4,
    'Utflykts Resor',
    'https://www.creativefabrica.com/wp-content/uploads/2020/02/10/Travel-Logo-Graphics-1-36-580x386.jpg',
    'En ny reseupplevelse för dig'
  ),
(
    12,
    'ivansforetag',
    'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
    NULL
  ),
(
    13,
    'gretasresa',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciFcnRo4sFkh0hnQG-bR0UUxaYxj4ft-0I-WhGtYvjkum2P93',
    NULL
  ),
(
    14,
    'Testlicious AB',
    'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
    NULL
  ),
(
    15,
    '12121',
    'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
    NULL
  );
--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(25) NOT NULL,
  `message` varchar(1020) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 59 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Contacts`
--

INSERT INTO `Contacts` (`id`, `name`, `email`, `tel`, `message`)
VALUES (1, 'emil', 'emil@gmail.com', '0727272727', 'heeej'),
(2, 'Hans', 'hans@gmail.com', '0727272727', 'hejHEJ'),
(3, 'emil', 'kvist@gmai.l.com', '0727272727', '2323'),
(4, 'emmil', 'kvst@gmial.com', '12121212', '22323'),
(5, 'din', 'kvit@gad', '022020', '222323'),
(
    6,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    7,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    8,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(9, 'Emil', 'erer@gma.com', '232323', '232323'),
(
    10,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    11,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    12,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    13,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    14,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    15,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    16,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    17,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    18,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    19,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    20,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    21,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    22,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    23,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    24,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    25,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    26,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    27,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    28,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    29,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    30,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    31,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    32,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    33,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    34,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    35,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    36,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    37,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    38,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    39,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    40,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    41,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    42,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    43,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    44,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    45,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    46,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    47,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    48,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    49,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    50,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    51,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    52,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    53,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    54,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    55,
    'Hana',
    'hana@gmail.com',
    '0760894663',
    'Hana was here.'
  ),
(
    56,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    57,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  ),
(
    58,
    'Elena',
    'elena@gmail.com',
    '0760894684',
    'Elena was here.'
  );
--
-- Table structure for table `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `auctionId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Favorites_pk` (`userId`, `auctionId`),
  KEY `Favorites_Auctions_id_fk` (`auctionId`),
  CONSTRAINT `Favorites_Auctions_id_fk` FOREIGN KEY (`auctionId`) REFERENCES `Auctions` (`id`),
  CONSTRAINT `Favorites_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 46 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Favorites`
--

INSERT INTO `Favorites` (`id`, `userId`, `auctionId`)
VALUES (2, 2, 19),
(3, 4, 20),
(44, 21, 4),
(45, 21, 35);
--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_pk` (`username`),
  KEY `Users_Companies_id_fk` (`company`),
  CONSTRAINT `Users_Companies_id_fk` FOREIGN KEY (`company`) REFERENCES `Companies` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 94 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (
    `id`,
    `username`,
    `password`,
    `role`,
    `name`,
    `company`
  )
VALUES (1, 'admin', 'admin', 'admin', 'Admin', NULL),
(2, 'juliajul', 'qwerty1234', 'buyer', 'Julia', NULL),
(3, 'emilkvist', 'abc', 'buyer', 'Emil', NULL),
(4, 'ivaniva', 'poiuyt1234', 'buyer', 'Ivan', NULL),
(
    5,
    'vanessavane',
    'tyuiop4321',
    'buyer',
    'Vaness',
    NULL
  ),
(
    6,
    'horisont_resebyra@flynow.com',
    'abc123',
    'seller',
    'Göran',
    2
  ),
(
    7,
    'suntrip_monika@moveout.com',
    'parisparis',
    'seller',
    'Monika',
    1
  ),
(
    8,
    'värmeresor.agneta@moveout.com',
    'parislover',
    'seller',
    'Agneta',
    3
  ),
(
    9,
    'utflykts_resor.gunilla@moveout.se',
    'gunilla123',
    'seller',
    'Gunilla',
    4
  ),
(13, 'ivan', '123', 'seller', 'ivana', 1),
(15, 'karl1337', '123', 'buyer', 'Karl', NULL),
(
    16,
    'AdamTheGreatest',
    'abc123',
    'buyer',
    'Adam',
    NULL
  ),
(17, 'julia', '123123', 'buyer', 'julia', NULL),
(21, 'karl9999', '123', 'buyer', 'karl', NULL),
(
    22,
    'gretasresa@hej.com',
    '123',
    'seller',
    'Greta',
    13
  ),
(86, '121212', '121212', 'seller', '121212', 15),
(92, 'TestBuyer', '321abc', 'buyer', 'test', NULL),
(93, 'TestSeller', '321abc', 'seller', 'testSell', 14);
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2024-05-08 10:21:34