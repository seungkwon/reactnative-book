from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "09_카메라와_이미지_갤러리_연동하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch9_image_picker.jpg"


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
    image = Image.new("RGB", (width, height), "#ecfeff")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(56, bold=True)
    subtitle_font = load_font(28)
    placeholder_title = load_font(42, bold=True)
    placeholder_text = load_font(26)
    helper_font = load_font(26)
    button_font = load_font(28, bold=True)

    draw.text((68, 82), "Chapter 09", font=badge_font, fill="#0891b2")
    draw.text((68, 132), "카메라와 갤러리 연동", font=title_font, fill="#0f172a")
    draw.text((68, 212), "기기 사진을 선택하거나 촬영한 뒤 바로 미리보기 화면에 반영합니다.", font=subtitle_font, fill="#475569")

    card = (52, 326, 1028, 1132)
    draw.rounded_rectangle(card, radius=42, fill="#ffffff")
    preview = (92, 372, 988, 776)
    draw.rounded_rectangle(preview, radius=34, fill="#cffafe")
    draw.text((364, 516), "Image Preview", font=placeholder_title, fill="#0f172a")
    draw.text((344, 590), "아직 선택된 이미지가 없습니다.", font=placeholder_text, fill="#475569")
    draw.text((112, 830), "아직 이미지를 선택하지 않았습니다.", font=helper_font, fill="#334155")

    button1 = (52, 1180, 1028, 1270)
    button2 = (52, 1294, 1028, 1384)
    draw.rounded_rectangle(button1, radius=28, fill="#0891b2")
    draw.rounded_rectangle(button2, radius=28, fill="#ffffff", outline="#67e8f9", width=3)

    bbox1 = draw.textbbox((0, 0), "갤러리에서 선택", font=button_font)
    x1 = button1[0] + ((button1[2] - button1[0]) - (bbox1[2] - bbox1[0])) / 2
    y1 = button1[1] + ((button1[3] - button1[1]) - (bbox1[3] - bbox1[1])) / 2 - 2
    draw.text((x1, y1), "갤러리에서 선택", font=button_font, fill="#ffffff")

    bbox2 = draw.textbbox((0, 0), "카메라로 촬영", font=button_font)
    x2 = button2[0] + ((button2[2] - button2[0]) - (bbox2[2] - bbox2[0])) / 2
    y2 = button2[1] + ((button2[3] - button2[1]) - (bbox2[3] - bbox2[1])) / 2 - 2
    draw.text((x2, y2), "카메라로 촬영", font=button_font, fill="#0f172a")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
