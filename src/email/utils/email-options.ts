import * as nodemailer from 'nodemailer';

export const emailOptions = (
  sender: string,
  recipients: [string],
  subject: string,
  html: string,
): nodemailer.SendMailOptions => {
  return {
    from: sender,
    to: recipients,
    subject: subject,
    html: html,
  };
};
