CREATE TABLE `390db`.`users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FName` varchar(45) DEFAULT NULL,
  `LName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Validated` tinyint DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Birthday` date DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `Role` varchar(45) NOT NULL,
  `Token` varchar(256) NULL,
  `Resetting` TINYINT NULL,
`ResetToken` VARCHAR(256) NULL,
  PRIMARY KEY (`ID`)
);



CREATE TABLE `390db`.`doctors` (
  `ID` int NOT NULL,
  `License` varchar(45) DEFAULT NULL,
  `patientCount` int, 
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`ID`)
  REFERENCES `390db`.`users` (`ID`));

CREATE TABLE `390db`.`admins` (
  `ID` INT NOT NULL,
  `Type` TINYINT NULL,
   PRIMARY KEY (`ID`),
  FOREIGN KEY (`ID`)
  REFERENCES `390db`.`users` (`ID`));

CREATE TABLE `390db`.`otherusers` (
  `ID` INT NOT NULL,
  `Type` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`ID`)
  REFERENCES `390db`.`users` (`ID`));

CREATE TABLE `390db`.`doctorhours` (
  `StartTime` TIME NULL,
  `EndTime` TIME NULL,
  `Availability` TINYINT NULL,
  `DoctorID` int NOT NULL,
`dayName` varchar(45) not null,
  INDEX `DoctorID_idx` (`DoctorID` ASC),
    FOREIGN KEY (`DoctorID`)
    REFERENCES `390db`.`doctors` (`ID`));
    

CREATE TABLE `390db`.`patients` (
  `ID` INT NOT NULL,
  `DoctorID` INT NOT NULL,
  `HealthInsurance` VARCHAR(45) NULL,
  `Status` VARCHAR(45) NULL,
  `Priority` INT NULL,
`ChatRequested` Boolean not null default 0,
`ChatPermission` Boolean not null default 0,
`NewPatient` BOOLEAN DEFAULT 1,
   `Flagged` BOOLEAN NOT NULL,
     `SymptomRequested` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`ID`), 
 FOREIGN KEY (`DoctorID`)
    REFERENCES `390db`.`doctors` (`ID`));

CREATE TABLE `390db`.`viewed` (
  `PatientID` int NOT NULL,
   `DoctorID` int NOT NULL,
`Timestamp` DATETIME,
  foreign key (`PatientID`)references `390db`.`patients` (`ID`),
  foreign key (`DoctorID`)references `390db`.`doctors` (`ID`)
  
);

CREATE TABLE `390db`.`appointments` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PatientID` INT NOT NULL,
  `DoctorID` INT NOT NULL,
  `Notes` Varchar(500) NOT NULL default 'none',
`startTime` time not null,
`endTime` time not null,
`aptDate` varchar(45) not null,
`dayName` varchar(45) not null,
  `Notification` TINYINT NOT NULL DEFAULT 1,
  `Priority` int NOT NULL,
 FOREIGN KEY (`PatientID`)
    REFERENCES `390db`.`patients` (`ID`),
 FOREIGN KEY (`DoctorID`)
    REFERENCES `390db`.`doctors` (`ID`),
  PRIMARY KEY (`ID`)
    );


CREATE TABLE `390db`.`inforequest` (

  `ID` INT NOT NULL AUTO_INCREMENT,
  `PatientID` INT NOT NULL,
  `DoctorID` INT NOT NULL,
  `Symptom` BOOLEAN NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  `weight` BOOLEAN NOT NULL,
  `age` BOOLEAN NOT NULL,
  `gender` BOOLEAN NOT NULL,
  `sneeze` BOOLEAN NOT NULL,
  `Cough` BOOLEAN NOT NULL,
  `TasteSense` BOOLEAN NOT NULL,
  `Other` VARCHAR(128) NOT NULL,
 FOREIGN KEY (`PatientID`)
    REFERENCES `390db`.`patients` (`ID`),
     FOREIGN KEY (`DoctorID`)
    REFERENCES `390db`.`doctors` (`ID`),
  PRIMARY KEY (`ID`)
    );


CREATE TABLE `390db`.`healthinformation` ( 
`FormID` INT NOT NULL AUTO_INCREMENT,  
  `PatientID` INT NOT NULL,
  `InfoTimestamp` Timestamp,   
  `Weight` DOUBLE,   
  `Temperature` DOUBLE,   
  `Breathing` TINYINT NOT NULL,   
  `Chest_Pain` TINYINT NOT NULL,   
  `Fatigue` TINYINT NOT NULL,   
  `Fever` TINYINT NOT NULL,   
  `Cough` TINYINT NOT NULL,   
  `Smell` TINYINT NOT NULL,   
  `Taste` TINYINT NOT NULL,   
  `Other` Varchar(300),
  `Notification` TINYINT NOT NULL DEFAULT 1,
  `Urgent` int,
  FOREIGN KEY (PatientID) REFERENCES 390db.patients (ID),
   PRIMARY KEY (FormID)
   );

