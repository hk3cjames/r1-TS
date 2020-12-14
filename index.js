// input hash from ts to PS
const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(3000, () =>
  console.log(
    "TS hash input at localhost:3000 for " +
      "\n" +
      "connect to PS at localhost:3100"
  )
);

app.use(express.static("ts")); // output ts/index.html to :3000 get
app.use(express.json({ limit: "1mb" }));

var res1 = {};
currentChainId =
  "9fad417d8adc848acf0d66a1dab0dadbe6544ffe94252469dff4c31913665f49";

app.post("/hashFile", async (req, res) => {
  rxjson = req.body;
  console.log("receive TC hash submit-form and upload to PS");
  console.log(rxjson);

  time = Date.now();

  const options = {
    method: "POST",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rxjson),
  };

  res1 = await fetch("http://127.0.0.1:3100/hashFile", options);
  const disp = await res1.json();
  console.log("ready for next, completed sending to PS ");
  console.log(disp);

  nextChain = disp.nextChainId;
  newChainId = rxjson.chainId;
  if ((newChainId == currentChainId)) {
    result = "submitted";

    currentChainId = nextChain
  } else {
    result = "error - wrong Chain ID";
    nextChain = rxjson.chainId;
  }

  console.log("response to TC");
  resJson = {
    status: result,
    nextChainId: nextChain,
    tick: time,
  };
  res.json(resJson);
  console.log(resJson);
});
