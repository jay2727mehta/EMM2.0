const XLSX = require("xlsx");
const path = require("path");

// Path to your Excel file
const filePath = path.join(__dirname, "/Solar_Data0402.xlsx");

// Load the Excel file
const workbook = XLSX.readFile(filePath);

const sheetName = workbook.SheetNames[0];

// Get the sheet
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const data = XLSX.utils.sheet_to_json(sheet);

const formattedData = data.map((item) => {
  const dateTimeParts = item["Date & Time"].split(" "); // Split date and time
  const dateParts = dateTimeParts[0].split("/"); // Split date parts
  const timeParts = dateTimeParts[1].split(":"); // Split time parts

  // Create a new Date object with the date & time parts
  const dateTime = new Date(
    dateParts[2],
    dateParts[1] - 1,
    dateParts[0],
    timeParts[0],
    timeParts[1],
    timeParts[2]
  );

  // Update the 'Date & Time' property with the new Date object
  return {
    SI: item["SI"],
    DateAndTime: dateTime,
    SolarPower: item["Solar Power (KW)"],
    DayGeneration: item["Day Gen (KWh)"],
    TotalGeneration: item["Total Gen (KWh)"],
    CUF: item["CUF   ON AC Capacity(%)"],
  };
});

const transformedData = data.map((entry) => {
  const dateAndTime = new Date(entry["Date & Time"]);
  const formattedDateAndTime = dateAndTime; // Convert to ISO string format

  return {
    SI: entry.SI,
    DateAndTime: formattedDateAndTime,
    SolarPower: entry["Solar Power (KW)"],
    DayGeneration: entry["Day Gen (KWh)"],
    TotalGeneration: entry["Total Gen (KWh)"],
    CUF: entry["CUF   ON AC Capacity(%)"],
  };
});

module.exports = formattedData;
