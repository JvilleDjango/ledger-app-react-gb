const axios = require("axios");

async function generateBreadBox() {
  const payranges = [];
  const bills = [];
  const breadbox = [];

  let pr = await axios.get("http://localhost:3001/payranges");
  let data = pr.data;
  data.forEach(e => {
    // console.log(e);
    payranges.push(e);
  });

  let b = await axios.get("http://localhost:3001/bills");
  let data2 = b.data;
  data2.forEach(e => {
    // console.log(e);
    bills.push(e);
  });

  payranges.map(range => {
    Object.keys(range).map((rg, idx) => {
      //  console.log(range[rg].startDate.date)
      let startDate = range[rg].startDate.date;
      let endDate = range[rg].endDate.date;

      let sDate = new Date(startDate);
      let eDate = new Date(endDate)

      let min = sDate.getDate();
      let max = eDate.getDate();

      console.log(startDate)

      bills.map((bill, i) => {
        let d = new Date(bill.dueDay);
        let day = d.getDate();

        if (day >= min && day <= max) {

          breadbox.push({
            id: i,
            startDate: startDate,
            endDate: endDate,
            bill: bill
          })
          
        }
      });

  
    });
  });

  // console.log(breadbox)

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

  const _breadbox = groupBy(breadbox, "startDate");

   console.log(_breadbox);

    axios
    .post("http://localhost:3001/breadbox", _breadbox)
    .then(resp => {
      console.log(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
}

generateBreadBox();

module.exports = generateBreadBox;
