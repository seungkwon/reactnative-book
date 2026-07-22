# 17장 메모: Native SDK로 소셜 로그인과 회원가입 구현하기
## 장 목표

- 카카오 Native SDK 기반 로그인 흐름과 Apple 로그인 흐름을 React Native 화면에 연결한다.
- 소셜 로그인 후 회원가입 완료 카드로 이어지는 구조를 만든다.
- 플랫폼별 설정 차이와 서버 토큰 검증 필요성을 함께 정리한다.

## 구성 초안

1. 왜 Native SDK 소셜 로그인을 쓰는가
2. 카카오 로그인 준비
3. Apple 로그인 준비
4. 로그인 결과를 회원가입 완료 흐름으로 연결
5. 결과 화면 확인
6. 정리

## 작업 체크리스트

- [x] 17장 폴더 구조 생성
- [x] 소셜 로그인 예제 작성
- [x] notes.md 작성
- [x] 결과 화면 이미지 생성
- [x] 원고 생성 스크립트 작성
- [x] `.docx` 문서 생성

## 학습 메모

- 카카오 공식 문서는 Android/iOS 네이티브 앱에서 카카오톡 로그인과 카카오계정 로그인을 모두 지원한다고 안내한다.
- Apple 공식 문서는 iOS 앱에서 Authentication Services 기반 Sign in with Apple 사용과 App ID capability 설정을 요구한다.
- 실제 서비스에서는 로그인 성공 직후 액세스 토큰이나 identity token을 서버에서 검증하고 자체 회원 계정으로 연결해야 한다.

## 실행 명령

```powershell
cd chapters/17_Native_SDK로_소셜_로그인과_회원가입_구현하기/examples/rn-social-auth
npm install
npm run android
```

## 결과 요약

- 예제 프로젝트 위치: `chapters/17_Native_SDK로_소셜_로그인과_회원가입_구현하기/examples/rn-social-auth`
- 핵심 파일: `App.js`
- 주요 학습 요소: 카카오 로그인, Apple 로그인, 회원가입 완료 카드, 소셜 프로필 상태 관리
