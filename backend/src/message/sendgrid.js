const { MailtrapClient } = require("mailtrap");

const TOKEN = "5f506d33ca7a5f12e1994be261d819ec";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "ashutoshcheke4@gmail.com",
  }
];

const dgsendmessages=(sms)=>{
    client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: `Congrats for sending test email with Mailtrap!${sms}`,
    category: "Integration Test",
  })
  .then(console.log, console.error);
}







module.exports ={dgsendmessages};