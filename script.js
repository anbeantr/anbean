const API_KEY = "apikey 5eu5WYbeEA9CCOQiR48HuX:5eqmsfI8BegutOmyRuG14j";

async function getData() {
  try {
    const response = await fetch("https://api.collectapi.com/economy/allCurrency", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": API_KEY
      }
    });

    const data = await response.json();
    document.getElementById("gold-price").innerHTML =
JSON.stringify(data.result);;

    const usd = data.result.find(item => item.code === "USD");
    const eur = data.result.find(item => item.code === "EUR");
    const goldResponse = await fetch("https://api.collectapi.com/economy/altinFiyatini", {
  method: "GET",
  headers: {
    "content-type": "application/json",
    "authorization": API_KEY
  }
});

const goldData = await goldResponse.json();

console.log(goldData.result);

document.getElementById("gold-price").innerHTML =
goldData.result[1].buy + " ₺";

if (gramAltin) {
  document.getElementById("gold-price").innerHTML = gramAltin.buy + " ₺";
}

    if (usd) {
      document.getElementById("usd-price").innerHTML = usd.buying + " ₺";
    }

    if (eur) {
      document.getElementById("eur-price").innerHTML = eur.buying + " ₺";
    }

    if (gold) {
      document.getElementById("gold-price").innerHTML = gold.buying + " ₺";
    } else {
      document.getElementById("gold-price").innerHTML = "Bulunamadı";
    }

    document.getElementById("weather").innerHTML = "31°C ☀️";

  } catch (error) {
    console.error(error);

    document.getElementById("usd-price").innerHTML = "--";
    document.getElementById("eur-price").innerHTML = "--";
    document.getElementById("gold-price").innerHTML = "--";
    document.getElementById("weather").innerHTML = "--";
  }
}

getData();
setInterval(getData, 60000);
