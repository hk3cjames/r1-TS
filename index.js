// input hash from tc, upload to PS port 3100
const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(3000, () =>
  console.log("TS listening at localhost (or 192.168.x.x):3000 for hash input"+
  "\n"+"connect to PS at localhost:3100")
);

app.use(express.static("ts"));

app.use(express.json({ limit: "1mb" }));

var res1 = {};
existHash = "to be confirm in future cycle";
result = "next";
app.post("/hashFile", async (req, res) => {
  rxjson = req.body;
  console.log(rxjson);

  time = Date.now();
  newHash = rxjson.thash;
  console.log(newHash);
  console.log(existHash);

  res.json({
    status: result,
    hash: existHash,
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

  res1 = await fetch("http://127.0.0.1:3100/hashFile", options);
  // res1 = await fetch("http://192.168.0.110:3100/hashFile", options);
  // console.log("PS connect to PS at localhost:3100")

  const disp = await res1.json();
  console.log(disp);
  console.log(disp.status);
  result = disp.status;
  existHash = disp.hash;
});
