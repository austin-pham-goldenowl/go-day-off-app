import { uid } from 'rand-token';
import Email from 'email-templates';
import moment from 'moment';

const {
  users: userModel,
  positions: positionModel,
  teams: teamModel
} = require('../../models');

const timeFormat = 'HH:mm',
  dateFormat = 'DD/MM/YYYY';

const serviceInfo = {
  service: 'gmail',
  auth: {
    user: `go.mailing.service1@gmail.com`,
    pass: 'fyzrYx-wawjeq-8cybxo'
  }
};
const clientInfo = {
  email: `tuanvjp2605@gmail.com`
};

const email = new Email({
  views: {
    root: `${__dirname}/emails`
  },
  preview: true,
  send: true,
  message: {
    from: serviceInfo.auth.user
  },
  transport: serviceInfo
});

/**
 * 
 * 
letterEntity:  { 
  fAbsenceType: '4',
  fFromDT: '2019-04-10T16:29:56.000Z',
  fStatus: 1,
  fSubstituteId: 'i53FItHeMK',
  fToDT: '2019-04-17T16:29:56.000Z',
  fUserId: 'H8UIAdsy7T',
  fApprover: 'H8UIAdsy7T',
  fFromOpt: 'morning',
  fToOpt: 'allday',
  fId: 'EkT5hCwTU4',
  fReason: 'Bla bla',
  absenceTypes_fId: '4',
  users_fId: 'H8UIAdsy7T',
  users_fId1: 'H8UIAdsy7T',
  approver_fId: 'H8UIAdsy7T',
  fRdt: '2019-03-19 10:25:02' 
}
 */
export const sendLeaveRequestMail = async (letterEntity, cb) => {
  console.log(`mailingHelpers -> send LeaveRequestMail -> letterEntity: `,
    letterEntity);
  //Parsing no-need-to-query fields
  let {
    fReason,
    fAbsenceType,
    fFromDT,
    fToDT,
    fRdt,
    fUserId,
    fSubstituteId
  } = letterEntity;

  //Todo
  /**
   * 1. getUserProfile for (fullName, positionName, phoneNumber, userEmail, position, teamId) with given fUserId
   * 2. getSubstituteName for (substituteName) with given fSubstituteId
   * 3. getApproverName for for (approverName) with given fApprover
   */
  // Implementations
  // 1.  getUserProfile
  const user = await getUserProfile(fUserId);
  if (!user) return;
  const { fPositionName, fPhone, fLastName, fFirstName, fEmail } = user;
  // End - getUserProfile

  //2. getSubstituteName
  const substitute = await getSubstituteProfile(fSubstituteId);
  if (!substitute) return;
  const substituteName = `${substitute.fFirstName} ${substitute.fLastName}`;
  // End - getSubstituteName

  //3. getApproverName

  let approverName = 'Bộ phận Nhân sự'; //Hard code to `Bo phan nhan su`

  // End- getApproverName
  let momentRdt = moment(fRdt),
    momentFromDT = moment(fFromDT),
    momentToDT = moment(fToDT);

  //Send mail
  email
    .send({
      template: 'sendLeaveLetter',
      message: {
        to: clientInfo.email,
        cc: [fEmail]
      },
      locals: {
        fullName: `${fFirstName} ${fLastName}`,
        position: fPositionName,
        fromTime: momentFromDT.format(timeFormat).toString(),
        fromDate: momentFromDT.format(dateFormat).toString(),
        toTime: momentToDT.format(timeFormat).toString(),
        toDate: momentToDT.format(dateFormat).toString(),
        reason: fReason,
        leaveType: +fAbsenceType,
        substituteName: substituteName,
        phone: fPhone,
        createDateTime: {
          date: momentRdt.date(),
          month: momentRdt.month(),
          year: momentRdt.year()
        },
        approver: approverName, //not handled
        code: uid(10)
      }
    })
    .then(res => {
      cb && cb(true, res);
    })
    .catch(err => {
      cb && cb(false, err);
    });
};

// Utilities

const getUserProfile = async fUserId => {
  try {
    const attributes = [
      'fEmail',
      'fFirstName',
      'fLastName',
      'fPhone',
      'fPosition',
      'fTeamId'
    ];
    const users = await userModel.loadAll(attributes, {
      where: { fId: fUserId }
    });
    if (!users || users.length !== 1) throw { msg: 'USER_NOT_FOUND' };
    //extract info
    const user = users[0].get({ plain: true });
    const { fPosition, fTeamId } = user;
    // get position name
    const positions = await positionModel.loadAll(['fPosName'], {
      where: { fId: fPosition }
    });
    if (!positions || positions.length !== 1) throw { msg: 'USER_NOT_FOUND' };
    user.fPositionName = positions[0].get({ plain: true }).fPosName;
    // get team name
    const teams = await teamModel.loadAll(['fTeamName'], {
      where: { fId: fTeamId }
    });
    if (!teams || teams.length !== 1) throw { msg: 'USER_NOT_FOUND' };
    user.fTeamName = teams[0].get({ plain: true }).fTeamName;

    return user;
  } catch (err) {
    console.log(`[ERR] -> mailingHelper -> getUserProfile -> Error: `, err);
    return null;
  }
};

const getSubstituteProfile = async fSubstituteId => {
  try {
    const attributes = ['fEmail', 'fFirstName', 'fLastName'];
    const users = await userModel.loadAll(attributes, {
      where: { fId: fSubstituteId }
    });
    if (!users || users.length !== 1) throw { msg: 'USER_NOT_FOUND' };
    //extract info
    const user = users[0].get({ plain: true });
    return user;
  } catch (err) {
    console.log(`[ERR] -> mailingHelper -> getSubstituteProfile -> Error: `,
      err);
    return null;
  }
};
