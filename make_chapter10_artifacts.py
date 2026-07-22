from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "10_선택한_이미지를_프로필_화면에_적용하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch10_profile_image.jpg"


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
    name_font = load_font(42, bold=True)
    role_font = load_font(28, bold=True)
    helper_font = load_font(26)
    button_font = load_font(28, bold=True)

    draw.text((68, 82), "Chapter 10", font=badge_font, fill="#0891b2")
    draw.text((68, 132), "프로필 이미지 적용", font=title_font, fill="#0f172a")
    draw.text((68, 212), "선택한 이미지를 프로필 카드의 실제 아바타로 반영합니다.", font=subtitle_font, fill="#475569")

    card = (52, 324, 1028, 1052)
    draw.rounded_rectangle(card, radius=42, fill="#ffffff")
    draw.ellipse((380, 392, 700, 712), fill="#67e8f9")
    draw.ellipse((430, 442, 650, 662), fill="#0891b2")
    draw.text((284, 760), "리액트 프로필 사용자", font=name_font, fill="#0f172a")
    draw.text((360, 822), "Mobile UI Explorer", font=role_font, fill="#0891b2")
    draw.multiline_text(
        (202, 886),
        "갤러리에서 이미지를 선택했습니다.",
        font=helper_font,
        fill="#334155",
        spacing=4,
        align="center",
    )

    button1 = (52, 1116, 1028, 1206)
    button2 = (52, 1232, 1028, 1322)
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
