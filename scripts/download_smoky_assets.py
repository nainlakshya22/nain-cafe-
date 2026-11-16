import os
import urllib.request

TARGETS = {
    "smoky-latte.jpg": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    "cold-coffee.jpg": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    "espresso-crema.jpg": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "cheesecake.jpg": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    "tiramisu.jpg": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    "panini.jpg": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    "sourdough.jpg": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "vinyl-shelf.jpg": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    "cafe-patio.jpg": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    "cafe-interior-warm.jpg": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
}

os.makedirs("public/images", exist_ok=True)
headers = {"User-Agent": "Mozilla/5.0"}

for name, url in TARGETS.items():
    filepath = os.path.join("public/images", name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp, open(filepath, "wb") as f:
            f.write(resp.read())
        print(f"Downloaded {name}: {os.path.getsize(filepath)} bytes")
    except Exception as e:
        print(f"Error {name}: {e}")
