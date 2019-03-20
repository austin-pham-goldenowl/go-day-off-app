DROP DATABASE IF EXISTS `leavingForm`;
CREATE DATABASE `leavingForm` CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `leavingForm`;

create table absenceTypes
(
  fId              int         not null
    primary key,
  fAbsenceTypeName varchar(45) not null
);

INSERT INTO leavingForm.absenceTypes (fId, fAbsenceTypeName) VALUES (1, 'Việc riêng');
INSERT INTO leavingForm.absenceTypes (fId, fAbsenceTypeName) VALUES (2, 'Nghỉ phép năm');
INSERT INTO leavingForm.absenceTypes (fId, fAbsenceTypeName) VALUES (3, 'Nghỉ ốm');
INSERT INTO leavingForm.absenceTypes (fId, fAbsenceTypeName) VALUES (4, 'Nghỉ chế độ');
create table leaveLetters
(
  fId              varchar(10)                                              not null,
  fRdt             datetime                                                 not null,
  fFromDT          datetime                                                 not null,
  fToDT            datetime                                                 not null,
  fAbsenceType     int                                                      not null,
  fSubstituteId    varchar(10)                                              null,
  fUserId          varchar(10)                                              not null,
  users_fId        varchar(10)                                              null,
  users_fId1       varchar(10)                                              null,
  absenceTypes_fId int                                                      null,
  approver_fId     varchar(10)                                              null,
  fStatus          int                                     default 1        not null,
  fReason          varchar(255)                                             null,
  fApprover        varchar(10)                                              not null,
  fFromOpt         enum ('allday', 'morning', 'afternoon') default 'allday' not null,
  fToOpt           enum ('allday', 'morning')              default 'allday' not null,
  constraint fId_UNIQUE
    unique (fId),
  constraint fk_leaveLetters_absenceTypes1
    foreign key (absenceTypes_fId) references absenceTypes (fId),
  constraint fk_leaveLetters_users
    foreign key (users_fId) references users (fId),
  constraint fk_leaveLetters_users1
    foreign key (users_fId1) references users (fId),
  constraint fk_leaveLetters_users2
    foreign key (approver_fId) references users (fId)
);

create index fk_leaveLetters_absenceTypes1_idx
  on leaveLetters (absenceTypes_fId);

create index fk_leaveLetters_users1_idx
  on leaveLetters (users_fId1);

create index fk_leaveLetters_users_idx
  on leaveLetters (users_fId);

alter table leaveLetters
  add primary key (fId);

INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('cwwwZB8JOQ', '2019-03-19 04:29:14', '2019-04-01 16:29:56', '2019-04-12 16:29:56', 1, 'i53FItHeMK', 'H8UIAdsy7T', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'morning', 'morning');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('HIObAeYUgj', '2019-03-18 08:24:09', '2019-02-10 16:29:56', '2019-02-17 16:29:56', 1, 'dxujR3BB4d', 'eKmuZqYzzm', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'allday', 'allday');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('mCT0zX6vyf', '2019-03-19 04:29:41', '2019-02-01 16:29:56', '2019-02-12 16:29:56', 1, 'i53FItHeMK', 'H8UIAdsy7T', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'allday', 'morning');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('QuNQ8qKQ6W', '2019-03-19 04:29:30', '2019-03-01 16:29:56', '2019-03-12 16:29:56', 1, 'i53FItHeMK', 'H8UIAdsy7T', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'afternoon', 'morning');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('urwx1MRbkJ', '2019-03-19 04:30:02', '2019-01-01 16:29:56', '2019-01-12 16:29:56', 1, 'i53FItHeMK', 'H8UIAdsy7T', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'morning', 'morning');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('V9b79oNV3b', '2019-03-18 09:19:44', '2019-04-10 16:29:56', '2019-04-17 16:29:56', 1, 'i53FItHeMK', 'eKmuZqYzzm', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'morning', 'allday');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('Xh6rbzsAfj', '2019-03-19 04:30:18', '2019-01-13 16:29:56', '2019-01-15 16:29:56', 1, 'i53FItHeMK', 'H8UIAdsy7T', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'morning', 'morning');
INSERT INTO leavingForm.leaveLetters (fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, users_fId, users_fId1, absenceTypes_fId, approver_fId, fStatus, fReason, fApprover, fFromOpt, fToOpt) VALUES ('z9nn8F5Whf', '2019-03-18 08:30:19', '2019-03-10 16:29:56', '2019-03-17 16:29:56', 1, 'dxujR3BB4d', 'eKmuZqYzzm', 'H8UIAdsy7T', 'H8UIAdsy7T', 1, 'H8UIAdsy7T', 2, null, 'H8UIAdsy7T', 'afternoon', 'allday');
create table positions
(
  fId      varchar(5)  not null,
  fPosName varchar(45) not null,
  constraint fId_UNIQUE
    unique (fId)
);

