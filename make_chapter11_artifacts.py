from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "11_WebSocket으로_실시간_채팅_화면_만들기"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch11_websocket_chat.jpg"


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


def centered_x(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, font) -> float:
    bbox = draw.textbbox((0, 0), text, font=font)
    return box[0] + ((box[2] - box[0]) - (bbox[2] - bbox[0])) / 2


def main() -> None:
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    width, height = 1080, 1920
    image = Image.new("RGB", (width, height), "#eff6ff")
    draw = ImageDraw.Draw(image)

    badge_font = load_font(28, bold=True)
    title_font = load_font(56, bold=True)
    subtitle_font = load_font(28)
    status_font = load_font(24, bold=True)
    bubble_font = load_font(28)
    time_font = load_font(20)
    button_font = load_font(28, bold=True)

    draw.text((64, 82), "Chapter 11", font=badge_font, fill="#2563eb")
    draw.text((64, 130), "WebSocket 채팅 화면", font=title_font, fill="#0f172a")
    draw.text((64, 214), "연결 상태와 메시지 흐름을 한 화면에서 확인합니다.", font=subtitle_font, fill="#475569")

    status_box = (64, 288, 310, 350)
    draw.rounded_rectangle(status_box, radius=28, fill="#ffffff")
    draw.ellipse((84, 309, 104, 329), fill="#10b981")
    draw.text((120, 302), "연결됨", font=status_font, fill="#0f172a")

    system1 = (236, 402, 844, 494)
    draw.rounded_rectangle(system1, radius=26, fill="#dbeafe")
    draw.text((288, 432), "채팅 서버 연결을 준비합니다.", font=bubble_font, fill="#0f172a")
    draw.text((468, 466), "오전 9:00", font=time_font, fill="#475569")

    other = (64, 546, 654, 700)
    draw.rounded_rectangle(other, radius=32, fill="#ffffff")
    draw.text((98, 584), "12장에서 서버를 만들면 이 화면이", font=bubble_font, fill="#0f172a")
    draw.text((98, 626), "실제 메시지를 주고받습니다.", font=bubble_font, fill="#0f172a")
    draw.text((462, 664), "오전 9:01", font=time_font, fill="#475569")

    mine = (420, 752, 1016, 882)
    draw.rounded_rectangle(mine, radius=32, fill="#2563eb")
    draw.text((456, 794), "안녕하세요. 연결 테스트 중입니다.", font=bubble_font, fill="#ffffff")
    draw.text((840, 842), "오전 9:02", font=time_font, fill="#dbeafe")

    other2 = (64, 938, 586, 1068)
    draw.rounded_rectangle(other2, radius=32, fill="#ffffff")
    draw.text((98, 980), "서버 응답을 기다리는 중입니다.", font=bubble_font, fill="#0f172a")
    draw.text((394, 1028), "오전 9:03", font=time_font, fill="#475569")

    input_box = (32, 1670, 824, 1768)
    send_box = (852, 1670, 1048, 1768)
    draw.rounded_rectangle(input_box, radius=26, fill="#e2e8f0")
    draw.rounded_rectangle(send_box, radius=26, fill="#0f172a")
    draw.text((72, 1702), "보낼 메시지를 입력하세요", font=bubble_font, fill="#64748b")
    send_x = centered_x(draw, send_box, "전송", button_font)
    draw.text((send_x, 1702), "전송", font=button_font, fill="#ffffff")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
