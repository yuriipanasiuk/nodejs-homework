const sendEmail = require('../helpers/sendEmail');

const mail = async (email, token) => {
  const message = {
    to: email,
    subject: 'email confirmation',
    html: `<a target = '_blank' href='http://localhost:3000/api/users/verify/${token}'>Hi, please verify your email address by clicking the link</a>`,
  };

  await sendEmail(message);
};

module.exports = mail;
