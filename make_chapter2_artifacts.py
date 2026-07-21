from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "02_기본_컴포넌트로_화면_구성하기"
EXAMPLE_ASSETS_DIR = CHAPTER_DIR / "examples" / "expo-basic-components" / "assets"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
AVATAR_PATH = EXAMPLE_ASSETS_DIR / "profile-card-avatar.png"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch2_profile_card.jpg"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
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


def make_avatar() -> None:
    EXAMPLE_ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    image = Image.new("RGB", (240, 240), "#38bdf8")
    draw = ImageDraw.Draw(image)

    for y in range(240):
        ratio = y / 239
        r = int(14 + (56 - 14) * ratio)
        g = int(116 + (189 - 116) * ratio)
        b = int(144 + (248 - 144) * ratio)
        draw.line((0, y, 239, y), fill=(r, g, b))

    draw.ellipse((24, 24, 216, 216), fill="#e0f2fe")
    draw.ellipse((72, 54, 168, 150), fill="#0f172a")
    draw.rounded_rectangle((64, 136, 176, 210), radius=30, fill="#0f172a")

    image.save(AVATAR_PATH)


def centered_text(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, font, fill: str) -> None:
    left, top, right, bottom = box
    bbox = draw.multiline_textbbox((0, 0), text, font=font, spacing=4, align="center")
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    x = left + ((right - left) - width) / 2
    y = top + ((bottom - top) - height) / 2
    draw.multiline_text((x, y), text, font=font, fill=fill, spacing=4, align="center")


def make_screenshot() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

    width, height = 1080, 1920
    image = Image.new("RGB", (width, height), "#e0f2fe")
    draw = ImageDraw.Draw(image)

    card_left = 140
    card_top = 420
    card_right = width - 140
    card_bottom = 1500

    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (card_left + 10, card_top + 24, card_right + 10, card_bottom + 24),
        radius=56,
        fill=(15, 23, 42, 22),
    )
    image = Image.alpha_composite(image.convert("RGBA"), shadow).convert("RGB")
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle((card_left, card_top, card_right, card_bottom), radius=56, fill="#ffffff")

    badge_font = load_font(30, bold=True)
    name_font = load_font(54, bold=True)
    role_font = load_font(32, bold=True)
    body_font = load_font(30)
    input_font = load_font(30)
    button_font = load_font(32, bold=True)

    centered_text(draw, (card_left, 480, card_right, 540), "Chapter 02", badge_font, "#0284c7")

    avatar = Image.open(AVATAR_PATH).convert("RGB").resize((216, 216))
    avatar_mask = Image.new("L", (216, 216), 0)
    ImageDraw.Draw(avatar_mask).ellipse((0, 0, 215, 215), fill=255)
    image.paste(avatar, (432, 580), avatar_mask)

    centered_text(draw, (card_left + 60, 840, card_right - 60, 920), "코딩하는 리액트 개발자", name_font, "#0f172a")
    centered_text(draw, (card_left + 60, 930, card_right - 60, 980), "React Native UI Starter", role_font, "#0369a1")
    centered_text(
        draw,
        (card_left + 70, 1010, card_right - 70, 1140),
        "View, Text, Image, TextInput,\nPressable을 한 화면에서 연습합니다.",
        body_font,
        "#475569",
    )

    input_box = (card_left + 70, 1180, card_right - 70, 1290)
    draw.rounded_rectangle(input_box, radius=28, fill="#f8fafc", outline="#bae6fd", width=3)
    draw.text((input_box[0] + 34, input_box[1] + 32), "별명을 입력해 보세요", font=input_font, fill="#94a3b8")

    button_box = (card_left + 70, 1330, card_right - 70, 1445)
    draw.rounded_rectangle(button_box, radius=28, fill="#0284c7")
    centered_text(draw, button_box, "프로필 완성하기", button_font, "#ffffff")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)


def main() -> None:
    make_avatar()
    make_screenshot()
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
