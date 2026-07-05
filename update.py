import requests

url = "https://api.genelpara.com/json/?list=doviz&sembol=USD,EUR"

r = requests.get(
    url,
    headers={
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    },
    timeout=20
)

print("STATUS:", r.status_code)
print("TEXT:")
print(r.text)
