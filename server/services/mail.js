const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nighthawk.og01@gmail.com",
    pass: "tpta hlig ljir bimr",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails!");
  }
});

module.exports = { transporter };
