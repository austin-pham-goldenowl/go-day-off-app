insert into leavingForm.leaveLetters(fId, fRdt, fFromDT, fToDT, fAbsenceType, fSubstituteId, fUserId, fStatus)
values ("LTddvId9Yq", "2019-02-17 16:29:56", "2019-02-19 16:29:56", "2019-02-18 16:29:56", 1, "i53FItHeMK", "2U35tyjDmh", 1),
			("mLLrBQpcwZ", "2019-01-17 16:29:56", "2019-01-19 16:29:56", "2019-01-18 16:29:56", 1, "i53FItHeMK", "2U35tyjDmh", -1);

insert into leavingForm.rejectedLetterDetail(fLetterId, fReason, fRejectType) value ("mLLrBQpcwZ", "Đi ăn hỏi", 0);


SELECT * FROM leavingForm.users;
SELECT * FROM leavingForm.leaveLetters;