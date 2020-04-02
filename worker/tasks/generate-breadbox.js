const axios = require("axios");
const moment = require("moment");

async function generateBreadBox() {
  const payranges = [];
  const bills = [];
  const breadbox = [];

  let _pay_ranges = await axios.get("http://localhost:3001/payranges");
  let data = _pay_ranges.data;
  data.forEach(e => {
    // console.log(e);
    payranges.push(e);
  });

  let _bills = await axios.get("http://localhost:3001/bills");
  let data2 = _bills.data;
  data2.forEach(e => {
    // console.log(e);
    bills.push(e);
  });

  payranges.map(range => {
    Object.keys(range).map(rg => {
      let startDate = range[rg].startDate;
      let endDate = range[rg].endDate;

      let sDate = moment(startDate).format("YYYY-MM-DD");
      let eDate = moment(endDate).format("YYYY-MM-DD");

      bills.map((bill, i) => {
        for (let i = 0; i < 12; i++) {
          let day = moment(bill.dueDay)
            .month(i)
            .format("YYYY-MM-DD");

          if (day >= sDate && day <= eDate) {
            breadbox.push({
              id: i,
              startDate: startDate,
              endDate: endDate,
              bill: bill
            });
          }
        }
      });
    });
  });

  const update = data => {
    const res = {};
    data.forEach(item => {
      if (!res[item.startDate]) {
        res[item.startDate] = { ...item, bill: [] };
      }
      res[item.startDate].bill.push(item.bill);
    });
    return Object.values(res);
  };


  const combined_bills = update(breadbox);

  axios
  .post("http://localhost:3001/breadbox", combined_bills)
  .then(resp => {
    console.log(resp.data);
  })
  .catch(error => {
    console.log(error);
  });
}

generateBreadBox();

module.exports = generateBreadBox;
