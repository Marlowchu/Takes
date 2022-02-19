const moment = require("moment");
const helper = require('../../utils/helpers');

function format_time(date) {
  return (currentTime = moment().format("dddd"));
}

function format_date(date) {
  return (timeOfDay = moment().format("H:mm"));
}

moduel.exports.format_time = format_time;
// getTimeofDay(() => {
//   format_time();
//   format_date();

//   console.log(currentTime);
//   console.log(timeOfDay);
// });

// format_time: () => {

//     return moment().format('dddd');
//     // return  new Date().toLocaleTimeString();
//   },

// format_date: () => {

//   return moment().format('H:mm');
// }
// console.log(format_time);
