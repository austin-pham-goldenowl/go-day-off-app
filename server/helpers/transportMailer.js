import nodemailer from 'nodemailer';

const sendGrid = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.SEND_USER,
    pass: process.env.SEND_PASS
  }
}
export const transportMailer = nodemailer.createTransport(sendGrid);