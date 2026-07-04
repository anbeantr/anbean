const API_URL = "https://api.genelpara.com/json/";

async function loadData() {
    try {

        // Döviz
        const dovizResponse = await fetch(API_URL + "?list=doviz&sembol=USD,EUR");
        const dovizJson = await dovizResponse.json();

        if (dovizJson.success && dovizJson.data) {
            document.getElementById("usd-price").textContent =
                dovizJson.data.USD.satis + " ₺";

            document.getElementById("eur-price").textContent =
                dovizJson.data.EUR.satis + " ₺";
        }

        // Altın
        const altinResponse = await fetch(API_URL + "?list=altin&sembol=GA,C,Y,T");
        const altinJson = await altinResponse.json();

        if (altinJson.success && altinJson.data) {
            document.getElementById("gold-price").textContent =
                altinJson.data.GA.satis + " ₺";

            document.getElementById("quarter-price").textContent =
                altinJson.data.C.satis + " ₺";

            document.getElementById("half-price").textContent =
                altinJson.data.Y.satis + " ₺";

            document.getElementById("full-price").textContent =
                altinJson.data.T.satis + " ₺";
        }

        // Hava Durumu (İzmir)
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weatherJson = await weatherResponse.json();

        if (weatherJson.current) {
            document.getElementById("weather").textContent =
                weatherJson.current.temperature_2m + "°C";
        }

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
