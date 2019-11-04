const dayjs = require('dayjs');
const advFormat = require('dayjs/plugin/advancedFormat');
const relTime = require('dayjs/plugin/relativeTime');

const formatDate = (date, format) => {
  dayjs.extend(advFormat);
  return dayjs(date).format(format);
};

const relativeTime = (date, startOf) => {
  dayjs.extend(relTime);
  return dayjs(date).startOf(startOf).fromNow();
};
const curTime = (time) => {
  return dayjs().format(`${time}`);
};

const myGetDate = (date) => {
  let today;
  if (!date) {
    today = new Date();
  } else {
    today = new Date(date);
  }
  let dd = today.getDate(), mm = today.getMonth() + 1; // January is 0!,
  const yyyy = today.getFullYear();
  if (dd < 10) { dd = `0${dd}`; }
  if (mm < 10) { mm = `0${mm}`; }
  return `${mm}/${dd}/${yyyy}_${today.getUTCHours()}`;
};
module.exports = {myGetDate, formatDate, curTime, relativeTime};
