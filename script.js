const API_URL = "./data.json";

async function loadData() {
    try {

        // GitHub Actions'ın oluşturduğu data.json'u oku
        const response = await fetch(API_URL + "?t=" + Date.now());
        const data = await response.json();

        document.getElementById("usd-price").textContent =
            data.USD.satis + " ₺";

        document.getElementById("eur-price").textContent =
            data.EUR.satis + " ₺";

        document.getElementById("gold-price").textContent =
            data.GA.satis + " ₺";

        document.getElementById("quarter-price").textContent =
            data.C.satis + " ₺";

        document.getElementById("half-price").textContent =
            data.Y.satis + " ₺";

        document.getElementById("full-price").textContent =
            data.T.satis + " ₺";

        // Hava Durumu
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weatherJson = await weatherResponse.json();

        document.getElementById("weather").textContent =
            weatherJson.current.temperature_2m + "°C";

    } catch (err) {
        console.error(err);

        [
            "gold-price",
            "quarter-price",
            "half-price",
            "full-price",
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
