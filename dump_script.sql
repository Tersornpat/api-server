-- database name: hospital_db

-- hospital_db.Department definition

CREATE TABLE `Department` (
  `Department_ID` int NOT NULL,
  `Department_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Department_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- hospital_db.Employee definition

CREATE TABLE `Employee` (
  `Employee_ID` int NOT NULL,
  `Employee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Employee_Lname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Employee_sex` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Employee_tel1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Employee_tel2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Employee_SP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Position_ID` int NOT NULL,
  `Department_ID` int NOT NULL,
  `Employee_Lang` json DEFAULT NULL,
  `Employee_Image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- hospital_db.`Position` definition

CREATE TABLE `Position` (
  `Position_ID` int NOT NULL,
  `Position_Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Position_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- hospital_db.Myuser definition

CREATE TABLE `Myuser` (
  `Myuser_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int DEFAULT NULL,
  `Myuser_Username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Myuser_Password` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Myuser_Role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Myuser_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `Myuser_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee` (`Employee_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- hospital_db.Patient definition

CREATE TABLE `Patient` (
  `Patient_Sex` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_Tel1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_Tel2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_ID` int NOT NULL,
  `Patient_NRelative` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_lname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_BD` date DEFAULT NULL,
  `Patient_Allergic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_Disease` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_TelRelative` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_SignDate` date DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `BG` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_National` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_Citizen` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Patient_Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Patient_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `Patient_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- hospital_db.Report definition

CREATE TABLE `Report` (
  `Report_ID` int NOT NULL AUTO_INCREMENT,
  `Patient_ID` int DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `Report_Date` datetime DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `Pressure` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `BPM` int DEFAULT NULL,
  `Temp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Symptom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'waited',
  PRIMARY KEY (`Report_ID`),
  KEY `Patient_ID` (`Patient_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `Report_ibfk_1` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient` (`Patient_ID`),
  CONSTRAINT `Report_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- hospital_db.Appoint definition

CREATE TABLE `Appoint` (
  `Appoint_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int DEFAULT NULL,
  `Patient_ID` int DEFAULT NULL,
  `Report_ID` int DEFAULT NULL,
  PRIMARY KEY (`Appoint_ID`),
  KEY `Employee_ID` (`Employee_ID`),
  KEY `Patient_ID` (`Patient_ID`),
  KEY `Report_ID` (`Report_ID`),
  CONSTRAINT `Appoint_ibfk_1` FOREIGN KEY (`Patient_ID`) REFERENCES `Patient` (`Patient_ID`),
  CONSTRAINT `Appoint_ibfk_2` FOREIGN KEY (`Report_ID`) REFERENCES `Report` (`Report_ID`),
  CONSTRAINT `Appoint_ibfk_3` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee` (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- insert data to database

-- INSERT INTO Department (Department_ID, Department_name) VALUES(0, '');
-- INSERT INTO Employee (Employee_ID, Employee_name, Employee_Lname, Employee_sex, Employee_tel1, Employee_tel2, Employee_SP, Position_ID, Department_ID, Employee_Lang, Employee_Image) VALUES(0, '', '', '', '', '', '', 0, 0, ?, '');
-- INSERT INTO Myuser (Employee_ID, Myuser_Username, Myuser_Password, Myuser_Role) VALUES(0, '', '', '');
-- INSERT INTO Patient (Patient_Sex, Patient_Tel1, Patient_Tel2, Patient_Address, Patient_ID, Patient_NRelative, Patient_name, Patient_lname, Patient_BD, Patient_Allergic, Patient_Disease, Patient_TelRelative, Patient_SignDate, Employee_ID, BG, Patient_National, Patient_Citizen, Patient_Email) VALUES('', '', '', '', 0, '', '', '', '', '', '', '', '', 0, '', '', '', '');
-- INSERT INTO Position (Position_ID, Position_Name) VALUES(0, '');
-- INSERT INTO Report (Patient_ID, Employee_ID, Report_Date, weight, height, Pressure, BPM, Temp, Symptom, Status) VALUES(0, 0, '', 0, 0, '', 0, '', '', 'waited');
-- INSERT INTO Appoint (Employee_ID, Patient_ID, Report_ID) VALUES(0, 0, 0);

INSERT INTO Department (Department_ID,Department_name) VALUES
	 (1,'Emergency'),
	 (2,'TWO'),
	 (3,'Tree'),
	 (4,'four'),
	 (5,'fifth');

INSERT INTO Employee (Employee_ID,Employee_name,Employee_Lname,Employee_sex,Employee_tel1,Employee_tel2,Employee_SP,Position_ID,Department_ID,Employee_Lang,Employee_Image) VALUES
	 (1,'Morarisa','Farndera','M','0354789541','0254891365','Surgeon',1,1,'["Thai", "English"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (2,'Morarisa','Farndera','M','0354789541','0254891365','Janitor',2,2,'["Thai"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (3,'Lalisa','Dokmaiban','F','0354789541','0254891365','Domyasalob',2,1,'["Thai", "English"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (4,'Porapipat','Manphajon','M','0354789541','0254891365','Emergency',3,2,'["Thai"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (5,'Porapipat','Manphajon','M','0354789541','0254891365','Emergency',1,1,'["Thai", "English"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (6,'Mahou','maliwan','F','03254789461','0254891365','Emergency',2,6,'["Thai"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (7,'Tersornpat','Amt','W','12132112132','1111111111','Doctor',2,1,'["Thai", "Chinese", "Japanese"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (8,'Sornpat','Amt','W','12132112132','1111111111','Dentist',3,1,'["Thai", "Chinese", "Japanese"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png'),
	 (12,'Sornpat','Amt','W','12132112132','1111111111','Dentist',3,1,'["Thai", "Chinese", "Japanese"]','https://media.discordapp.net/attachments/1091746532203700295/1112447870679912528/portrait-of-handsome-smiling-young-man-with-crossed-arms.png');

INSERT INTO Position (Position_ID,Position_Name) VALUES
	 (1,'Big Boss'),
	 (2,'Doctor'),
	 (3,'Nurse'),
	 (4,'Janitor'),
	 (5,'Doctor-Helper');

INSERT INTO Myuser (Employee_ID,Myuser_Username,Myuser_Password,Myuser_Role) VALUES
	 (1,'dew','$2b$10$dULcMn5uN0aoymK/fu6cfeqFVtbMeQnNvFCnYaMaZvCgaxy5Njn9y','admin');


INSERT INTO Patient (Patient_Sex,Patient_Tel1,Patient_Tel2,Patient_Address,Patient_ID,Patient_NRelative,Patient_name,Patient_lname,Patient_BD,Patient_Allergic,Patient_Disease,Patient_TelRelative,Patient_SignDate,Employee_ID,BG,Patient_National,Patient_Citizen,Patient_Email) VALUES
	 ('ชาย','0897956077',NULL,NULL,63050159,NULL,'phongsakorn','kawhaolai',NULL,NULL,NULL,NULL,NULL,NULL,'A','ไทย','1739901980463','63050159@kmitl.ac.th');


INSERT INTO Report (Patient_ID,Employee_ID,Report_Date,weight,height,Pressure,BPM,Temp,Symptom,Status) VALUES
	 (63050159,2,'2023-07-01 17:00:00',52.0,173.0,'120.01',62,'36.5','ปวดหัว','waited');

INSERT INTO Appoint (Employee_ID,Patient_ID,Report_ID) VALUES
	 (2,63050159,1);


