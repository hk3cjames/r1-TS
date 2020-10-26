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
  "5d1c4709ada27339c3a22c0a125708e6880c8368e0afb240bb9447d887be8eae";

app.post("/hashFile", async (req, res) => {
  rxjson = req.body;
  console.log("receive TC hash submit-form and upload to PS");
  console.log(rxjson);

  time = Date.now();

  newChainId = rxjson.chainId;
  if ((newChainId == currentChainId)) {
    result = "submitted";
    nextChain = rxjson.tHash;
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

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rxjson),
  };

  res1 = await fetch("http://127.0.0.1:3100/hashFile", options);
  const disp = await res1.json();
  console.log("ready for next, completed sending to PS ");
  console.log(disp);
});