alter table positions
  add primary key (fId);

INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('1qRly', 'Accountant');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('8mCqq', 'CTO');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('B4QIq', 'Tech Lead');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('cpvd7', 'Intern/Fresher');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('hGKx5', 'COO');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('ir0gE', 'Team Leader');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('JVh4R', 'Business Analyst (BA)');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('Kebva', 'Digital Marketer');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('mXLNt', 'Project Assistant (PA)');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('MYPyH', 'Software Tester');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('psS14', 'Human Resouces (HR)');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('s8l4h', 'Designer');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('Sz0d1', 'CEO');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('U4d4k', 'Software Engineer (SE)');
INSERT INTO leavingForm.positions (fId, fPosName) VALUES ('wHK7p', 'Project Manager (PM)');
create table rejectedLetterDetail
(
  fLetterId        varchar(10) not null
    primary key,
  fReason          varchar(45) not null,
  fRejectType      int         not null,
  leaveLetters_fId varchar(10) null,
  constraint fk_rejectedLetterDetail_leaveLetters1
    foreign key (leaveLetters_fId) references leaveLetters (fId)
);

create index fk_rejectedLetterDetail_leaveLetters1_idx
  on rejectedLetterDetail (leaveLetters_fId);

INSERT INTO leavingForm.rejectedLetterDetail (fLetterId, fReason, fRejectType, leaveLetters_fId) VALUES ('mLLrBQpcwZ', 'Đi ăn hỏi', 0, null);
create table settings
(
  fName  varchar(255) not null
    primary key,
  fValue varchar(255) not null
);

INSERT INTO leavingForm.settings (fName, fValue) VALUES ('email', 'golden_owl@gmail.com');
INSERT INTO leavingForm.settings (fName, fValue) VALUES ('password', 'password');
create table teams
(
  fId       varchar(5)  not null,
  fTeamName varchar(45) not null,
  fTeamLead varchar(10) not null,
  users_fId varchar(10) null,
  constraint fId_UNIQUE
    unique (fId),
  constraint fk_teams_users1
    foreign key (users_fId) references users (fId)
);

create index fk_teams_users1_idx
  on teams (users_fId);

alter table teams
  add primary key (fId);

INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('1LwZq', 'PHP', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('4TCgb', 'Ruby/Ruby on Rails', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('5eMvD', 'Design', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('A91fa', 'Khác', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('FfI2V', 'Javascript', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('G81cf', 'Leaders', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('Gg6sG', 'QA', 'MytsQhUPQG', null);
INSERT INTO leavingForm.teams (fId, fTeamName, fTeamLead, users_fId) VALUES ('kTW7B', 'PA', 'MytsQhUPQG', null);
create table userPermission
(
  fId       varchar(5)  not null,
  fUserType varchar(45) not null,
  constraint fId_UNIQUE
    unique (fId)
);

alter table userPermission
  add primary key (fId);

INSERT INTO leavingForm.userPermission (fId, fUserType) VALUES ('3sVfP', 'Personnel');
INSERT INTO leavingForm.userPermission (fId, fUserType) VALUES ('NH6Bs', 'HR');
create table userRefToken
(
  fUserId   varchar(10) not null,
  fRefToken varchar(80) not null,
  fRdt      datetime    not null,
  users_fId varchar(10) null,
  constraint fUserId_UNIQUE
    unique (fUserId),
  constraint fk_userRefToken_users1
    foreign key (users_fId) references users (fId)
);

create index fk_userRefToken_users1_idx
  on userRefToken (users_fId);

alter table userRefToken
  add primary key (fUserId);

INSERT INTO leavingForm.userRefToken (fUserId, fRefToken, fRdt, users_fId) VALUES ('H8UIAdsy7T', '0Z6QXTsxP567jwbtpPSNbcZjSL2SxPM3eH8rQkh20pUZuvzFEsj18oX4ypLTp418dc98Q13xGDomV6O6', '2019-03-19 03:47:42', null);
INSERT INTO leavingForm.userRefToken (fUserId, fRefToken, fRdt, users_fId) VALUES ('i53FItHeMK', 'ghenlIlUctwiww6fUXSdJVSUoUs3IB1jEYCKMzhoBupRhYM6eRnDxo6HyJv21gzx0hUbIRtcP29xFoTI', '2019-03-19 05:15:42', null);
create table users
(
  fId                varchar(10)   not null,
  fFirstName         varchar(30)   not null,
  fLastName          varchar(30)   not null,
  fPosition          varchar(5)    not null,
  fPhone             varchar(10)   not null,
  fTeamId            varchar(5)    null,
  fTypeId            varchar(5)    not null,
  fEmail             varchar(45)   not null,
  fGender            int default 3 not null,
  fPassword          varchar(64)   not null,
  fUsername          varchar(45)   not null,
  positions_fId      varchar(5)    null,
  userPermission_fId varchar(5)    null,
  teams_fId          varchar(5)    null,
  constraint fEmail
    unique (fEmail),
  constraint fId_UNIQUE
    unique (fId),
  constraint fUsername
    unique (fUsername),
  constraint fk_users_positions1
    foreign key (positions_fId) references positions (fId),
  constraint fk_users_teams1
    foreign key (teams_fId) references teams (fId),
  constraint fk_users_userPermission1
    foreign key (userPermission_fId) references userPermission (fId)
);

create index fk_users_positions1_idx
  on users (positions_fId);

create index fk_users_teams1_idx
  on users (teams_fId);

create index fk_users_userPermission1_idx
  on users (userPermission_fId);

alter table users
  add primary key (fId);

INSERT INTO leavingForm.users (fId, fFirstName, fLastName, fPosition, fPhone, fTeamId, fTypeId, fEmail, fGender, fPassword, fUsername, positions_fId, userPermission_fId, teams_fId) VALUES ('eKmuZqYzzm', 'Nolan', 'Christopher', 'B4QIq', '0123456789', 'A91fa', 'NH6Bs', 'abc@gojs.com', 3, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'hr1', 'B4QIq', '3sVfP', 'A91fa');
INSERT INTO leavingForm.users (fId, fFirstName, fLastName, fPosition, fPhone, fTeamId, fTypeId, fEmail, fGender, fPassword, fUsername, positions_fId, userPermission_fId, teams_fId) VALUES ('H8UIAdsy7T', 'Adena', 'Justin', 'mXLNt', '0778329121', '1LwZq', 'NH6Bs', 'nulla.Integer@Aliquam.net', 3, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'hr', null, null, null);
INSERT INTO leavingForm.users (fId, fFirstName, fLastName, fPosition, fPhone, fTeamId, fTypeId, fEmail, fGender, fPassword, fUsername, positions_fId, userPermission_fId, teams_fId) VALUES ('i53FItHeMK', 'Daphne', 'Zachery', 'U4d4k', '0157694180', '4TCgb', '3sVfP', 'augue.Sed.molestie@congueInscelerisque.org', 1, '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'user', null, null, null);
