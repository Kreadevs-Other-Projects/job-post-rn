const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nighthawk.og01@gmail.com",
    pass: "tpta hlig ljir bimr",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { transporter };
