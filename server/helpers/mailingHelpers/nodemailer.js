import nodemailer from 'nodemailer';
import { uid } from 'rand-token';
import Email from 'email-templates';
import * as fs from 'fs';
import path from 'path';
import pug from 'pug';

import serviceCredential from './serviceCredential';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: serviceCredential.user,
    pass: serviceCredential.pass
  }
});
const email = new Email({
  message: {
    from: 'go.mailing.service1@gmail.com'
  },
  send: true,
  transport: transporter
});

export const sendMail = cb => {
  email
    .send({
      template: 'welcome',
      message: {
        to: 'tuanvjp2605@gmail.com'
      },
      locals: {
        name: 'TuanVjp'
      }
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb(err));
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
