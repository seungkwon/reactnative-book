# 15장 메모: 주소를 좌표로 변환해 지도에 표시하기
## 장 목표

- 사용자가 입력한 주소 문자열을 Geocoding API로 좌표로 변환한다.
- 변환된 좌표를 지도 중심과 마커 위치에 반영한다.
- 주소 검색 실패와 로딩 상태를 화면에 함께 보여준다.

## 구성 초안

1. 주소 검색과 지도의 연결
2. Geocoding API 요청 구조
3. 주소 입력 UI와 검색 버튼
4. 좌표 응답을 지도에 반영
5. 결과 화면 확인
6. 정리

## 작업 체크리스트

- [x] 15장 폴더 구조 생성
- [x] 주소 검색 지도 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- Google Geocoding API 공식 문서는 주소를 좌표로 바꾸는 forward geocoding 요청을 제공한다.
- 주소 검색은 결국 입력 문자열, API 응답, 지도 상태를 연결하는 UI 흐름이다.
- API 키 노출을 피하려면 실무에서는 보통 서버 프록시나 제한된 키 정책을 함께 사용한다.

## 실행 명령

```powershell
cd chapters/15_주소를_좌표로_변환해_지도에_표시하기/examples/rn-address-geocode-map
npm install
npm run android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/15_주소를_좌표로_변환해_지도에_표시하기/examples/rn-address-geocode-map`
- 핵심 파일: `App.js`
- 주요 학습 요소: 주소 입력, Geocoding API 호출, 지도 중심 이동, 검색 마커 표시
