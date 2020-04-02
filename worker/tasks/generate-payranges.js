const axios = require("axios");

async function generatePayRanges() {
  const paydays = [];
  const _payRanges = [];
  const _paydays = [];

  let p = await axios.get("http://localhost:3001/paydays");
  let data = p.data;
  data.forEach(e => {
    // console.log(e);
    paydays.push(e);
  });

  paydays.map(item => {
    Object.keys(item).map(x => {
      const datelist = item[x];

      Object.keys(datelist).map(date => {
        const i = Number(date) + 1;
        const num = i.toLocaleString();

        _paydays.push(datelist[date].date);
      });
    });
  });

  // console.log(_paydays);

  _paydays.map((date, idx) => {
    // console.log(date);
    // console.log(_paydays[idx + 1])

    _payRanges.push({
      startDate: date,
      endDate: _paydays[idx + 1]
    });
  });

  const sanitized_data = _payRanges.filter(element => {
    if (element.endDate === undefined) {
      element.endDate = "2021-01-08T07:00:00.000Z";
    }
    return element;
  });

  // console.log("Sanitized data: ", sanitized_data);

  axios
    .post("http://localhost:3001/payranges", sanitized_data)
    .then(resp => {
      console.log(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
}

generatePayRanges();

module.exports = generatePayRanges;
