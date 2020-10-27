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
  document.form2.hash_view.value = digestHex;
  document.form3.timeDisp.value = " ";
}

async function insert() {
  inputHash = document.form2.hash_view.value;
  inputHashLength = inputHash.length;
  tsId = "RBAS.ps1000.ts1000";

  if (inputHashLength == 64) {
    chainId = document.form1.chainId.value;
    tHash = tsId;
    const data = { tsId, chainId, tHash };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const res = await fetch("/hashFile", options);
    const disp = await res.json();
    console.log(disp);

    const d = new Date();
    document.form3.timeDisp.value = d + " - " + disp.status;

    document.form1.chainId.value = disp.nextChainId;
    document.form2.hash_view.value = " ";
  } else {
    document.form2.hash_view.value = " no valid hash ";
  }
}
