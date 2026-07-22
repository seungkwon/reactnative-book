# 14장 메모: 구글 맵으로 현재 위치와 마커 표시하기
## 장 목표

- `react-native-maps`로 지도 화면을 띄우고 현재 위치를 기준으로 카메라를 이동시킨다.
- 위치 권한을 요청하고, 가져온 좌표를 마커와 정보 카드에 반영한다.
- Android Google Maps API 키와 위치 권한 설정이 왜 필요한지 이해한다.

## 구성 초안

1. 지도 기능의 기본 흐름 이해
2. `react-native-maps`와 위치 라이브러리 준비
3. 위치 권한 요청
4. 현재 위치를 지도 중심과 마커에 반영
5. 결과 화면 확인
6. 정리

## 작업 체크리스트

- [x] 14장 폴더 구조 생성
- [x] 지도 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- `react-native-maps` 공식 문서는 Android에서 Google Maps API 키가 필요하다고 안내한다.
- `MapView` 문서에서는 `showsUserLocation` 사용 전에 런타임 위치 권한이 필요하다고 설명한다.
- 지도 기능은 결국 권한 요청, 좌표 획득, 지도 상태 반영의 세 단계로 이해하면 된다.

## 실행 명령

```powershell
cd chapters/14_구글_맵으로_현재_위치와_마커_표시하기/examples/rn-current-location-map
npm install
npm run android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/14_구글_맵으로_현재_위치와_마커_표시하기/examples/rn-current-location-map`
- 핵심 파일: `App.js`
- 주요 학습 요소: 위치 권한, 지도 중심 이동, 현재 위치 마커, 좌표 표시
