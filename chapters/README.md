# chapters 디렉터리 안내

이 폴더는 장별 원고와 예제 코드를 관리하는 공간입니다.

## 권장 구조

각 장은 다음과 같은 형태로 구성합니다.

```text
chapters/
└─ 01_장제목/
   ├─ manuscript/
   │  └─ 01_장제목.docx
   ├─ examples/
   └─ notes.md
```

## 운영 방식

- `manuscript/`: 워드 원고 파일 보관
- `examples/`: 장에 포함되는 예제 코드 보관
- `notes.md`: 예제 실행 방법, TODO, 집필 메모 정리

## 시작 예시

1. `chapters/01_장제목/` 폴더 생성
2. `manuscript/01_장제목.docx` 파일 수동 생성
3. `examples/` 아래에 예제 번호별 파일 추가
4. `notes.md`에 장 목표와 TODO 기록
