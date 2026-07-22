from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "14_구글_맵으로_현재_위치와_마커_표시하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch14_current_location_map.jpg"


def load_font(size: int, bold: bool = False):
    candidates = []
    if bold:
        candidates.extend(
            [
                "C:/Windows/Fonts/malgunbd.ttf",
                "C:/Windows/Fonts/segoeuib.ttf",
                "C:/Windows/Fonts/arialbd.ttf",
            ]
        )
    candidates.extend(
        [
            "C:/Windows/Fonts/malgun.ttf",
            "C:/Windows/Fonts/segoeui.ttf",
            "C:/Windows/Fonts/arial.ttf",
        ]
    )
    for path in candidates:
        font_path = Path(path)
        if font_path.exists():
            return ImageFont.truetype(str(font_path), size)
    return ImageFont.load_default()


def main() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    width, height = 1080, 1920
    image = Image.new("RGB", (width, height), "#f0f9ff")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(54, bold=True)
    subtitle_font = load_font(26)
    label_font = load_font(22, bold=True)
    body_font = load_font(24)
    button_font = load_font(28, bold=True)

    draw.text((60, 82), "Chapter 14", font=badge_font, fill="#0284c7")
    draw.text((60, 128), "현재 위치 지도", font=title_font, fill="#0f172a")
    draw.text((60, 206), "위치 권한을 요청하고 현재 좌표를 지도 중심과 마커에 반영합니다.", font=subtitle_font, fill="#475569")

    info = (44, 310, 1036, 580)
    draw.rounded_rectangle(info, radius=36, fill="#ffffff")
    draw.text((84, 354), "권한 상태", font=label_font, fill="#0284c7")
    draw.text((84, 392), "권한 허용됨", font=body_font, fill="#334155")
    draw.text((84, 470), "현재 좌표", font=label_font, fill="#0284c7")
    draw.text((84, 508), "위도 37.56650 / 경도 126.97800", font=body_font, fill="#334155")

    button = (44, 612, 1036, 704)
    draw.rounded_rectangle(button, radius=28, fill="#0284c7")
    draw.text((366, 642), "현재 위치 가져오기", font=button_font, fill="#ffffff")

    map_box = (44, 736, 1036, 1820)
    draw.rounded_rectangle(map_box, radius=36, fill="#dbeafe")

    for x in range(100, 980, 120):
        draw.line((x, 780, x, 1780), fill="#bfdbfe", width=3)
    for y in range(790, 1760, 120):
        draw.line((80, y, 1000, y), fill="#bfdbfe", width=3)

    road = [(130, 1600), (250, 1450), (360, 1320), (470, 1200), (590, 1080), (700, 980), (860, 860)]
    draw.line(road, fill="#93c5fd", width=24)
    river = [(900, 820), (840, 1010), (790, 1180), (720, 1420), (650, 1700)]
    draw.line(river, fill="#7dd3fc", width=34)
    draw.ellipse((502, 1214, 578, 1290), fill="#ef4444")
    draw.ellipse((522, 1234, 558, 1270), fill="#ffffff")
    draw.rounded_rectangle((430, 1306, 650, 1370), radius=18, fill="#ffffff")
    draw.text((470, 1325), "현재 위치", font=label_font, fill="#0f172a")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
