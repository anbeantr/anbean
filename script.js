async function getData() {
  try {

    // USD
    const usd = await fetch("https://api.frankfurter.app/latest?from=USD&to=TRY")
      .then(r => r.json());

    document.getElementById("usd-price").textContent =
      usd.rates.TRY.toFixed(2) + " ₺";

    // EUR
    const eur = await fetch("https://api.frankfurter.app/latest?from=EUR&to=TRY")
      .then(r => r.json());

    document.getElementById("eur-price").textContent =
      eur.rates.TRY.toFixed(2) + " ₺";

    // Gram Altın
    const gold = await fetch("https://finans.truncgil.com/today.json")
      .then(r => r.json());

    const gram = gold["Gram Altın"];

    document.getElementById("gold-price").textContent =
      gram ? gram + " ₺" : "--";

    // Şimdilik
    document.getElementById("quarter-price").textContent = "Yakında";
    document.getElementById("half-price").textContent = "Yakında";
    document.getElementById("full-price").textContent = "Yakında";

    // Hava
    const weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m")
      .then(r => r.json());

    document.getElementById("weather").textContent =
      weather.current.temperature_2m + "°C";

  } catch (e) {
    console.log(e);
  }
}

getData();
setInterval(getData,60000);
