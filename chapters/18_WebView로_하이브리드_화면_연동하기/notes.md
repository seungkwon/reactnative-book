# 18장 메모: WebView로 하이브리드 화면 연동하기
## 장 목표

- `react-native-webview`로 웹 화면을 앱 안에 임베드한다.
- WebView와 네이티브 앱 사이에서 메시지를 주고받는 하이브리드 기본 구조를 만든다.
- URL 로딩, 인라인 HTML, postMessage 통신 흐름을 이해한다.

## 구성 초안

1. 하이브리드 앱이 필요한 이유
2. WebView 기본 구성
3. 웹에서 네이티브로 메시지 보내기
4. 네이티브에서 웹으로 명령 전달하기
5. 결과 화면 확인
6. 정리

## 작업 체크리스트

- [x] 18장 폴더 구조 생성
- [x] WebView 하이브리드 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- react-native-webview 공식 저장소는 2026년 2월 27일 릴리스된 `v13.16.1`을 최신 버전으로 보여 준다.
- 공식 가이드는 `source`, `injectedJavaScript`, `onMessage`를 WebView의 대표적인 기본 흐름으로 설명한다.
- 하이브리드 앱은 결국 네이티브 화면과 웹 화면이 어디서 데이터를 주고받는지 경계를 분명히 잡는 것이 핵심이다.

## 실행 명령

```powershell
cd chapters/18_WebView로_하이브리드_화면_연동하기/examples/rn-webview-hybrid
npm install
npm run android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/18_WebView로_하이브리드_화면_연동하기/examples/rn-webview-hybrid`
- 핵심 파일: `App.js`
- 주요 학습 요소: WebView source, onMessage, injectJavaScript, 하이브리드 메시지 통신
