# 13장 메모: FCM 푸시 메시지 연동하기
## 장 목표

- Expo Push를 사용하지 않고 Firebase Cloud Messaging 기반의 네이티브 푸시 흐름을 이해한다.
- React Native 앱에서 FCM 토큰을 발급받고, 포그라운드/백그라운드 메시지를 처리하는 기본 구조를 만든다.
- Node.js Admin SDK로 특정 디바이스에 테스트 푸시를 보내는 서버 스크립트를 준비한다.

## 구성 초안

1. Expo Push 대신 FCM을 쓰는 이유
2. React Native Firebase Messaging 설치 구조
3. 디바이스 토큰 발급과 권한 요청
4. 포그라운드 메시지와 백그라운드 메시지 처리
5. Firebase Admin SDK로 푸시 보내기
6. 결과 화면 확인
7. 정리

## 작업 체크리스트

- [x] 13장 폴더 구조 생성
- [x] FCM 클라이언트 예제 작성
- [x] Admin SDK 발송 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- React Native Firebase 공식 문서에 따르면 FCM 사용 전 `@react-native-firebase/app`이 먼저 설정되어 있어야 한다.
- 공식 Cloud Messaging 문서는 포그라운드에서는 `onMessage`, 백그라운드/종료 상태에서는 `setBackgroundMessageHandler` 흐름을 권장한다.
- Firebase 공식 서버 문서는 서버 환경에서는 Firebase Admin SDK 사용을 권장한다.

## 실행 명령

```powershell
cd chapters/13_FCM_푸시_메시지_연동하기/examples/rn-fcm-client
npm install
npm run android
```

```powershell
cd chapters/13_FCM_푸시_메시지_연동하기/examples/fcm-admin-sender
npm install
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\keys\service-account.json"
npm start -- <FCM_TOKEN>
```

## 결과 요약

- 클라이언트 예제: `chapters/13_FCM_푸시_메시지_연동하기/examples/rn-fcm-client`
- 서버 예제: `chapters/13_FCM_푸시_메시지_연동하기/examples/fcm-admin-sender`
- 주요 학습 요소: FCM 토큰 발급, foreground/background 처리, Admin SDK 메시지 발송
