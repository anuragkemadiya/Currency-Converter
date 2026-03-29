let from = document.getElementById("fromCurrency");
let to = document.getElementById("toCurrency");
let statusText = document.getElementById("status");

// Load currencies
async function loadCurrencies() {
  statusText.innerText = "Loading...";

  try {
    let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let data = await res.json();

    let list = Object.keys(data.rates);

    list.forEach(cur => {
      from.add(new Option(cur, cur));
      to.add(new Option(cur, cur));
    });

    statusText.innerText = "";
  } catch {
    statusText.innerText = "Error loading data";
  }
}

loadCurrencies();

// Convert function
async function convert() {
  let amount = document.getElementById("amount").value;

  if (amount === "") {
    alert("Enter amount");
    return;
  }

  let fromVal = from.value;
  let toVal = to.value;

  statusText.innerText = "Converting...";

  try {
    let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromVal}`);
    let data = await res.json();

    let rate = data.rates[toVal];
    let result = (amount * rate).toFixed(2);

    document.getElementById("result").innerText =
      amount + " " + fromVal + " = " + result + " " + toVal;

    statusText.innerText = "";
  } catch {
    statusText.innerText = "Something went wrong";
  }
}

// Swap currencies
function swapCurrency() {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;
}