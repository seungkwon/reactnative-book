from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "04_FlatList로_목록_화면_만들기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
EXAMPLE_ASSETS_DIR = CHAPTER_DIR / "examples" / "expo-flatlist-profiles" / "assets"
AVATAR_PATH = EXAMPLE_ASSETS_DIR / "profile-card-avatar.png"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch4_flatlist_profiles.jpg"


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
    name_font = load_font(34, bold=True)
    role_font = load_font(24, bold=True)
    body_font = load_font(24)
    button_font = load_font(24, bold=True)

    draw.text((68, 82), "Chapter 04", font=badge_font, fill="#2563eb")
    draw.text((68, 132), "추천 프로필 목록", font=title_font, fill="#0f172a")
    draw.text((68, 214), "FlatList로 여러 개의 카드를 반복 렌더링합니다.", font=subtitle_font, fill="#475569")

    avatar_source = Image.open(AVATAR_PATH) if AVATAR_PATH.exists() else Image.new("RGB", (240, 240), "#38bdf8")
    avatar, mask = rounded_avatar(avatar_source, 124)

    cards = [
        ("리액트 쌤", "React Native State Starter", "새 글 알림을 받고 있는 프로필입니다.", "#0f766e", "팔로잉"),
        ("모바일 메이트", "UI Component Explorer", "팔로우 버튼으로 목록 상태를 바꿔 보세요.", "#2563eb", "팔로우"),
        ("앱 빌더", "FlatList Practice Partner", "팔로우 버튼으로 목록 상태를 바꿔 보세요.", "#2563eb", "팔로우"),
    ]

    top = 310
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
        top += 254

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
