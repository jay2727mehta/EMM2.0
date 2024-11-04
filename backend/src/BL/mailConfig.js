const mailOptions = {
  from: "ashutosh.cheke@neilsoft.com", // Sender address
  to: "ananta.nanaware@neilsoft.com", // Recipient address (replace with the recipient's email)
  subject: "Excessive Power Consumption", // Email subject
  text: `Please Check Energy Meter Power Hitting the Trendline.`, // Email body
};

const mailOptionsLog = {
  from: "ashutosh.cheke@neilsoft.com", // Sender address
  to: "ananta.nanaware@neilsoft.com", // Recipient address (replace with the recipient's email)
  subject: "Test email from Nodemailer", // Email subject
  text: `Please Check Energy Meters Staus.`, 
};
module.exports = { mailOptions, mailOptionsLog }