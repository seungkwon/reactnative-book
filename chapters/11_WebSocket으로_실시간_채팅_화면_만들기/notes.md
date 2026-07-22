# 11장 메모: WebSocket으로 실시간 채팅 화면 만들기
## 장 목표

- WebSocket 연결 상태를 React Native 화면에서 바로 확인하는 채팅 UI를 만든다.
- 메시지 목록, 입력창, 전송 버튼을 연결해 실시간 채팅 화면의 기본 구조를 익힌다.
- 12장에서 서버를 붙이기 전에 클라이언트가 어떤 흐름으로 동작하는지 먼저 이해한다.

## 구성 초안

1. 실시간 채팅이 왜 필요한가
2. WebSocket 연결 상태를 화면에 보여주기
3. 메시지 목록과 말풍선 UI 구성
4. 입력창과 전송 버튼 연결
5. 연결 전송 실패 시 로컬 메시지 처리
6. 결과 화면 확인
7. 정리

## 작업 체크리스트

- [x] 11장 폴더 구조 생성
- [x] Expo 예제 프로젝트 준비
- [x] WebSocket 채팅 UI 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- 이번 장은 서버 구현보다 클라이언트 화면과 연결 흐름 이해에 초점을 둔다.
- `WebSocket` 객체의 `onopen`, `onmessage`, `onerror`, `onclose` 이벤트를 한 번에 정리할 수 있다.
- 12장에서 서버를 만들면 이번 장의 UI가 그대로 실제 채팅 화면으로 이어진다.

## 실행 명령

```powershell
cd chapters/11_WebSocket으로_실시간_채팅_화면_만들기/examples/expo-chat-ui
npx expo start --android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/11_WebSocket으로_실시간_채팅_화면_만들기/examples/expo-chat-ui`
- 핵심 파일: `App.js`
- 주요 학습 요소: WebSocket 연결 상태, 메시지 목록 상태, 전송 버튼 흐름, 채팅 화면 UI
