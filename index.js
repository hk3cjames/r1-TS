// input hash from ts to PS
const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(3000, () =>
  console.log("PS-1001 listening at localhost(or https):3000")
);
app.use(express.static("ts"));

app.use(express.json({ limit: "1mb" }));

var res1 = {};
existHash = "ab1234";
app.post("/hashFile", async (req, res) => {
  rxjson = req.body;
  console.log(rxjson);

  time = Date.now();
  newHash = rxjson.thash;
  console.log(newHash);
  console.log(existHash);
  if (newHash === existHash) {
    res_status = "fail";
  } else {
    res_status = "success";
    existHash = rxjson.thash;
  }
  res.json({
    status: res_status,
    tick: time,
  });

  data = rxjson;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  res1 = await fetch("http://192.168.0.110:3100/hashFile", options)
  const disp = await res1.json();
  console.log(disp)

});
