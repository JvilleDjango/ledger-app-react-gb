const axios = require("axios");

async function generatePayRanges() {
  const paydays = [];
  const payranges = [];

  let p = await axios.get("http://localhost:3001/paydays");
  let data = p.data;
  data.forEach(e => {
    // console.log(e);
    paydays.push(e);
  });

  paydays.map((item, i) => {
    Object.keys(item).map((x, idx) => {
      //   console.log(item[x][0], item[x][1]);

    //   let startDate, endDate;

    //   if (item[x][0]) {
    //     startDate = item[x][0].date;
    //   }
    //   if (item[x][1]) {
    //     endDate = item[x][1].date;
    //   }

      //   let startDate = item[x][0].date;
      //   let endDate = item[x][1].date;
    //   let endDate2;

    //   let date = new Date(startDate);
    //   let min = date.getDate();

    //   let date2 = new Date(endDate);
    //   let max = date2.getDate();

    //   let date3, max2;

      if (item[x][2]) {
        // console.log(item[x][1], item[x][2]);
        // month_3 = item[x][2].month;
        // endDate2 = item[x][2].date;
        // date3 = new Date(endDate2);
        // max2 = date3.getDate();

        payranges.push({
          startDate: item[x][1],
          endDate: item[x][2]
        });
      }

      payranges.push({
        startDate: item[x][0],
        endDate: item[x][1]
      });

    });
  });

  payranges.pop();

  console.log("payranges", payranges);

  axios
    .post("http://localhost:3001/payranges", payranges)
    .then(resp => {
      console.log(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
}

generatePayRanges();

module.exports = generatePayRanges;
