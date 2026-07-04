const API_URL = "https://api.genelpara.com/json/";

async function loadData() {
    try {

        // Döviz
        const dovizRes = await fetch(API_URL + "?list=doviz&sembol=USD,EUR");
        const doviz = await dovizRes.json();

        document.getElementById("usd-price").textContent =
            doviz.USD.satis + " ₺";

        document.getElementById("eur-price").textContent =
            doviz.EUR.satis + " ₺";

        // Altın
        const altinRes = await fetch(API_URL + "?list=altin&sembol=GA,C,Y,T");
        const altin = await altinRes.json();

        document.getElementById("gold-price").textContent =
            altin.GA.satis + " ₺";

        document.getElementById("quarter-price").textContent =
            altin.C.satis + " ₺";

        document.getElementById("half-price").textContent =
            altin.Y.satis + " ₺";

        document.getElementById("full-price").textContent =
            altin.T.satis + " ₺";

        // Hava (şimdilik İzmir örneği)
        const weatherRes = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );
        const weather = await weatherRes.json();

        document.getElementById("weather").textContent =
            weather.current.temperature_2m + "°C";

    } catch (err) {
        console.error(err);

        [
            "usd-price",
            "eur-price",
            "gold-price",
            "quarter-price",
            "half-price",
            "full-price",
            "weather"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "--";
        });
    }
}

loadData();
setInterval(loadData, 60000);
