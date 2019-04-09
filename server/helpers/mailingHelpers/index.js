import { uid } from 'rand-token';
import { Op } from 'sequelize';
import Email from 'email-templates';
import moment from 'moment';
import { DAY_SESSION_OPTIONS, FROM_OPTION_VALUES, TO_OPTION_VALUES} from '../../configs/constants';

const {
  users: userModel,
  positions: positionModel,
  teams: teamModel,
  settings: settingModel,
} = require('../../models');

const dateFormat = 'DD/MM/YYYY';

// const serviceInfo = {
//   service: 'gmail',
//   auth: {
//     user: `go.mailing.service1@gmail.com`,
//     pass: 'fyzrYx-wawjeq-8cybxo'
//   }
// };

const getEmailingAccountInfo = () => {
  return settingModel.loadAll([],{
    where: { fName: { [Op.or]: ['email', 'password'] }}
  });
}

const email = (serviceInfo) => {
  return new Email({
    views: {
      root: `${__dirname}/emails`
    },
    preview: true,
    send: true,
    message: {
      from: serviceInfo.auth.user
    },
    transport: serviceInfo
  })
};


/**
 * 
 * 
letterEntity:  
{ 
  fFromOpt: 'allday',
  fToOpt: 'allday',
  fAbsenceType: 1,
  fFromDT: 2019-03-30T02:41:38.697Z,
  fToDT: 2019-03-30T02:41:38.699Z,
  fStatus: 1,
  fSubstituteId: 'LzPq90f8bZ',
  fUserId: 'LzPq90f8bZ',
  fApprover: 'wYC0nI3LqV',
  fReason: 'a',
  fId: 'D1KbIWg4zh',
  absenceTypes_fId: 1,
  users_fId: 'LzPq90f8bZ',
  users_fId1: 'LzPq90f8bZ',
  approver_fId: 'wYC0nI3LqV',
  fRdt: 2019-03-29T02:43:55.000Z 
}
 */

export const sendLeaveRequestMail = async (letterEntity, cb) => {
  //Load email account info first
  const settings = await getEmailingAccountInfo();
  if (typeof(settings) !== 'object') {
    console.log(`No email account was set!!!`);
    return;
  }
  //email Account
  const serviceInfo = {
    service: 'gmail',
    auth: {
      user: `${settings[0].dataValues.fValue}`,
      pass: `${settings[1].dataValues.fValue}`
    }
  }

  console.log(`mailingHelpers -> send LeaveRequestMail -> letterEntity: `,
    letterEntity);
  //Parsing no-need-to-query fields
  let {
    leaveLetter: {
      fFromOpt,
      fToOpt,
      fAbsenceType,
      fFromDT,
      fToDT,
      fSubstituteId,
      fUserId,
      fApprover,
      fReason,
      fRdt,
    },
    fInformTo
  } = letterEntity.leaveLetter;

  // 1.  getUserProfile
  const user = await getUserProfile(fUserId);
  if (!user) return;
  const { fPositionName, fPhone, fLastName, fFirstName, fEmail } = user;

  //2. getSubstituteName
  let substituteName = 'Không có';
  const substitute = await getSubstituteProfile(fSubstituteId);
  if (substitute) {
    substituteName = `${substitute.fFirstName} ${substitute.fLastName}`;
  }

  //3. getApproverName
  let approverName = 'Bộ phận Nhân sự';
  const approver = await getApproverProfile(fApprover);
  if(approver) {
    approverName = `${approver.fFirstName} ${approver.fLastName}`;
  }
  //Parsing Date
  let momentRdt = moment(fRdt),
    momentFromDT = moment(fFromDT),
    momentToDT = moment(fToDT);

  const fromTimeText = FROM_OPTION_VALUES.includes(fFromOpt) ? DAY_SESSION_OPTIONS[fFromOpt] : '';
  const toTimeText  = TO_OPTION_VALUES.includes(fToOpt) ? DAY_SESSION_OPTIONS[fToOpt] : '';
  
  //Extract `fInformTo` emails
  let informToEmails = fInformTo !== undefined ? 
  fInformTo.map(item => {
    return item.value
  }) : [''];
  //Send mail
  email(serviceInfo)
    .send({
      template: 'sendLeaveLetter',
      message: {
        to: [fEmail, 'tuanvjp2605@gmail.com'],
        cc: [fEmail, substitute.fEmail, ...informToEmails]
      },
      locals: {
        fullName: `${fFirstName} ${fLastName}`,
        position: fPositionName,
        fromTime: fromTimeText,
        fromDate: momentFromDT.format(dateFormat).toString(),
        toTime: toTimeText,
        toDate: momentToDT.format(dateFormat).toString(),
        reason: fReason,
        leaveType: +fAbsenceType,
        substituteName: substituteName,
        phone: fPhone,
        createDateTime: {
          date: momentRdt.date(),
          month: momentRdt.month() + 1,
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
	console.log(`TCL: getUserProfile -> fUserId: `, fUserId)
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
    if (!users || users.length !== 1) throw { msg: 'USER_NOT_FOUND_1' };
    //extract info
    const user = users[0].get({ plain: true });
    const { fPosition, fTeamId } = user;
    // get position name
    const positions = await positionModel.loadAll(['fPosName'], {
      where: { fId: fPosition }
    });
    if (!positions || positions.length !== 1) throw { msg: 'USER_NOT_FOUND_2' };
    user.fPositionName = positions[0].get({ plain: true }).fPosName;
    // get team name
    const teams = await teamModel.loadAll(['fTeamName'], {
      where: { fId: fTeamId }
    });
    if (!teams || teams.length !== 1) throw { msg: 'USER_NOT_FOUND_3' };
    user.fTeamName = teams[0].get({ plain: true }).fTeamName;

    return user;
  } catch (err) {
    console.log(`mailingHelper -> getUserProfile -> Error: `, err);
    return null;
  }
};

const getSubstituteProfile = async fSubstituteId => {
  const attributes = ['fEmail', 'fFirstName', 'fLastName'];
  const users = await userModel.loadAll(attributes, {
    where: { fId: fSubstituteId }
  });
  if (!users || users.length < 1) return null;
  //extract info
  const substitute = users[0].get({ plain: true });
  return substitute;
};

const getApproverProfile = async fApproverId => {
  try {
    const attributes = ['fFirstName', 'fLastName'];
    const users = await userModel.loadAll(attributes, { where: { fId: fApproverId }});
    if(!users || users.length < 1) throw { msg: `USER_NOT_FOUND` };
    //extract info
    const approver = users[0].get({ plain: true });
    return approver;
  }
  catch (err) {
    console.log(`mailingHelper -> getApproverProfile -> Error:`,err);
    return null;
  }
}
