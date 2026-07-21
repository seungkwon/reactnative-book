# 2장 메모: 기본 컴포넌트로 화면 구성하기
## 장 목표

- chapter 01에서 만든 기본 Expo 실행 흐름 위에 화면 요소를 확장한다.
- `View`, `Text`, `Image`, `TextInput`, `Pressable`의 역할을 한 번에 익힌다.
- 작은 프로필 카드 화면을 만들며 스타일 분리와 컴포넌트 배치를 연습한다.
- Android 에뮬레이터에서 실행 결과를 확인하고 2장 원고로 정리한다.

## 구성 초안

1. 왜 기본 컴포넌트가 중요한가
2. 예제 화면 목표 소개
3. 프로필 카드 UI 작성
4. 입력창과 버튼 추가
5. 실행 결과 확인
6. 정리

## 작업 체크리스트

- [x] 2장 폴더 구조 생성
- [x] Expo 예제 프로젝트 복제
- [x] 프로필 카드 예제 코드 작성
- [x] notes.md 작성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성
- [ ] 에뮬레이터 실행 결과 캡처 추가

## 실습 메모

- chapter 02도 Windows 환경과 Android 실행 기준으로 설명한다.
- 상태 관리는 다음 장으로 넘기고, 이번 장은 화면 구성 자체에 집중한다.
- 입력창과 버튼은 동작보다 컴포넌트의 생김새와 배치 이해가 목표다.

## 실행 명령

```powershell
cd chapters/02_기본_컴포넌트로_화면_구성하기/examples/expo-basic-components
npm install
npx expo start --android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/02_기본_컴포넌트로_화면_구성하기/examples/expo-basic-components`
- 핵심 파일: `App.js`
- 주요 학습 요소: `Image`, `TextInput`, `Pressable`, `SafeAreaView`, `StyleSheet`
