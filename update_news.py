import requests
import json
from bs4 import BeautifulSoup

url = "https://api.rss2json.com/v1/api.json?rss_url=https://www.aa.com.tr/tr/rss/default?cat=guncel"

try:
    r = requests.get(url, timeout=20)
    data = r.json()

    news = []

    for item in data.get("items", [])[:10]:

        summary = ""

        if item.get("description"):
            summary = BeautifulSoup(
                item["description"],
                "html.parser"
            ).get_text()

        news.append({
            "title": item.get("title", ""),
            "summary": summary,
            "link": item.get("link", ""),
            "image": item.get("thumbnail", ""),
            "published": item.get("pubDate", "")
        })

    with open("news.json", "w", encoding="utf-8") as f:
        json.dump(news, f, ensure_ascii=False, indent=2)

    print("Haberler güncellendi.")

except Exception as e:
    print("Hata:", e)
