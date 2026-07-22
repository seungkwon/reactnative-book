from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "16_지도_기반_위치_앱_마무리하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch16_location_hub.jpg"


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
    image = Image.new("RGB", (width, height), "#f5f3ff")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(54, bold=True)
    subtitle_font = load_font(25)
    body_font = load_font(24)
    label_font = load_font(22, bold=True)
    button_font = load_font(26, bold=True)

    draw.text((60, 82), "Chapter 16", font=badge_font, fill="#7c3aed")
    draw.text((60, 128), "위치 허브 앱", font=title_font, fill="#2e1065")
    draw.text((60, 206), "현재 위치와 주소 검색을 통합한 위치 기반 앱 화면", font=subtitle_font, fill="#5b21b6")

    search_box = (44, 304, 1036, 654)
    draw.rounded_rectangle(search_box, radius=34, fill="#ffffff")
    draw.rounded_rectangle((84, 346, 996, 428), radius=20, fill="#ede9fe")
    draw.text((112, 374), "서울특별시 중구 세종대로 110", font=body_font, fill="#2e1065")
    draw.rounded_rectangle((84, 458, 526, 536), radius=18, fill="#ddd6fe")
    draw.rounded_rectangle((554, 458, 996, 536), radius=18, fill="#7c3aed")
    draw.text((210, 485), "현재 위치", font=button_font, fill="#4c1d95")
    draw.text((690, 485), "주소 검색", font=button_font, fill="#ffffff")
    draw.text((84, 580), "검색 결과 위치로 이동했습니다.", font=body_font, fill="#5b21b6")

    card = (44, 682, 1036, 930)
    draw.rounded_rectangle(card, radius=34, fill="#ffffff")
    draw.text((84, 724), "선택된 위치", font=label_font, fill="#7c3aed")
    draw.text((84, 772), "검색 결과", font=body_font, fill="#2e1065")
    draw.text((84, 816), "서울특별시 중구 세종대로 110, 서울특별시청", font=body_font, fill="#5b21b6")
    draw.text((84, 862), "위도 37.56650 / 경도 126.97800", font=body_font, fill="#475569")

    map_box = (44, 960, 1036, 1820)
    draw.rounded_rectangle(map_box, radius=34, fill="#ddd6fe")
    for x in range(100, 980, 120):
        draw.line((x, 1010, x, 1770), fill="#c4b5fd", width=3)
    for y in range(1010, 1770, 120):
        draw.line((84, y, 1000, y), fill="#c4b5fd", width=3)
    draw.line((120, 1720, 310, 1510, 520, 1290, 760, 1080, 920, 1000), fill="#8b5cf6", width=18)
    draw.ellipse((504, 1364, 576, 1436), fill="#dc2626")
    draw.ellipse((522, 1382, 558, 1418), fill="#ffffff")
    draw.rounded_rectangle((406, 1452, 674, 1522), radius=18, fill="#ffffff")
    draw.text((452, 1476), "검색 결과", font=label_font, fill="#2e1065")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
