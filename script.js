const API_KEY = "apikey 5eu5WYbeEA9CCOQiR48HuX:5eqmsfI8BegutOmyRuG14j";

async function getData() {
  try {

    // Döviz verileri
    const response = await fetch("https://api.collectapi.com/economy/allCurrency", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": API_KEY
      }
    });

    if (!response.ok) throw new Error("CollectAPI hatası");

    const data = await response.json();

    const usd = data.result.find(item => item.code === "USD");
    const eur = data.result.find(item => item.code === "EUR");

    if (usd) {
      document.getElementById("usd-price").innerHTML =
        Number(usd.buying).toFixed(2) + " ₺";
    }

    if (eur) {
      document.getElementById("eur-price").innerHTML =
        Number(eur.buying).toFixed(2) + " ₺";
    }

    // Yaklaşık gram altın hesabı
    if (usd) {
      const goldResponse = await fetch("https://api.gold-api.com/price/XAU");

      if (goldResponse.ok) {
        const goldData = await goldResponse.json();

        const ons = Number(goldData.price);
        const dolar = Number(usd.buying);

        const gram = (ons / 31.1035) * dolar;

        document.getElementById("gold-price").innerHTML =
          gram.toFixed(2) + " ₺";
      } else {
        document.getElementById("gold-price").innerHTML = "--";
      }
    }

    document.getElementById("weather").innerHTML = "31°C ☀️";

  } catch (e) {
    console.error(e);

    document.getElementById("usd-price").innerHTML = "--";
    document.getElementById("eur-price").innerHTML = "--";
    document.getElementById("gold-price").innerHTML = "--";
    document.getElementById("weather").innerHTML = "--";
  }
}

getData();
setInterval(getData, 60000);
