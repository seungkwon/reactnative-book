from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "06_검색으로_목록_필터링하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
EXAMPLE_ASSETS_DIR = CHAPTER_DIR / "examples" / "expo-filter-list" / "assets"
AVATAR_PATH = EXAMPLE_ASSETS_DIR / "profile-card-avatar.png"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch6_filter_list.jpg"


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


def rounded_avatar(image, size):
    avatar = image.resize((size, size)).convert("RGB")
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    return avatar, mask


def main() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    width, height = 1080, 1920
    image = Image.new("RGB", (width, height), "#eff6ff")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(58, bold=True)
    subtitle_font = load_font(29)
    input_font = load_font(26)
    name_font = load_font(34, bold=True)
    role_font = load_font(24, bold=True)
    body_font = load_font(24)
    button_font = load_font(24, bold=True)

    draw.text((68, 82), "Chapter 06", font=badge_font, fill="#2563eb")
    draw.text((68, 132), "프로필 검색하기", font=title_font, fill="#0f172a")
    draw.text((68, 214), "입력한 검색어에 따라 목록 결과가 즉시 좁혀집니다.", font=subtitle_font, fill="#475569")

    search_box = (68, 286, 1012, 362)
    draw.rounded_rectangle(search_box, radius=24, fill="#ffffff", outline="#bfdbfe", width=3)
    draw.text((98, 312), "react", font=input_font, fill="#0f172a")

    avatar_source = Image.open(AVATAR_PATH) if AVATAR_PATH.exists() else Image.new("RGB", (240, 240), "#38bdf8")
    avatar, mask = rounded_avatar(avatar_source, 124)

    cards = [
        ("리액트 쌤", "React Native State Starter", "새 글 알림을 받고 있는 프로필입니다.", "#0f766e", "팔로잉"),
    ]

    top = 420
    for name, role, desc, button_color, label in cards:
        card_box = (52, top, width - 52, top + 228)
        draw.rounded_rectangle(card_box, radius=38, fill="#ffffff")
        image.paste(avatar, (84, top + 52), mask)
        draw.text((236, top + 42), name, font=name_font, fill="#0f172a")
        draw.text((236, top + 88), role, font=role_font, fill="#2563eb")
        draw.multiline_text((236, top + 126), desc, font=body_font, fill="#475569", spacing=4)
        button_box = (850, top + 82, 988, top + 146)
        draw.rounded_rectangle(button_box, radius=32, fill=button_color)
        text_bbox = draw.textbbox((0, 0), label, font=button_font)
        text_x = button_box[0] + ((button_box[2] - button_box[0]) - (text_bbox[2] - text_bbox[0])) / 2
        text_y = button_box[1] + ((button_box[3] - button_box[1]) - (text_bbox[3] - text_bbox[1])) / 2 - 2
        draw.text((text_x, text_y), label, font=button_font, fill="#ffffff")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
