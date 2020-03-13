const later = require("later");
const axios = require("axios");
// const groupBy = require('./group-by-task')

async function fetchPaydays() {
  const allPaydays = [];

  const _repeat_times = 26;
  const _start_date = "Fri Jan 10 2020 00:00:00 GMT-0700";
  const end_date = new Date("01/03/25");

  later.date.localTime();
  const start_date = new Date(_start_date);
  const _dayOfTheWeek = later.dayOfWeek.val(start_date);

  const dateToStartOn = start_date;

  const sched = later.parse
    .recur()
    .on(_dayOfTheWeek)
    .dayOfWeek();

  const _skipValue = 2;

  const occurences = later
    .schedule(sched)
    .next(_repeat_times * _skipValue, dateToStartOn);

  occurences.map((item, key) => {
    if (end_date > item) {
      if ((key / _skipValue) % 1 === 0) {
        let d = new Date(item);
        let month = d.toLocaleString("default", { month: "short" });
        allPaydays.push({ date: item, month: month });
      }
    }
  });

  // Grouping objects
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const payday_range = groupBy(allPaydays, "month");

  console.log(payday_range);

  axios
    .post("http://localhost:3001/paydays", 
      payday_range
    )
    .then(resp => {
      console.log(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
}

module.exports = fetchPaydays;
