# 1장 메모: 엑스포로 Hello World 만들기

## 장 목표

- Windows 환경에서 Expo 프로젝트를 생성한다.
- Hello World 화면을 직접 만든다.
- 안드로이드 에뮬레이터에서 프로젝트를 실행한다.
- 실행 결과 화면을 캡처한다.
- 소스와 실행 결과를 바탕으로 1장 원고를 완성한다.

## 장 구성 초안

1. Expo와 개발 환경 소개
2. Windows에서 Expo 프로젝트 생성
3. Hello World 화면 작성
4. 안드로이드 에뮬레이터 실행
5. 실행 결과 화면 캡처
6. 마무리 정리

## 작업 체크리스트

- [x] 장 원고용 워드 파일 생성
- [x] Expo 예제 프로젝트 생성
- [x] Hello World 화면 코드 작성
- [x] 안드로이드 에뮬레이터 실행
- [x] 실행 화면 캡처 저장
- [x] 실행 결과 정리
- [x] 원고 본문 완성

## 실행 메모

- 현재 장은 Windows 환경만 다룹니다.
- 필요 시 Android/iOS 설명은 제외하고 Windows에서 가능한 작업만 기록합니다.
- 실행 확인은 Pixel_7 Android 에뮬레이터 기준으로 진행했습니다.

## 실제 사용 명령

```powershell
npx create-expo-app@latest expo-hello-world --template blank --yes
cd expo-hello-world
npx expo start --android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/01_엑스포로_Hello_World_만들기/examples/expo-hello-world`
- 핵심 소스 파일: `App.js`
- 실행 환경: `Pixel_7` Android 에뮬레이터
- 캡처 이미지:
  - `artifacts/ch1_screen.png`
  - `artifacts/ch1_hello_world_final.png`
