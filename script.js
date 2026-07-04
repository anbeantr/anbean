const API_KEY = "apikey 5eu5WYbeEA9CCOQiR48HuX:5eqmsfI8BegutOmyRuG14j";

async function getData() {
  try {

    // Döviz
    const response = await fetch("https://api.collectapi.com/economy/allCurrency", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": API_KEY
      }
    });

    const data = await response.json();

    const usd = data.result.find(item => item.code === "USD");
    const eur = data.result.find(item => item.code === "EUR");

    if (usd) {
      document.getElementById("usd-price").innerHTML = usd.buying + " ₺";
    }

    if (eur) {
      document.getElementById("eur-price").innerHTML = eur.buying + " ₺";
    }

    // Altın
    const goldResponse = await fetch("https://api.collectapi.com/economy/altinFiyatini", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": API_KEY
      }
    });

    const goldData = await goldResponse.json();

    console.log(goldData);

    const gramAltin = goldData.result.find(item => item.name === "Gram Altın");

    if (gramAltin) {
      document.getElementById("gold-price").innerHTML = gramAltin.buy + " ₺";
    } else {
      document.getElementById("gold-price").innerHTML = "Bulunamadı";
    }

    // Hava
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
