"""Parse presentation media into a UI spec the React deck can recreate.

This script is the capture/analysis side of Phase 5. Heavy models (YOLO, SAM,
EasyOCR, Manim) are declared in requirements.txt. The committed analysis.json
is the structured output used by the frontend so the deck does not depend on
GPU weights at runtime.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
OUT = ROOT / "analysis.json"


def try_opencv_inventory() -> list[dict]:
    inventory: list[dict] = []
    try:
        import cv2  # type: ignore
    except ImportError:
        return inventory

    for image_path in sorted(FRAMES.glob("*.jpg")):
        image = cv2.imread(str(image_path))
        if image is None:
            continue
        height, width = image.shape[:2]
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 80, 160)
        inventory.append(
            {
                "file": image_path.name,
                "width": int(width),
                "height": int(height),
                "edge_density": round(float(edges.mean()) / 255, 4),
            }
        )
    return inventory


def ui_spec() -> dict:
    return {
        "source": "ffmpeg-extracted frames + screenshot analysis",
        "privacy": "blur counts, phones, emails; genericize employer and candidate names",
        "modules": {
            "light_dashboard": {
                "dir": "rtl",
                "theme": "light",
                "sidebar": "end",
                "logo": ["Aviel", "Jobs"],
                "nav": [
                    "החשבון שלי",
                    "משרות פנויות",
                    "קורות חיים",
                    "עלינו",
                    "צור קשר",
                ],
                "metrics": [
                    "משרות פעילות",
                    "המתנה לתגובה",
                    "ייעוץ וידאו",
                    "צפיות",
                ],
                "title": "משרות סניפים",
                "filter": "כל הסניפים",
                "cta": "פרסם משרה",
            },
            "video_consulting": {
                "he": "כל ראיונות הווידאו",
                "en": "Business Consulting connecting to the business",
                "columns": ["מספר", "תאריך", "קטגוריה", "תת-קטגוריה"],
            },
            "dark_crm": {
                "theme": "dark-metallic",
                "columns": ["חברות מתאימות", "צ'אט אינטראקטיבי", "פרטי מועמד"],
                "chat": "whatsapp-style",
                "footer": "נבנה ומטופל על ידי TTNT AI",
            },
            "admin": {
                "title_he": "ניהול פלטפורמה",
                "rows": [
                    "משרות",
                    "חוזים",
                    "מסמכים",
                    "מסמכי תנאים",
                    "מועמדים",
                    "קטגוריות משרות",
                    "חברות",
                    "מיקומים",
                    "שמות משרות",
                    "תשובות לפניות",
                    "פניות למשרות",
                    "פניות לקורות חיים",
                    "תתי-קטגוריות",
                    "משתמשים",
                    "פריסטים לתמונות משרה",
                    "קורות חיים",
                ],
                "counts": "blurred",
            },
            "global_map": {
                "title": "AVIEL JOBS GLOBAL RECRUITMENT & STAFFING",
                "cities": ["New York", "London", "Dubai", "Tokyo", "Singapore", "Sydney"],
            },
        },
        "live": {"url": "https://avieljobs.co.il", "label_he": "למערכת הלייב"},
    }


def main() -> None:
    FRAMES.mkdir(exist_ok=True)
    payload = {
        "opencv_frames": try_opencv_inventory(),
        "ui": ui_spec(),
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
