const formatDateTime = (timestamp) => {
  const dateObj = new Date(timestamp);

  const year = dateObj.getFullYear(); // Get the full year (e.g., 2024)
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(dateObj.getDate()).padStart(2, "0"); // Get the day of the month
  const hours = String(dateObj.getHours()).padStart(2, "0"); // Get the hours (24-hour format)
  const minutes = String(dateObj.getMinutes()).padStart(2, "0"); // Get the minutes

  return `${year}-${month}-${day} ${hours}:${minutes}`; // Return formatted date-time string (yyyy-MM-dd hh:mm)
};

const convertDateTimeToTimestamp = (dateTimeString) => {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  // Create a new Date object with the provided date and time components
  const dateTimeObj = new Date(year, month - 1, day, hours, minutes);

  // Get the Unix timestamp (milliseconds since Jan 1, 1970)
  const timestamp = dateTimeObj.getTime();

  return timestamp;
};

const convertTimestampToNumber = (timestampString) => {
  const timestamp = new Date(timestampString).getTime();
  return timestamp;
};

const timediff = (lastdate) => {
  const dateObj = new Date(lastdate).getTime();
  const currentTimeUTC = new Date().getTime();
  const datediff = currentTimeUTC - dateObj;
  const hours = datediff / (1000 * 60); // Convert milliseconds to hours
  return hours;
};

module.exports = {
  timediff,
  convertTimestampToNumber,
  convertDateTimeToTimestamp,
  formatDateTime,
};
