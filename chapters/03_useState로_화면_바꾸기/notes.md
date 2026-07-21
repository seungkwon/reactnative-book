# 3장 메모: useState로 화면 바꾸기
## 장 목표

- `useState`로 React Native 화면 상태를 관리하는 기본 흐름을 익힌다.
- `TextInput` 입력값을 상태와 연결해 화면에 즉시 반영한다.
- `Pressable` 버튼 클릭으로 문구와 버튼 라벨이 바뀌는 상호작용을 구현한다.
- chapter 02에서 만든 프로필 카드 화면을 상태 기반 화면으로 확장한다.

## 구성 초안

1. 왜 상태가 필요한가
2. `useState` 기본 구조 이해하기
3. 입력값과 화면 문구 연결하기
4. 버튼으로 팔로우 상태 토글하기
5. 실행 결과 확인
6. 정리

## 작업 체크리스트

- [x] 3장 폴더 구조 생성
- [x] Expo 예제 프로젝트 준비
- [x] 상태 기반 프로필 카드 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 자산 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 실습 메모

- chapter 03은 chapter 02 예제를 확장하는 흐름으로 설명한다.
- 이번 장의 핵심은 `상태 변경 -> 다시 렌더링` 흐름을 눈으로 확인하는 것이다.
- 네트워크 통신이나 복잡한 훅은 다루지 않고 `useState` 하나에 집중한다.

## 실행 명령

```powershell
cd chapters/03_useState로_화면_바꾸기/examples/expo-state-profile
npm install
npx expo start --android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/03_useState로_화면_바꾸기/examples/expo-state-profile`
- 핵심 파일: `App.js`
- 주요 학습 요소: `useState`, `TextInput`, `Pressable`, 조건부 문구 변경
