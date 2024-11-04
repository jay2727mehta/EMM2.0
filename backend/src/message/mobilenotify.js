const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "5f506d33ca7a5f12e1994be261d819ec"
    }
  });
const message = {
    from: "info@demomailtrap.com",
    to: "ashutosh.cheke@neilsoft.com",
    subject: "Subject",
    text: "Hello SMTP Email"
};

transporter.sendMail(message, function(err, info) {
    if (err) {
        console.log(err);
    } else {
        console.log(info);
    }
});
