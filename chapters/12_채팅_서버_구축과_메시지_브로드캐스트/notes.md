# 12장 메모: 채팅 서버 구축과 메시지 브로드캐스트
## 장 목표

- Node.js와 `ws` 패키지로 가장 단순한 WebSocket 채팅 서버를 만든다.
- 여러 클라이언트가 접속했을 때 한 사용자의 메시지를 모두에게 전달하는 브로드캐스트 흐름을 익힌다.
- 11장에서 만든 React Native 채팅 화면과 실제 서버를 연결하는 방법을 정리한다.

## 구성 초안

1. 왜 서버가 필요한가
2. `ws` 패키지와 서버 기본 구조
3. 접속, 종료, 메시지 수신 이벤트 처리
4. 모든 클라이언트에 메시지 전달하기
5. React Native 클라이언트와 연결하기
6. 실행 결과 확인
7. 정리

## 작업 체크리스트

- [x] 12장 폴더 구조 생성
- [x] Node.js WebSocket 서버 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- 서버는 결국 접속 목록을 관리하고, 들어온 메시지를 다른 사용자에게 다시 보내는 역할을 한다.
- `wss.clients` 순회와 `client.readyState === WebSocket.OPEN` 조건이 브로드캐스트의 핵심이다.
- 다음 장의 FCM 푸시나 이후의 실시간 기능도 "서버가 이벤트를 받아 여러 곳에 전달한다"는 흐름 위에서 이해할 수 있다.

## 실행 명령

```powershell
cd chapters/12_채팅_서버_구축과_메시지_브로드캐스트/examples/websocket-chat-server
npm install
npm start
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/12_채팅_서버_구축과_메시지_브로드캐스트/examples/websocket-chat-server`
- 핵심 파일: `server.js`
- 주요 학습 요소: 접속 관리, 메시지 브로드캐스트, WebSocket 서버 이벤트 흐름
