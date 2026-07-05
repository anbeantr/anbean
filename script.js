const API_URL = "./data.json";

// =======================
// FİNANS VERİLERİ
// =======================

async function loadData() {

    try {

        const response = await fetch(API_URL + "?t=" + Date.now());

        if (!response.ok) {
            throw new Error("data.json okunamadı");
        }

        const data = await response.json();

        function setValue(id, value, suffix = " ₺") {

            const el = document.getElementById(id);

            if (el && value !== undefined && value !== null) {
                el.textContent =
                    Number(value).toLocaleString("tr-TR") + suffix;
            }

        }

        // Ana kartlar
        setValue("gold-price", data.gram);
        setValue("quarter-price", data.quarter);
        setValue("half-price", data.half);
        setValue("full-price", data.full);
        setValue("cumhuriyet-price", data.cumhuriyet);
        setValue("usd-price", data.usd);
        setValue("eur-price", data.eur);

        // Bloomberg tarzı üst şerit
        setValue("gold-price2", data.gram);
        setValue("quarter-price2", data.quarter);
        setValue("usd-price2", data.usd);
        setValue("eur-price2", data.eur);

    } catch (err) {

        console.error("Finans Hatası:", err);

    }

}

// =======================
// HAVA DURUMU
// =======================

async function loadWeather() {

    try {

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weather = await response.json();

        const weatherEl = document.getElementById("weather");

        if (weatherEl) {
            weatherEl.textContent =
                weather.current.temperature_2m + "°C";
        }

    } catch (err) {

        console.error("Hava Hatası:", err);

    }

}

// =======================
// HABERLER
// =======================

async function loadNews() {

    try {

        const response =
            await fetch("./news.json?t=" + Date.now());

        if (!response.ok) {
            throw new Error("news.json okunamadı");
        }

        const news = await response.json();

        const container =
            document.getElementById("news-list");

        if (!container) return;

        container.innerHTML = "";

        news.slice(0, 10).forEach((item, index) => {

            container.innerHTML += `

            <div class="news-item">

                ${
                    item.image
                        ? `<img src="${item.image}" class="news-image">`
                        : ""
                }

                <h3>${item.title}</h3>

                <p>${item.summary}</
