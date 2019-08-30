import nodemailer from 'nodemailer';

const sendGrid = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_POST,
  auth: {
    user: process.env.SEND_USER,
    pass: process.env.SEND_PASS
  }
}
export const transportMailer = nodemailer.createTransport(sendGrid);