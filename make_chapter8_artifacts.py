from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "08_목록에서_상세_화면으로_이동하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
EXAMPLE_ASSETS_DIR = CHAPTER_DIR / "examples" / "expo-profile-detail" / "assets"
AVATAR_PATH = EXAMPLE_ASSETS_DIR / "profile-card-avatar.png"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch8_profile_detail.jpg"


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
    title_font = load_font(56, bold=True)
    subtitle_font = load_font(28)
    input_font = load_font(26)
    chip_font = load_font(24, bold=True)
    name_font = load_font(34, bold=True)
    role_font = load_font(24, bold=True)
    body_font = load_font(24)
    button_font = load_font(24, bold=True)
    detail_label_font = load_font(22, bold=True)
    detail_name_font = load_font(40, bold=True)
    detail_role_font = load_font(24, bold=True)
    detail_body_font = load_font(26)

    draw.text((68, 82), "Chapter 08", font=badge_font, fill="#2563eb")
    draw.text((68, 132), "프로필 상세 보기", font=title_font, fill="#0f172a")
    draw.text((68, 212), "목록에서 선택한 프로필의 상세 정보를 아래 카드에서 확인합니다.", font=subtitle_font, fill="#475569")

    search_box = (68, 286, 1012, 362)
    draw.rounded_rectangle(search_box, radius=24, fill="#ffffff", outline="#bfdbfe", width=3)
    draw.text((98, 312), "react", font=input_font, fill="#0f172a")

    chip1 = (68, 388, 264, 452)
    chip2 = (282, 388, 426, 452)
    draw.rounded_rectangle(chip1, radius=32, fill="#1d4ed8")
    draw.rounded_rectangle(chip2, radius=32, fill="#dbeafe")
    draw.text((105, 408), "팔로잉 우선", font=chip_font, fill="#ffffff")
    draw.text((322, 408), "이름순", font=chip_font, fill="#1d4ed8")

    avatar_source = Image.open(AVATAR_PATH) if AVATAR_PATH.exists() else Image.new("RGB", (240, 240), "#38bdf8")
    avatar, mask = rounded_avatar(avatar_source, 124)

    cards = [
        ("리액트 쌤", "React Native State Starter", "새 글 알림을 받고 있는 프로필입니다.", "#0f766e", "팔로잉", True),
        ("컴포넌트 연구원", "Search UI Builder", "새 글 알림을 받고 있는 프로필입니다.", "#0f766e", "팔로잉", False),
    ]

    top = 512
    for name, role, desc, button_color, label, selected in cards:
        card_box = (52, top, width - 52, top + 228)
        draw.rounded_rectangle(card_box, radius=38, fill="#ffffff")
        if selected:
            draw.rounded_rectangle(card_box, radius=38, outline="#60a5fa", width=4)
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

    detail_box = (52, 1048, width - 52, 1326)
    draw.rounded_rectangle(detail_box, radius=38, fill="#ffffff")
    draw.text((84, 1088), "선택한 프로필", font=detail_label_font, fill="#2563eb")
    draw.text((84, 1132), "리액트 쌤", font=detail_name_font, fill="#0f172a")
    draw.text((84, 1190), "React Native State Starter", font=detail_role_font, fill="#2563eb")
    draw.multiline_text(
        (84, 1240),
        "현재 팔로잉 중이며, 새 글 알림을 받고 있습니다.",
        font=detail_body_font,
        fill="#475569",
        spacing=4,
    )

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
