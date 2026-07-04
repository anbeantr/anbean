const API_KEY = "apikey BURAYA_YENI_API_KEY";

async function getData() {
  try {

    // Döviz Verileri
    const response = await fetch("https://api.collectapi.com/economy/allCurrency", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": API_KEY
      }
    });

    if (!response.ok) throw new Error("CollectAPI Hatası");

    const data = await response.json();

    const usd = data.result.find(item => item.code === "USD");
    const eur = data.result.find(item => item.code === "EUR");

    if (usd) {
      document.getElementById("usd-price").textContent =
        Number(usd.buying).toFixed(2) + " ₺";
    }

    if (eur) {
      document.getElementById("eur-price").textContent =
        Number(eur.buying).toFixed(2) + " ₺";
    }

    // Finans Kartları (Geçici)
    document.getElementById("gold-price").textContent = "Yakında";
    document.getElementById("quarter-price").textContent = "Yakında";
    document.getElementById("half-price").textContent = "Yakında";
    document.getElementById("full-price").textContent = "Yakında";

    // Hava Durumu (Geçici)
    document.getElementById("weather").textContent = "31°C ☀️";

  } catch (e) {
    console.error(e);

    document.getElementById("usd-price").textContent = "--";
    document.getElementById("eur-price").textContent = "--";
    document.getElementById("gold-price").textContent = "--";
    document.getElementById("quarter-price").textContent = "--";
    document.getElementById("half-price").textContent = "--";
    document.getElementById("full-price").textContent = "--";
    document.getElementById("weather").textContent = "--";
  }
}

getData();
setInterval(getData, 60000);
