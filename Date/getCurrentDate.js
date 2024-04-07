const getCurrentDate = () => {
  let currentDate = new Date();

  // Extract day, month, and year from the current date
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Month starts from 0, so add 1
  let year = currentDate.getFullYear();

  // Pad day and month with leading zeros if necessary
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  // Format the date as dd/mm/yyyy
  let formattedDate = day + "/" + month + "/" + year;

  // Output the formatted date
  return formattedDate;
  // console.log(formattedDate);
};

export default getCurrentDate;
