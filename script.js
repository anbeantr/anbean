const API_URL = "./data.json";

async function loadData() {
    try {

        const response = await fetch(API_URL + "?t=" + Date.now());
        const data = await response.json();

        // Döviz
        document.getElementById("usd-price").textContent =
            data.usd.toLocaleString("tr-TR") + " ₺";

        document.getElementById("eur-price").textContent =
            data.eur.toLocaleString("tr-TR") + " ₺";

        // Altınlar
        document.getElementById("gold-price").textContent =
            data.gram.toLocaleString("tr-TR") + " ₺";

        const quarter = document.getElementById("quarter-price");
        if (quarter)
            quarter.textContent = data.quarter.toLocaleString("tr-TR") + " ₺";

        const half = document.getElementById("half-price");
        if (half)
            half.textContent = data.half.toLocaleString("tr-TR") + " ₺";

        const full = document.getElementById("full-price");
        if (full)
            full.textContent = data.full.toLocaleString("tr-TR") + " ₺";

        const cumhuriyet = document.getElementById("cumhuriyet-price");
        if (cumhuriyet)
            cumhuriyet.textContent = data.cumhuriyet.toLocaleString("tr-TR") + " ₺";

        // Hava Durumu
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weather = await weatherResponse.json();

        document.getElementById("weather").textContent =
            weather.current.temperature_2m + "°C";

    } catch (err) {
        console.error(err);

        [
            "gold-price",
            "quarter-price",
            "half-price",
            "full-price",
            "cumhuriyet-price",
            "usd-price",
            "eur-price",
            "weather"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "--";
        });
    }
}

loadData();
setInterval(loadData, 60000);
