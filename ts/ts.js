var hashHex;

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  return hashHex;
}

async function generate() {
  const text = document.form0.data_in.value;
  console.log(text);
  const digestHex = await digestMessage(text);
  console.log(digestHex);
  document.form1.hash_view.value = digestHex;
  document.form2.rbas_ack.value = " ";
}

function display_time() {
  var d = new Date();
  var n = d.toUTCString();
  document.getElementById("input_time").innerHTML = n;
}

async function insert() {
  tsId = "ts-1001";
  thash = document.form1.hash_view.value;

  const data = { tsId, thash };

  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch("/hashFile", options);
  const disp = await res.json();
  console.log(disp);
  console.log(disp.status);
  console.log(disp.hash);


  result_dsp = disp.status + " - " +  disp.hash;
  document.form2.rbas_ack.value = result_dsp;

  time = disp.tick;
  display_time(time);
}
