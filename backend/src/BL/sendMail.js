const nodemailer = require("nodemailer");
const mailOptions = require("./mailConfig");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "webmail.neilsoft.com",
  port: 25,
  auth: {
    user: "ashutosh.cheke@neilsoft.com",
    pass: "Neilsoft#61",
  },
});

const sendEmail = (jsonData) => {
  try {
    const templatePath = path.join(__dirname, "powerTrend.html");

    fs.readFile(templatePath, "utf8", (err, templateData) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        return;
      }

      // const { powerConsumption, lift, ac, pump } = jsonData;
      const { powerConsumption,criticalPowerCons,meterName,meterLocation } = jsonData;
      // Construct HTML for the table rows
      // const tableRow = `
      //   <tr><td>Grid power : ${powerConsumption} KW</td></tr>
      //   <tr><td>Lift power : ${lift} KW</td></tr>
      //   <tr><td>AC power : ${ac} KW</td></tr>
      //   <tr><td>Pump power : ${pump} KW</td></tr>
      // `;

      const tableRow = `
      <tr><td>Current Power : ${powerConsumption} KW</td></tr>
      <tr><td>Critical Power : ${criticalPowerCons} KW</td></tr>
      <tr><td>Meter Name : ${meterName}</td></tr>
      <tr><td>Meter Location : ${meterLocation}</td></tr>
    `;

      const htmlContent = templateData.replace(
        "<!-- Data rows will be inserted here -->",
        tableRow
      );

      const mailOptions = {
        from: "ashutosh.cheke@neilsoft.com",
        // to : 'dnyanesh.khairnar@neilsoft.com',
        to: [
          // "ananta.nanaware@neilsoft.com",
           "dnyanesh.khairnar@neilsoft.com",
          //  "pratap.sanap@neilsoft.com",
           "nilesh.sonawane@neilsoft.com"
          // "nisha.jahagirdar@neilsoft.com",
          // "sandeep.agrawal@neilsoft.com",
        ],
        subject: "Excessive Power Consumption",
        html: htmlContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const NodesStatusEmail = (jsonData) => {
  try {
    const templatePath = path.join(__dirname, "nodeStatus.html");

    fs.readFile(templatePath, "utf8", (err, templateData) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        return;
      }

      // Populate tabular data
      let tableRows = "";
      jsonData.forEach((item) => {
        const statusClass =
          item.state === "online" ? "online-icon" : "offline-icon";
        tableRows += `<tr><td>${item.meterName}</td><td><span class="status-icon ${statusClass}">${item.state}</span></td></tr>`;
      });

      // Insert the table rows into the template
      const htmlContent = templateData.replace(
        "<!-- Data rows will be inserted here -->",
        tableRows
      );

      const mailOptions = {
        from: "ashutosh.cheke@neilsoft.com",
        to: ["ananta.nanaware@neilsoft.com"],
        subject: "Energy Meter Status",
        html: htmlContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail, NodesStatusEmail };
