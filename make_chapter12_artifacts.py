from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
CHAPTER_DIR = ROOT / "chapters" / "12_채팅_서버_구축과_메시지_브로드캐스트"
ARTIFACTS_DIR = CHAPTER_DIR / "artifacts"
SCREENSHOT_PATH = ARTIFACTS_DIR / "ch12_websocket_server.jpg"


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
            "C:/Windows/Fonts/consola.ttf",
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
    width, height = 1600, 1000
    image = Image.new("RGB", (width, height), "#e0f2fe")
    draw = ImageDraw.Draw(image)

    title_font = load_font(44, bold=True)
    subtitle_font = load_font(24)
    console_font = load_font(24)
    bubble_font = load_font(22)
    label_font = load_font(24, bold=True)

    draw.text((56, 36), "Chapter 12", font=subtitle_font, fill="#0369a1")
    draw.text((56, 74), "채팅 서버 구축과 메시지 브로드캐스트", font=title_font, fill="#0f172a")
    draw.text((56, 134), "Node.js WebSocket 서버가 두 클라이언트 사이에서 메시지를 전달하는 모습", font=subtitle_font, fill="#475569")

    console_box = (56, 210, 820, 920)
    draw.rounded_rectangle(console_box, radius=28, fill="#0f172a")
    draw.text((86, 240), "server.js", font=label_font, fill="#f8fafc")

    console_lines = [
        "[server] WebSocket chat server listening on ws://0.0.0.0:8080",
        "[connect] user-101 joined. total=1",
        "[connect] user-102 joined. total=2",
        "[message] user-101: 안녕하세요. 서버 연결 확인합니다.",
        "[message] user-102: 반갑습니다. 브로드캐스트가 도착했습니다.",
        "[close] user-101 left. total=1",
    ]
    y = 298
    for line in console_lines:
        draw.text((86, y), line, font=console_font, fill="#dbeafe")
        y += 72

    phone_left = (930, 220, 1220, 900)
    phone_right = (1260, 220, 1550, 900)
    for box, title in [(phone_left, "Client A"), (phone_right, "Client B")]:
        draw.rounded_rectangle(box, radius=36, fill="#ffffff")
        draw.text((box[0] + 82, box[1] + 28), title, font=label_font, fill="#0f172a")
        draw.rounded_rectangle((box[0] + 30, box[1] + 90, box[0] + 180, box[1] + 132), radius=18, fill="#dbeafe")
        draw.text((box[0] + 56, box[1] + 98), "연결됨", font=bubble_font, fill="#0f172a")

    draw.rounded_rectangle((955, 400, 1188, 484), radius=24, fill="#2563eb")
    draw.text((982, 426), "안녕하세요. 서버 연결 확인합니다.", font=bubble_font, fill="#ffffff")
    draw.rounded_rectangle((1285, 520, 1518, 604), radius=24, fill="#ffffff")
    draw.text((1310, 546), "반갑습니다. 브로드캐스트가", font=bubble_font, fill="#0f172a")
    draw.text((1330, 576), "도착했습니다.", font=bubble_font, fill="#0f172a")
    draw.rounded_rectangle((1285, 388, 1518, 472), radius=24, fill="#dbeafe")
    draw.text((1320, 416), "[system] user-101 님이 입장했습니다.", font=bubble_font, fill="#0f172a")

    image.save(SCREENSHOT_PATH, format="JPEG", quality=95)
    print(str(SCREENSHOT_PATH))


if __name__ == "__main__":
    main()
