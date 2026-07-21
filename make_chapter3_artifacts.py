from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "03_useState로_화면_바꾸기"
EXAMPLE_ASSETS_DIR = CHAPTER_DIR / "examples" / "expo-state-profile" / "assets"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
AVATAR_PATH = EXAMPLE_ASSETS_DIR / "profile-card-avatar.png"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch3_state_profile.jpg"


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


def centered_text(draw, box, text, font, fill):
    left, top, right, bottom = box
    bbox = draw.multiline_textbbox((0, 0), text, font=font, spacing=4, align="center")
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    x = left + ((right - left) - width) / 2
    y = top + ((bottom - top) - height) / 2
    draw.multiline_text((x, y), text, font=font, fill=fill, spacing=4, align="center")


def make_screenshot() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    EXAMPLE_ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    width, height = 1080, 1920
    image = Image.new("RGB", (width, height), "#dbeafe")
    draw = ImageDraw.Draw(image)

    card_left = 140
    card_top = 420
    card_right = width - 140
    card_bottom = 1525
    draw.rounded_rectangle((card_left, card_top, card_right, card_bottom), radius=56, fill="#ffffff")

    badge_font = load_font(30, bold=True)
    name_font = load_font(54, bold=True)
    role_font = load_font(32, bold=True)
    body_font = load_font(28)
    input_font = load_font(30)
    button_font = load_font(32, bold=True)

    centered_text(draw, (card_left, 480, card_right, 540), "Chapter 03", badge_font, "#2563eb")

    if AVATAR_PATH.exists():
        avatar = Image.open(AVATAR_PATH).convert("RGB").resize((216, 216))
        avatar_mask = Image.new("L", (216, 216), 0)
        ImageDraw.Draw(avatar_mask).ellipse((0, 0, 215, 215), fill=255)
        image.paste(avatar, (432, 580), avatar_mask)

    centered_text(draw, (card_left + 60, 840, card_right - 60, 920), "리액트 쌤", name_font, "#0f172a")
    centered_text(draw, (card_left + 60, 930, card_right - 60, 980), "React Native State Starter", role_font, "#2563eb")
    centered_text(
        draw,
        (card_left + 70, 1010, card_right - 70, 1140),
        "리액트 쌤 님의 새 글 알림을 받고 있습니다.",
        body_font,
        "#475569",
    )

    input_box = (card_left + 70, 1180, card_right - 70, 1290)
    draw.rounded_rectangle(input_box, radius=28, fill="#f8fafc", outline="#bfdbfe", width=3)
    draw.text((input_box[0] + 34, input_box[1] + 32), "리액트 쌤", font=input_font, fill="#0f172a")

    button_box = (card_left + 70, 1330, card_right - 70, 1445)
    draw.rounded_rectangle(button_box, radius=28, fill="#0f766e")
    centered_text(draw, button_box, "팔로잉 취소하기", button_font, "#ffffff")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)


def main() -> None:
    make_screenshot()
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
