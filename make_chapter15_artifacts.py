from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "15_주소를_좌표로_변환해_지도에_표시하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch15_address_geocode.jpg"


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
    image = Image.new("RGB", (width, height), "#fff7ed")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(54, bold=True)
    subtitle_font = load_font(26)
    body_font = load_font(24)
    label_font = load_font(22, bold=True)
    button_font = load_font(28, bold=True)

    draw.text((60, 82), "Chapter 15", font=badge_font, fill="#ea580c")
    draw.text((60, 128), "주소 검색 지도", font=title_font, fill="#431407")
    draw.text((60, 206), "주소 문자열을 좌표로 바꾸고 지도 중심과 마커를 이동합니다.", font=subtitle_font, fill="#7c2d12")

    search_box = (44, 306, 1036, 620)
    draw.rounded_rectangle(search_box, radius=34, fill="#ffffff")
    draw.rounded_rectangle((84, 350, 996, 432), radius=20, fill="#ffedd5")
    draw.text((112, 378), "서울특별시 중구 세종대로 110", font=body_font, fill="#431407")
    draw.rounded_rectangle((84, 458, 996, 538), radius=20, fill="#ea580c")
    draw.text((432, 486), "주소 검색", font=button_font, fill="#ffffff")
    draw.text((84, 566), "주소를 좌표로 변환했습니다.", font=body_font, fill="#7c2d12")

    result_box = (44, 646, 1036, 862)
    draw.rounded_rectangle(result_box, radius=34, fill="#ffffff")
    draw.text((84, 690), "검색 결과", font=label_font, fill="#ea580c")
    draw.text((84, 736), "서울특별시 중구 세종대로 110, 서울특별시청", font=body_font, fill="#431407")
    draw.text((84, 784), "위도 37.56650 / 경도 126.97800", font=body_font, fill="#7c2d12")

    map_box = (44, 890, 1036, 1820)
    draw.rounded_rectangle(map_box, radius=34, fill="#fed7aa")
    for x in range(100, 980, 120):
        draw.line((x, 940, x, 1770), fill="#fdba74", width=3)
    for y in range(940, 1770, 120):
        draw.line((84, y, 1000, y), fill="#fdba74", width=3)
    draw.line((120, 1700, 300, 1500, 520, 1280, 760, 1080, 920, 960), fill="#f59e0b", width=20)
    draw.ellipse((502, 1312, 578, 1388), fill="#dc2626")
    draw.ellipse((522, 1332, 558, 1368), fill="#ffffff")
    draw.rounded_rectangle((394, 1406, 688, 1476), radius=18, fill="#ffffff")
    draw.text((440, 1430), "서울특별시청", font=label_font, fill="#431407")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