CREATE TABLE `390db`.`contacts` (
  `PatientID1` INT NOT NULL,
  `PatientID2` INT NOT NULL,
 FOREIGN KEY (`PatientID1`)
    REFERENCES `390db`.`patients` (`ID`),
    
 FOREIGN KEY (`PatientID2`)
    REFERENCES `390db`.`patients` (`ID`)
    );

CREATE TABLE 390db.livechat (
  MessageID INT NOT NULL AUTO_INCREMENT,
  PatientID INT NOT NULL,
  DoctorID INT NOT NULL,
  RoomID INT NOT NULL,
  Timestamp TIMESTAMP NOT NULL,
  Message VARCHAR(2048) NOT NULL,
  SenderID INT NOT NULL,
  Seen BOOLEAN NOT NULL,
  FOREIGN KEY (PatientID)
    REFERENCES 390db.patients (ID),
     FOREIGN KEY (DoctorID)
    REFERENCES 390db.doctors (ID),
    PRIMARY KEY(MessageID)
);

CREATE TABLE `390db`.`patientfiles` (
  `patientfiles` MEDIUMBLOB NOT NULL,
  `patientID` int NOT NULL,
  `documentID` INT NOT NULL AUTO_INCREMENT,
  `timesubmitted` TIMESTAMP NOT NULL,
  PRIMARY KEY (`patientID`, `timesubmitted`),
  foreign key (patientID) references 390db.users (ID) on delete cascade,
  UNIQUE INDEX `documentID_UNIQUE` (`documentID` ASC));




INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('1', 'Hussein', 'Hassein', 'a@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4385550148', '1999/1/1', '420 Rue Guy', 'Patient');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('2', 'Frank', 'James', 'f.james@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4385550152', '1985-3-3', '5600 Rue Rodrigue', 'Patient');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('3 ', 'Donald ', 'Wimp ', 'donald@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5145550152', '2005-3-4', '550 Bd St Laurent E', 'Patient');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('4 ', 'Payton', 'Taylor', 'payton@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4385550198', '1923-4-2', '1326 Avenue Maguire', 'Patient');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('5', 'Weirdo', 'Snicks', 'weirdo@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4385550157', '1985-5-3', '1075 Rue Richelieu', 'Patient');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('6', 'Matthew', 'James', 'matthew@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5145550153', '1997-4-3', '500 Rue Léonard', 'Doctor');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('7', 'James', 'Trump', 'james@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5145550199', '1999-9-9', '1292 Jarry E', 'Doctor');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('8', 'Trey', 'Rey', 'trey@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5149550136', '1964-4-3', '2900 Boulevard Edouard-Montpetit', 'Doctor');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('9', 'Patrick', 'Deadi', 'patent@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5146324578', '1987-4-2', '5095 Rue Fabre', 'Doctor');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('10', 'Wayo', 'Weyo', 'wayo@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4387856333', '1990-4-3', 'Rang de Équerre', 'Doctor');

INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('11', 'Addagio', 'Bratok', 'addagio@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5142121212', '1982-03-2', '4600 Bd Industriel', 'Admin');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('12', 'Travis', 'Scott', 'travis@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5143131313', '1998-1-20', '2127 Rue Sainte-Catherine Ouest', 'Admin');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('13', 'Prey', 'Tale', 'prey@yahoo.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '5144141414', '1985-1-1', '	17 Rue Sainte-Catherine Ouest', 'Immigration Officer');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('14', 'Dey', 'Insa', 'dey@outlook.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4385151515', '1932-1-1', '3916 Avenue Coloniale', 'Immigration Officer');
INSERT INTO `390db`.`users` (`ID`, `FName`, `LName`, `Email`, `Password`, `Validated`, `Phone`, `Birthday`, `Address`, `Role`) VALUES ('15', 'Max', 'Gambino', 'mag@gmail.com', '$2b$10$8V3DcGFpSlqb93Ykmhn5B.K91HjOQWhylC/sfmW243co5JwPEPgZ.', '1', '4385151515', '1932-1-1', '690 Boulevard René Lévesque East', 'Immigration Officer');


INSERT INTO `390db`.`otherusers` (`ID`, `Type`) VALUES ('13', 'Immigration Officer');
INSERT INTO `390db`.`otherusers` (`ID`, `Type`) VALUES ('14', 'Immigration Officer');
INSERT INTO `390db`.`otherusers` (`ID`, `Type`) VALUES ('15', 'Health Offical');

INSERT INTO `390db`.`admins` (`ID`, `Type`) VALUES ('12', '1');
INSERT INTO `390db`.`admins` (`ID`, `Type`) VALUES ('11', '0');


INSERT INTO `390db`.`doctors` (`ID`, `License`,`patientCount`) VALUES ('6', 'G23fA4',1);
INSERT INTO `390db`.`doctors` (`ID`, `License`, `patientCount`) VALUES ('7', 'G2231A',1);
INSERT INTO `390db`.`doctors` (`ID`, `License`,`patientCount`) VALUES ('8', 'ADAD02',1);
INSERT INTO `390db`.`doctors` (`ID`, `License`,`patientCount`) VALUES ('9', 'SJAD234',1);
INSERT INTO `390db`.`doctors` (`ID`, `License`,`patientCount`) VALUES ('10', 'ADWK2u',1);


INSERT INTO `390db`.`patients` (`ID`, `DoctorID`, `HealthInsurance`, `Status`, `Priority`, `Flagged`, `SymptomRequested`) VALUES ('2', '7', 'GEYT341', 'Healthy', '0', '0', '0');
INSERT INTO `390db`.`patients` (`ID`, `DoctorID`, `HealthInsurance`, `Status`, `Priority`, `Flagged`, `SymptomRequested`) VALUES ('3', '8', 'JIAD231', 'Infected', '2', '1', '0');
INSERT INTO `390db`.`patients` (`ID`, `DoctorID`, `HealthInsurance`, `Status`, `Priority`, `Flagged`, `SymptomRequested`) VALUES ('4', '9', 'DMWA2410', 'Isolated', '0', '1', '0');
INSERT INTO `390db`.`patients` (`ID`, `DoctorID`, `HealthInsurance`, `Status`, `Priority`, `Flagged`, `SymptomRequested`) VALUES ('5', '10', 'FJWUA234', 'Infected', '1', '1', '0');
INSERT INTO `390db`.`patients` (`ID`, `DoctorID`, `HealthInsurance`, `Status`, `Priority`, `Flagged`, `SymptomRequested`) VALUES ('1', '6', '23ADWA41', 'Healthy', '0', '0', '0');


INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('8:00', '8:30', '6', '1', 'Wed');
INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('9:00', '9:30', '6', '0', 'Wed');
INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('9:00', '9:30', '6', '1', 'Tue');
INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('11:30', '11:30', '8', '0', 'Wed');
INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('15:00', '15:30', '9', '1', 'Mon');
INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('16:00', '16:30', '10', '1', 'Wed');
INSERT INTO `390db`.`doctorhours` (`StartTime`, `EndTime`, `DoctorID`, `Availability`, dayName) VALUES ('10:00', '11:00', '7', '1', 'Tue');



INSERT INTO `390db`.`contacts` (`PatientID1`, `PatientID2`) VALUES ('4', '2');
INSERT INTO `390db`.`contacts` (`PatientID1`, `PatientID2`) VALUES ('2', '1');
INSERT INTO `390db`.`contacts` (`PatientID1`, `PatientID2`) VALUES ('5', '3');
INSERT INTO `390db`.`contacts` (`PatientID1`, `PatientID2`) VALUES ('2', '4');
INSERT INTO `390db`.`contacts` (`PatientID1`, `PatientID2`) VALUES ('4', '2');


INSERT INTO `390db`.`healthinformation` (`PatientID`,  `InfoTimestamp`, `Weight`, `Temperature`, `Breathing`, `Chest_Pain`, `Fatigue`, `Fever`, `Cough`, `Smell`, `Taste`, `Other`, `Urgent`) VALUES ('1',  '2022-2-1', 25, 65, 1, 3, 2, 3, 3, 2, 1, 'nothing',1);
INSERT INTO `390db`.`healthinformation` (`PatientID`,  `InfoTimestamp`, `Weight`, `Temperature`, `Breathing`, `Chest_Pain`, `Fatigue`, `Fever`, `Cough`, `Smell`, `Taste`, `Other`, `Urgent`) VALUES ('2',   '2022-1-1', 25, 65, 1, 3, 2, 3, 3, 2, 1, 'headache',0);
INSERT INTO `390db`.`healthinformation` (`PatientID`,`InfoTimestamp`, `Weight`, `Temperature`, `Breathing`, `Chest_Pain`, `Fatigue`, `Fever`, `Cough`, `Smell`, `Taste`, `Other`, `Urgent`) VALUES ('3',   '2022-4-1', 25, 65, 1, 3, 2, 3, 3, 2, 1, 'nausea',0);
INSERT INTO `390db`.`healthinformation` (`PatientID`,  `InfoTimestamp`, `Weight`, `Temperature`, `Breathing`, `Chest_Pain`, `Fatigue`, `Fever`, `Cough`, `Smell`, `Taste`, `Other`, `Urgent`) VALUES ('4',    '2021-1-1', 25, 65, 1, 3, 2, 3, 3, 2, 1, 'cannot sleep',0);
INSERT INTO `390db`.`healthinformation` (`PatientID`,  `InfoTimestamp`, `Weight`, `Temperature`, `Breathing`, `Chest_Pain`, `Fatigue`, `Fever`, `Cough`, `Smell`, `Taste`, `Other`, `Urgent`) VALUES ('5',   '2022-3-1', 25, 65, 1, 3, 2, 3, 3, 2, 1, 'migraine',0);



INSERT INTO `390db`.`inforequest` (`ID`, `PatientID`, `DoctorID`, `Symptom`, `Timestamp`, `weight`, `age`, `gender`, `sneeze`, `Cough`, `TasteSense`, `Other`) VALUES ('1', '1', '6', '1', '2022-1-1', '1', '1', '1', '1', '1', '1', 'hearing');
INSERT INTO `390db`.`inforequest` (`ID`, `PatientID`, `DoctorID`, `Symptom`, `Timestamp`, `weight`, `age`, `gender`, `sneeze`, `Cough`, `TasteSense`, `Other`) VALUES ('2', '2', '7', '1', '2022-3-5', '1', '0', '0', '1', '1', '1', 'headaches');
INSERT INTO `390db`.`inforequest` (`ID`, `PatientID`, `DoctorID`, `Symptom`, `Timestamp`, `weight`, `age`, `gender`, `sneeze`, `Cough`, `TasteSense`, `Other`) VALUES ('3', '3', '8', '1', '2022-12-12', '1', '1', '1', '1', '0', '0', 'none');
INSERT INTO `390db`.`inforequest` (`ID`, `PatientID`, `DoctorID`, `Symptom`, `Timestamp`, `weight`, `age`, `gender`, `sneeze`, `Cough`, `TasteSense`, `Other`) VALUES ('4', '4', '9', '1', '2022-1-5', '0', '1', '1', '1', '1', '1', 'none');
INSERT INTO `390db`.`inforequest` (`ID`, `PatientID`, `DoctorID`, `Symptom`, `Timestamp`, `weight`, `age`, `gender`, `sneeze`, `Cough`, `TasteSense`, `Other`) VALUES ('5', '5', '10', '1', '2022-7-2', '0', '1', '0', '0', '1', '1', 'fever');


INSERT INTO `390db`.`viewed` (`PatientID`, `DoctorID`, `Timestamp`) VALUES ('1', '6', '2022-4-3');
INSERT INTO `390db`.`viewed` (`PatientID`, `DoctorID`, `Timestamp`) VALUES ('2', '7', '2022-7-12');
INSERT INTO `390db`.`viewed` (`PatientID`, `DoctorID`, `Timestamp`) VALUES ('3', '8', '2022-1-5');
INSERT INTO `390db`.`viewed` (`PatientID`, `DoctorID`, `Timestamp`) VALUES ('4', '9', '2022-8-15');
INSERT INTO `390db`.`viewed` (`PatientID`, `DoctorID`, `Timestamp`) VALUES ('5', '10', '2022-2-3');

INSERT INTO `390db`.`appointments` (`ID`, `PatientID`, `DoctorID`, `Notes`, `startTime` , `endTime`, `Priority`, `dayName`, aptDate) VALUES ('1', '1', '6', 'abnormal stool', '06:00:00','06:30:00', '2', 'Tue', 'Mar 17 2022');
INSERT INTO `390db`.`appointments` (`ID`, `PatientID`, `DoctorID`, `Notes`, `startTime` , `endTime`, `Priority`,`dayName`, aptDate) VALUES ('2', '2', '7', 'none', '15:00:00','15:30:00', '2', 'Wed', 'Mar 18 2022');
INSERT INTO `390db`.`appointments` (`ID`, `PatientID`, `DoctorID`, `Notes`, `startTime` , `endTime`,  `Priority`,`dayName`, aptDate) VALUES ('3', '3', '8', 'examine symptoms', '19:00:00','19:30:00', '3', 'Mon', 'Mar 16 2022');
INSERT INTO `390db`.`appointments` (`ID`, `PatientID`, `DoctorID`, `Notes`,`startTime` , `endTime`,  `Priority`, `dayName`, aptDate) VALUES ('4', '4', '9', 'none', '09:00:00','09:30:00', '1', 'Mon', 'Mar 16 2022');
INSERT INTO `390db`.`appointments` (`ID`, `PatientID`, `DoctorID`, `Notes`,`startTime` , `endTime`,  `Priority`, `dayName`, aptDate) VALUES ('5', '5', '10', 'new patient', '13:00:00','13:30:00', '0', 'Mon', 'Mar 16 2022');
