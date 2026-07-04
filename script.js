async function getRates() {

try {

const res = await fetch("https://open.er-api.com/v6/latest/USD");
const data = await res.json();

const usd = data.rates.TRY;
const eur = (data.rates.TRY / data.rates.EUR);

document.getElementById("usd-price").innerHTML =
"₺" + usd.toFixed(2);

document.getElementById("eur-price").innerHTML =
"₺" + eur.toFixed(2);

// Şimdilik yaklaşık hesap
document.getElementById("gold-price").innerHTML =
"Canlı API";

document.getElementById("weather").innerHTML =
"Yakında";

}
catch(e){

console.log(e);

}

}

getRates();
