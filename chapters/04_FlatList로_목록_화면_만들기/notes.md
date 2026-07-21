# 4장 메모: FlatList로 목록 화면 만들기
## 장 목표

- `FlatList`로 여러 개의 데이터를 반복 렌더링하는 방법을 익힌다.
- 배열 데이터를 화면 카드 목록으로 출력하는 기본 구조를 이해한다.
- 항목별 `Pressable` 버튼으로 상태가 바뀌는 목록 예제를 구현한다.
- chapter 03의 단일 프로필 화면을 여러 프로필 목록 화면으로 확장한다.

## 구성 초안

1. 왜 목록 화면이 중요한가
2. `FlatList` 기본 구조 이해하기
3. 프로필 데이터 배열 준비하기
4. `renderItem`으로 카드 반복 출력하기
5. 항목별 팔로우 버튼 처리하기
6. 실행 결과 확인
7. 정리

## 작업 체크리스트

- [x] 4장 폴더 구조 생성
- [x] Expo 예제 프로젝트 준비
- [x] FlatList 기반 목록 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 자산 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 실습 메모

- chapter 04는 chapter 03의 상태 개념을 유지하면서 화면 범위를 단일 카드에서 목록으로 넓힌다.
- 이번 장은 네트워크 API 없이 로컬 배열 데이터만 사용한다.
- 핵심은 `FlatList` 구조와 `keyExtractor`, `renderItem` 역할을 정확히 익히는 것이다.

## 실행 명령

```powershell
cd chapters/04_FlatList로_목록_화면_만들기/examples/expo-flatlist-profiles
npm install
npx expo start --android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/04_FlatList로_목록_화면_만들기/examples/expo-flatlist-profiles`
- 핵심 파일: `App.js`
- 주요 학습 요소: `FlatList`, 배열 데이터, `renderItem`, `keyExtractor`, 항목별 토글
