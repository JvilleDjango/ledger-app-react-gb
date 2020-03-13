// import React from "react";
// import later from "later";

// const PayDays = ()  => {

//   const jsonData = {};

//   const _repeat_times = 26;
//   const _start_date = "Fri Jan 10 2020 00:00:00 GMT-0700";
//   const end_date = new Date("01/03/25");

//   later.date.localTime();
//   const start_date = new Date(_start_date);
//   const _dayOfTheWeek = later.dayOfWeek.val(start_date);

//   const dateToStartOn = start_date;

//   const sched = later.parse
//     .recur()
//     .on(_dayOfTheWeek)
//     .dayOfWeek();
    
//   const _skipValue = 2;

//   const occurences = later
//     .schedule(sched)
//     .next(_repeat_times * _skipValue, dateToStartOn);

//    return occurences.map((item, key) => {
//     if (end_date > item) {
//       if ((key / _skipValue) % 1 === 0) {
//         let columnName = item.metadata.colName;
//         jsonData[columnName] = item.value
//       }
//     }
//   });


//  return jsonData;

// };

// export default PayDays;

