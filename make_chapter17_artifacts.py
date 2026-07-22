from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "17_Native_SDK로_소셜_로그인과_회원가입_구현하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch17_social_auth.jpg"


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
    image = Image.new("RGB", (width, height), "#fef3c7")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(52, bold=True)
    subtitle_font = load_font(25)
    body_font = load_font(24)
    label_font = load_font(22, bold=True)
    button_font = load_font(28, bold=True)

    draw.text((60, 82), "Chapter 17", font=badge_font, fill="#d97706")
    draw.text((60, 128), "소셜 로그인 회원가입", font=title_font, fill="#451a03")
    draw.text((60, 202), "카카오와 Apple 로그인으로 회원가입을 시작하는 화면", font=subtitle_font, fill="#92400e")

    login_box = (44, 300, 1036, 760)
    draw.rounded_rectangle(login_box, radius=34, fill="#ffffff")
    draw.rounded_rectangle((84, 360, 996, 448), radius=22, fill="#fee500")
    draw.text((378, 390), "카카오로 시작하기", font=button_font, fill="#191919")
    draw.rounded_rectangle((84, 474, 996, 562), radius=22, fill="#111827")
    draw.text((364, 504), "Sign in with Apple", font=button_font, fill="#ffffff")
    draw.text((84, 620), "카카오 계정으로 회원가입을 완료했습니다.", font=body_font, fill="#92400e")

    profile_box = (44, 800, 1036, 1140)
    draw.rounded_rectangle(profile_box, radius=34, fill="#ffffff")
    draw.text((84, 844), "가입 결과", font=label_font, fill="#d97706")
    draw.text((84, 892), "홍길동 님 가입 완료", font=body_font, fill="#451a03")
    draw.text((84, 944), "로그인 방식: kakao", font=body_font, fill="#4b5563")
    draw.text((84, 996), "이메일: gildong@example.com", font=body_font, fill="#4b5563")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
