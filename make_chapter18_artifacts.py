from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "18_WebView로_하이브리드_화면_연동하기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch18_webview_hybrid.jpg"


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
    image = Image.new("RGB", (width, height), "#dbeafe")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(52, bold=True)
    subtitle_font = load_font(25)
    body_font = load_font(24)
    label_font = load_font(22, bold=True)
    button_font = load_font(26, bold=True)

    draw.text((60, 82), "Chapter 18", font=badge_font, fill="#2563eb")
    draw.text((60, 128), "WebView 하이브리드", font=title_font, fill="#0f172a")
    draw.text((60, 202), "웹 화면과 네이티브 화면이 서로 메시지를 주고받는 구조", font=subtitle_font, fill="#334155")

    message_box = (44, 304, 1036, 560)
    draw.rounded_rectangle(message_box, radius=34, fill="#ffffff")
    draw.text((84, 348), "최근 수신 메시지", font=label_font, fill="#2563eb")
    draw.text((84, 404), "웹 화면에서 보낸 이벤트 / 2026-07-22T09:20:00.000Z", font=body_font, fill="#334155")

    button = (44, 588, 1036, 680)
    draw.rounded_rectangle(button, radius=22, fill="#0f172a")
    draw.text((314, 620), "네이티브에서 웹으로 보내기", font=button_font, fill="#ffffff")

    webview = (44, 714, 1036, 1820)
    draw.rounded_rectangle(webview, radius=34, fill="#ffffff")
    inner = (92, 782, 988, 1704)
    draw.rounded_rectangle(inner, radius=30, fill="#eff6ff")
    draw.text((136, 834), "하이브리드 이벤트 패널", font=button_font, fill="#0f172a")
    draw.text((136, 892), "이 버튼을 누르면 WebView 안의 웹 화면이", font=body_font, fill="#475569")
    draw.text((136, 932), "React Native 쪽으로 메시지를 보냅니다.", font=body_font, fill="#475569")
    draw.rounded_rectangle((136, 1020, 944, 1100), radius=18, fill="#2563eb")
    draw.text((374, 1048), "웹에서 네이티브로 전달", font=button_font, fill="#ffffff")
    draw.text((136, 1168), "React Native에서 보낸 확인 메시지가", font=body_font, fill="#334155")
    draw.text((136, 1208), "웹 화면에 반영되었습니다.", font=body_font, fill="#334155")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
