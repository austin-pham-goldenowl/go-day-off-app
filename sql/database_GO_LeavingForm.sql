-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- DROP DATABASE "leavingForm" -----------------------------
DROP DATABASE IF EXISTS `leavingForm`;
-- ---------------------------------------------------------


-- CREATE DATABASE "leavingForm" ---------------------------
CREATE DATABASE `leavingForm` CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `leavingForm`;
-- ---------------------------------------------------------


-- CREATE TABLE "absenceTypes" ---------------------------------
CREATE TABLE `absenceTypes` ( 
	`fId` Int( 11 ) NOT NULL,
	`fAbsenceTypeName` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY ( `fId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "leaveLetters" ---------------------------------
CREATE TABLE `leaveLetters` ( 
	`fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fRdt` DateTime NOT NULL,
	`fFromDT` DateTime NOT NULL,
	`fToDT` DateTime NOT NULL,
	`fAbsenceType` Int( 11 ) NOT NULL,
	`fSubstituteId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`fUserId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`users_fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`users_fId1` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`absenceTypes_fId` Int( 11 ) NULL,
	`approver_fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`fStatus` Int( 11 ) NOT NULL DEFAULT 1,
	`fReason` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`fApprover` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fFromOpt` Enum( 'allday', 'morning', 'afternoon' ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'allday',
	`fToOpt` Enum( 'allday', 'morning' ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'allday',
	PRIMARY KEY ( `fId` ),
	CONSTRAINT `fId_UNIQUE` UNIQUE( `fId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "positions" ------------------------------------
CREATE TABLE `positions` ( 
	`fId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fPosName` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY ( `fId` ),
	CONSTRAINT `fId_UNIQUE` UNIQUE( `fId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "rejectedLetterDetail" -------------------------
CREATE TABLE `rejectedLetterDetail` ( 
	`fLetterId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fReason` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fRejectType` Int( 11 ) NOT NULL,
	`leaveLetters_fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	PRIMARY KEY ( `fLetterId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "teams" ----------------------------------------
CREATE TABLE `teams` ( 
	`fId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fTeamName` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fTeamLead` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`users_fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	PRIMARY KEY ( `fId` ),
	CONSTRAINT `fId_UNIQUE` UNIQUE( `fId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "userPermission" -------------------------------
CREATE TABLE `userPermission` ( 
	`fId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fUserType` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY ( `fId` ),
	CONSTRAINT `fId_UNIQUE` UNIQUE( `fId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "userRefToken" ---------------------------------
CREATE TABLE `userRefToken` ( 
	`fUserId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fRefToken` VarChar( 80 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fRdt` DateTime NOT NULL,
	`users_fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	PRIMARY KEY ( `fUserId` ),
	CONSTRAINT `fUserId_UNIQUE` UNIQUE( `fUserId` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "users" ----------------------------------------
CREATE TABLE `users` ( 
	`fId` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fFirstName` VarChar( 30 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fLastName` VarChar( 30 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fPosition` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fPhone` VarChar( 10 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fTeamId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`fTypeId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fEmail` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fGender` Int( 11 ) NOT NULL DEFAULT 3,
	`fPassword` VarChar( 64 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`fUsername` VarChar( 45 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	`positions_fId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`userPermission_fId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`teams_fId` VarChar( 5 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	PRIMARY KEY ( `fId` ),
	CONSTRAINT `fEmail` UNIQUE( `fEmail` ),
	CONSTRAINT `fId_UNIQUE` UNIQUE( `fId` ),
	CONSTRAINT `fUsername` UNIQUE( `fUsername` ) )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "configs" --------------------------------------
CREATE TABLE `configs` ( 
	`fEmail` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	`fPassword` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'password',
	`fTotalOffDaysPerYear` TinyInt( 255 ) UNSIGNED NULL DEFAULT 15 )
CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- Dump data of "absenceTypes" -----------------------------
INSERT INTO `absenceTypes`(`fId`,`fAbsenceTypeName`) VALUES ( '1', 'Việc riêng' );
INSERT INTO `absenceTypes`(`fId`,`fAbsenceTypeName`) VALUES ( '2', 'Nghỉ phép năm' );
INSERT INTO `absenceTypes`(`fId`,`fAbsenceTypeName`) VALUES ( '3', 'Nghỉ ốm' );
INSERT INTO `absenceTypes`(`fId`,`fAbsenceTypeName`) VALUES ( '4', 'Nghỉ chế độ' );
-- ---------------------------------------------------------


-- Dump data of "leaveLetters" -----------------------------
INSERT INTO `leaveLetters`(`fId`,`fRdt`,`fFromDT`,`fToDT`,`fAbsenceType`,`fSubstituteId`,`fUserId`,`users_fId`,`users_fId1`,`absenceTypes_fId`,`approver_fId`,`fStatus`,`fReason`,`fApprover`,`fFromOpt`,`fToOpt`) VALUES ( 'mOpjmZ3ANs', '2019-03-15 02:44:27', '2019-03-10 16:29:56', '2019-03-17 16:29:56', '1', 'i53FItHeMK', 'eKmuZqYzzm', 'eKmuZqYzzm', 'eKmuZqYzzm', '1', 'H8UIAdsy7T', '2', NULL, 'H8UIAdsy7T', 'allday', 'allday' );
INSERT INTO `leaveLetters`(`fId`,`fRdt`,`fFromDT`,`fToDT`,`fAbsenceType`,`fSubstituteId`,`fUserId`,`users_fId`,`users_fId1`,`absenceTypes_fId`,`approver_fId`,`fStatus`,`fReason`,`fApprover`,`fFromOpt`,`fToOpt`) VALUES ( 'NSX1R13Me3', '2019-03-15 02:44:02', '2019-03-10 16:29:56', '2019-03-17 16:29:56', '1', 'i53FItHeMK', 'eKmuZqYzzm', 'eKmuZqYzzm', 'eKmuZqYzzm', '1', 'H8UIAdsy7T', '2', NULL, 'H8UIAdsy7T', 'allday', 'allday' );
INSERT INTO `leaveLetters`(`fId`,`fRdt`,`fFromDT`,`fToDT`,`fAbsenceType`,`fSubstituteId`,`fUserId`,`users_fId`,`users_fId1`,`absenceTypes_fId`,`approver_fId`,`fStatus`,`fReason`,`fApprover`,`fFromOpt`,`fToOpt`) VALUES ( 'QH7h4SQDXn', '2019-03-15 02:44:31', '2019-03-10 16:29:56', '2019-03-17 16:29:56', '1', 'i53FItHeMK', 'eKmuZqYzzm', 'eKmuZqYzzm', 'eKmuZqYzzm', '1', 'H8UIAdsy7T', '2', NULL, 'H8UIAdsy7T', 'allday', 'allday' );
INSERT INTO `leaveLetters`(`fId`,`fRdt`,`fFromDT`,`fToDT`,`fAbsenceType`,`fSubstituteId`,`fUserId`,`users_fId`,`users_fId1`,`absenceTypes_fId`,`approver_fId`,`fStatus`,`fReason`,`fApprover`,`fFromOpt`,`fToOpt`) VALUES ( 'zaeiFTica8', '2019-03-15 02:44:17', '2019-03-10 16:29:56', '2019-03-17 16:29:56', '1', 'i53FItHeMK', 'eKmuZqYzzm', 'eKmuZqYzzm', 'eKmuZqYzzm', '1', 'H8UIAdsy7T', '2', NULL, 'H8UIAdsy7T', 'allday', 'allday' );
-- ---------------------------------------------------------


-- Dump data of "positions" --------------------------------
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( '1qRly', 'Accountant' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( '8mCqq', 'CTO' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'B4QIq', 'Tech Lead' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'cpvd7', 'Intern/Fresher' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'hGKx5', 'COO' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'ir0gE', 'Team Leader' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'JVh4R', 'Business Analyst (BA)' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'Kebva', 'Digital Marketer' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'mXLNt', 'Project Assistant (PA)' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'MYPyH', 'Software Tester' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'psS14', 'Human Resouces (HR)' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 's8l4h', 'Designer' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'Sz0d1', 'CEO' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'U4d4k', 'Software Engineer (SE)' );
INSERT INTO `positions`(`fId`,`fPosName`) VALUES ( 'wHK7p', 'Project Manager (PM)' );
-- ---------------------------------------------------------


-- Dump data of "rejectedLetterDetail" ---------------------
INSERT INTO `rejectedLetterDetail`(`fLetterId`,`fReason`,`fRejectType`,`leaveLetters_fId`) VALUES ( 'mLLrBQpcwZ', 'Đi ăn hỏi', '0', NULL );
-- ---------------------------------------------------------


-- Dump data of "teams" ------------------------------------
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( '1LwZq', 'PHP', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( '4TCgb', 'Ruby/Ruby on Rails', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( '5eMvD', 'Design', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( 'A91fa', 'Khác', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( 'FfI2V', 'Javascript', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( 'G81cf', 'Leaders', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( 'Gg6sG', 'QA', 'MytsQhUPQG', NULL );
INSERT INTO `teams`(`fId`,`fTeamName`,`fTeamLead`,`users_fId`) VALUES ( 'kTW7B', 'PA', 'MytsQhUPQG', NULL );
-- ---------------------------------------------------------


-- Dump data of "userPermission" ---------------------------
INSERT INTO `userPermission`(`fId`,`fUserType`) VALUES ( '3sVfP', 'Personnel' );
INSERT INTO `userPermission`(`fId`,`fUserType`) VALUES ( 'NH6Bs', 'HR' );
-- ---------------------------------------------------------


-- Dump data of "userRefToken" -----------------------------
-- ---------------------------------------------------------


-- Dump data of "users" ------------------------------------
INSERT INTO `users`(`fId`,`fFirstName`,`fLastName`,`fPosition`,`fPhone`,`fTeamId`,`fTypeId`,`fEmail`,`fGender`,`fPassword`,`fUsername`,`positions_fId`,`userPermission_fId`,`teams_fId`) VALUES ( 'eKmuZqYzzm', 'Nolan', 'Christopher', 'B4QIq', '0123456789', 'A91fa', 'NH6Bs', 'abc@gojs.com', '3', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'hr1', 'B4QIq', '3sVfP', 'A91fa' );
INSERT INTO `users`(`fId`,`fFirstName`,`fLastName`,`fPosition`,`fPhone`,`fTeamId`,`fTypeId`,`fEmail`,`fGender`,`fPassword`,`fUsername`,`positions_fId`,`userPermission_fId`,`teams_fId`) VALUES ( 'H8UIAdsy7T', 'Adena', 'Justin', 'mXLNt', '0778329121', '1LwZq', 'NH6Bs', 'nulla.Integer@Aliquam.net', '3', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'hr', NULL, NULL, NULL );
INSERT INTO `users`(`fId`,`fFirstName`,`fLastName`,`fPosition`,`fPhone`,`fTeamId`,`fTypeId`,`fEmail`,`fGender`,`fPassword`,`fUsername`,`positions_fId`,`userPermission_fId`,`teams_fId`) VALUES ( 'i53FItHeMK', 'Daphne', 'Zachery', 'U4d4k', '0157694180', '4TCgb', '3sVfP', 'augue.Sed.molestie@congueInscelerisque.org', '1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'user', NULL, NULL, NULL );
-- ---------------------------------------------------------


-- Dump data of "configs" ----------------------------------
-- ---------------------------------------------------------


-- CREATE INDEX "fk_leaveLetters_absenceTypes1_idx" ------------
CREATE INDEX `fk_leaveLetters_absenceTypes1_idx` USING BTREE ON `leaveLetters`( `absenceTypes_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_leaveLetters_users1_idx" -------------------
CREATE INDEX `fk_leaveLetters_users1_idx` USING BTREE ON `leaveLetters`( `users_fId1` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_leaveLetters_users2" -----------------------
CREATE INDEX `fk_leaveLetters_users2` USING BTREE ON `leaveLetters`( `approver_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_leaveLetters_users_idx" --------------------
CREATE INDEX `fk_leaveLetters_users_idx` USING BTREE ON `leaveLetters`( `users_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_rejectedLetterDetail_leaveLetters1_idx" ----
CREATE INDEX `fk_rejectedLetterDetail_leaveLetters1_idx` USING BTREE ON `rejectedLetterDetail`( `leaveLetters_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_teams_users1_idx" --------------------------
CREATE INDEX `fk_teams_users1_idx` USING BTREE ON `teams`( `users_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_userRefToken_users1_idx" -------------------
CREATE INDEX `fk_userRefToken_users1_idx` USING BTREE ON `userRefToken`( `users_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_users_positions1_idx" ----------------------
CREATE INDEX `fk_users_positions1_idx` USING BTREE ON `users`( `positions_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_users_teams1_idx" --------------------------
CREATE INDEX `fk_users_teams1_idx` USING BTREE ON `users`( `teams_fId` );
-- -------------------------------------------------------------


-- CREATE INDEX "fk_users_userPermission1_idx" -----------------
CREATE INDEX `fk_users_userPermission1_idx` USING BTREE ON `users`( `userPermission_fId` );
-- -------------------------------------------------------------


-- CREATE LINK "fk_leaveLetters_absenceTypes1" -----------------
ALTER TABLE `leaveLetters`
	ADD CONSTRAINT `fk_leaveLetters_absenceTypes1` FOREIGN KEY ( `absenceTypes_fId` )
	REFERENCES `absenceTypes`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_leaveLetters_users" -------------------------
ALTER TABLE `leaveLetters`
	ADD CONSTRAINT `fk_leaveLetters_users` FOREIGN KEY ( `users_fId` )
	REFERENCES `users`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_leaveLetters_users1" ------------------------
ALTER TABLE `leaveLetters`
	ADD CONSTRAINT `fk_leaveLetters_users1` FOREIGN KEY ( `users_fId1` )
	REFERENCES `users`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_leaveLetters_users2" ------------------------
ALTER TABLE `leaveLetters`
	ADD CONSTRAINT `fk_leaveLetters_users2` FOREIGN KEY ( `approver_fId` )
	REFERENCES `users`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_rejectedLetterDetail_leaveLetters1" ---------
ALTER TABLE `rejectedLetterDetail`
	ADD CONSTRAINT `fk_rejectedLetterDetail_leaveLetters1` FOREIGN KEY ( `leaveLetters_fId` )
	REFERENCES `leaveLetters`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_teams_users1" -------------------------------
ALTER TABLE `teams`
	ADD CONSTRAINT `fk_teams_users1` FOREIGN KEY ( `users_fId` )
	REFERENCES `users`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_userRefToken_users1" ------------------------
ALTER TABLE `userRefToken`
	ADD CONSTRAINT `fk_userRefToken_users1` FOREIGN KEY ( `users_fId` )
	REFERENCES `users`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_users_positions1" ---------------------------
ALTER TABLE `users`
	ADD CONSTRAINT `fk_users_positions1` FOREIGN KEY ( `positions_fId` )
	REFERENCES `positions`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_users_teams1" -------------------------------
ALTER TABLE `users`
	ADD CONSTRAINT `fk_users_teams1` FOREIGN KEY ( `teams_fId` )
	REFERENCES `teams`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "fk_users_userPermission1" ----------------------
ALTER TABLE `users`
	ADD CONSTRAINT `fk_users_userPermission1` FOREIGN KEY ( `userPermission_fId` )
	REFERENCES `userPermission`( `fId` )
	ON DELETE No Action
	ON UPDATE No Action;
-- -------------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


