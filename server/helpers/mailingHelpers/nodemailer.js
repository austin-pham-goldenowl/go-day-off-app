import { uid } from 'rand-token';
import Email from 'email-templates';

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
  message: {
    from: serviceInfo.auth.user
  },
  send: true,
  transport: serviceInfo
});

export const sendMail = cb => {
  email
    .send({
      template: 'leaveLetter',
      message: {
        to: clientInfo.email,
        cc: `junnguyen663@outlook.com`
      },
      locals: {
        fullName: 'Nguyen Quoc Cuong',
        position: 'Intern/Fresher',
        fromTime: '09h00',
        fromDate: '12/12/2018',
        toTime: '18h00',
        toDate: '13/12/2018',
        reason: 'Bị sốt',
        leaveType: 3,
        substituteName: 'Nolan',
        phone: '0949904663',
        createDateTime: {
          date: '12',
          month: '12',
          year: '2018'
        },
        department: 'Bộ phận nhân sự',
        code: uid(10)
      }
    })
    .then(res => {
      console.log(`email sent response: `, res);
      cb && cb(true, res);
    })
    .catch(err => {
      console.error(`email failed error: `, err);
      cb && cb(false, err);
    });
};

// export const sendMail = cb => {
//   const clientEmail = `tuanvjp2605@gmail.com`;
//   let code = uid(10);
//   console.log(`creds.user: `, creds.user);
//   console.log(`creds.pass: `, creds.pass);
//   const mailOptions = {
//     from: creds.user,
//     to: clientEmail,
//     subject: `Verify transaction - ${code}`,
//     html: output(code)
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log(`Email not sent! Details: `, err);
//       cb(false, err);
//     } else {
//       console.log(`Email sent: ${info.response}`);
//       cb(true, info);
//     }
//   });
// };
