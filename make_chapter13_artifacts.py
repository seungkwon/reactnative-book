from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "13_FCM_푸시_메시지_연동하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch13_fcm_push.jpg"


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
    width, height = 1400, 960
    image = Image.new("RGB", (width, height), "#ecfccb")
    draw = ImageDraw.Draw(image)

    title_font = load_font(44, bold=True)
    subtitle_font = load_font(22)
    label_font = load_font(24, bold=True)
    body_font = load_font(22)
    small_font = load_font(18)

    draw.text((56, 40), "Chapter 13", font=subtitle_font, fill="#65a30d")
    draw.text((56, 76), "FCM 푸시 메시지 연동하기", font=title_font, fill="#1a2e05")
    draw.text((56, 132), "토큰 발급과 Admin SDK 발송 흐름을 함께 확인하는 예시", font=subtitle_font, fill="#4d7c0f")

    phone = (60, 210, 620, 900)
    draw.rounded_rectangle(phone, radius=36, fill="#ffffff")
    draw.text((96, 244), "rn-fcm-client", font=label_font, fill="#1a2e05")
    draw.text((96, 304), "권한 상태", font=small_font, fill="#65a30d")
    draw.text((96, 334), "권한 허용됨", font=body_font, fill="#1f2937")
    draw.text((96, 404), "FCM 토큰", font=small_font, fill="#65a30d")
    draw.multiline_text(
        (96, 436),
        "fcm_token_abc123xyz\n...\nregistered_for_device",
        font=small_font,
        fill="#334155",
        spacing=8,
    )
    draw.rounded_rectangle((96, 560, 584, 628), radius=20, fill="#65a30d")
    draw.text((206, 582), "권한 요청 및 토큰 발급", font=body_font, fill="#ffffff")
    draw.text((96, 682), "수신 로그", font=label_font, fill="#1a2e05")
    for y, text in [
        (730, "FCM 토큰을 발급받았습니다."),
        (790, "FCM 테스트 메시지: Firebase Admin SDK에서 보낸 푸시 알림입니다."),
    ]:
        draw.rounded_rectangle((96, y, 584, y + 48), radius=18, fill="#f7fee7")
        draw.text((114, y + 12), text, font=small_font, fill="#334155")

    console = (700, 230, 1340, 870)
    draw.rounded_rectangle(console, radius=30, fill="#0f172a")
    draw.text((734, 266), "fcm-admin-sender / send-message.js", font=label_font, fill="#f8fafc")
    lines = [
        "$ npm start -- <FCM_TOKEN>",
        "Successfully sent message:",
        "projects/demo-project/messages/0:1923123123%abcd1234",
        "",
        "notification.title = FCM 테스트 메시지",
        "notification.body  = Firebase Admin SDK에서 보낸 푸시 알림입니다.",
    ]
    y = 334
    for line in lines:
      draw.text((734, y), line, font=body_font, fill="#dbeafe")
      y += 58

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
