const nodemailer = require("nodemailer");
const dateservice = require("../BL/dateprocess");
const mailDLservice = require("../DL/maill/maildatabaselayer");
const sendMail = require('./sendMail');
const mailOptions = require("./mailConfig");
const nodeStateService = require('../DL/nodestate/nodestateservice')
const enDataService = require('../DL/energyMeterDL.js/dlenergymeter')
// // Ca transporter object using SMTP transpor
// const criticalPower = async (power) => {
//   try {
//     const adminLiftData = await enDataService.getAdminLiftCurrentData();
//     const opLiftData = await enDataService.getOperationLiftCurrentData();
//     const acSubData = await enDataService.getHVACOPTWOCurrentData();
//     const lightingHVAC = await enDataService.getLightingHVACSUBCurrentData();
//     const pumpData = await enDataService.getWaterPumpCurrentData();
//     const data = {
//       powerConsumption : power,
//       lift : Math.round(adminLiftData.data[0].admin_lift_current + opLiftData.data[0].admin_lift_current) / 1000,
//       ac : Math.round(acSubData.data[0].admin_lift_current + lightingHVAC.data[0].admin_lift_current) / 1000,
//       pump : Math.round(pumpData.data[0].admin_lift_current) / 1000
//     }
//     const result = await mailDLservice.getEmailLog();
//     const lastMailSend = result[0].timestamp;
//     const timedifference = dateservice.timediff(lastMailSend);
//     if (timedifference > 30) {
//       sendMail.sendEmail(data)
//       mailDLservice.createEmailLog(mailOptions.mailOptions.to, power);
//     } else {
//       console.log("already sent the mail at " + lastMailSend);
//     }
//   } catch (error) {
//     console.error("Error sending email from BL:", error);
//   }
// };

const criticalPower = async (power) => {
  try {
    // const adminLiftData = await enDataService.getAdminLiftCurrentData();
    // const opLiftData = await enDataService.getOperationLiftCurrentData();
    // const acSubData = await enDataService.getHVACOPTWOCurrentData();
    // const lightingHVAC = await enDataService.getLightingHVACSUBCurrentData();
    // const pumpData = await enDataService.getWaterPumpCurrentData();
    
    const data = {
      powerConsumption : power.power,
      criticalPowerCons : power.critical_power,
      meterName : power.meter_name,
      meterLocation : power.meter_location
      // lift : Math.round(adminLiftData.data[0].admin_lift_current + opLiftData.data[0].admin_lift_current) / 1000,
      // ac : Math.round(acSubData.data[0].admin_lift_current + lightingHVAC.data[0].admin_lift_current) / 1000,
      // pump : Math.round(pumpData.data[0].admin_lift_current) / 1000
    }

    const result = await mailDLservice.getEmailLog();
    const lastMailSend = result[0].timestamp;
    const timedifference = dateservice.timediff(lastMailSend);
    if (timedifference > 60) {
      sendMail.sendEmail(data)
      mailDLservice.createEmailLog(mailOptions.mailOptions.to, power);
    } else {
      console.log("already sent the mail at " + lastMailSend);
    }
  } catch (error) {
    console.error("Error sending email from BL:", error);
  }
};

const OfflineNodesMail = async () => {
  try {
    const result = await mailDLservice.getlastNodestatus();
    const nodes = await nodeStateService.getOfflineNodeStateData();

    const lastMailSend = result[0].timestamp;
    const timedifference = dateservice.timediff(lastMailSend);

    if (timedifference > 300) {
      sendMail.NodesStatusEmail(nodes);
      const email = mailOptions.mailOptionsLog.to;
      mailDLservice.createEmailLog(email, result[0].parameter);
    } else {
      console.log("already sent the mail at " + lastMailSend);
    }
  } catch (error) {
    console.error("Error sending email from BL:", error);
  }
};

const dgupdates = (data) => {
  try {
    sendMail.sendEmail("Hello");
  } catch (error) {
    console.error("Error sending email from BL:", error);
  }
};

module.exports = {
  dgupdates,
  criticalPower,
  OfflineNodesMail,
};
