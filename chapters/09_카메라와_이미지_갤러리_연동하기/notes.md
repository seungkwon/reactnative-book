# 9장 메모: 카메라와 이미지 갤러리 연동하기
## 장 목표

- 카메라 촬영과 갤러리 선택을 React Native 화면과 연결한다.
- 권한 요청, 결과 URI 처리, 이미지 미리보기 흐름을 이해한다.
- Expo 환경에서 네이티브 기능을 다루는 기본 패턴을 익힌다.

## 구성 초안

1. 왜 카메라/갤러리 연동이 중요한가
2. `expo-image-picker` 준비하기
3. 카메라 권한 요청과 촬영 흐름
4. 갤러리 선택 흐름
5. 선택 이미지 미리보기
6. 실행 결과 확인
7. 정리

## 작업 체크리스트

- [x] 9장 폴더 구조 생성
- [x] Expo 예제 프로젝트 준비
- [x] 카메라/갤러리 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 자산 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 실습 메모

- chapter 09부터는 디바이스 네이티브 기능 연동 파트로 넘어간다.
- 이번 장의 핵심은 실제 촬영 자체보다 `권한 요청 -> 결과 수신 -> 화면 반영` 흐름이다.
- Expo에서는 `expo-image-picker`를 사용해 비교적 간단하게 시작할 수 있다.

## 실행 명령

```powershell
cd chapters/09_카메라와_이미지_갤러리_연동하기/examples/expo-image-picker-demo
npx expo install expo-image-picker
npx expo start --android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/09_카메라와_이미지_갤러리_연동하기/examples/expo-image-picker-demo`
- 핵심 파일: `App.js`
- 주요 학습 요소: `expo-image-picker`, 권한 요청, 촬영/선택, 이미지 미리보기
