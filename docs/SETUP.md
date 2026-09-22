# 운영 연결 안내

## 1. Vercel

GitHub의 `pky0704/gayoung-ai-portfolio`를 Import Project로 연결합니다. Framework는 Next.js, 기본 빌드 명령은 `npm run build`입니다. 프로젝트 이름 후보는 `gayoungai`이며 `.vercel.app` 주소는 사용 가능 여부를 확인해야 합니다.

관리자 데이터 연결 전에도 최초 공개 프로젝트 5개의 화면을 검토할 수 있습니다. 이때 관리 화면은 연결 준비 상태로 표시되며 저장 성공을 가장하지 않습니다.

## 2. Supabase

가영님 계정 소유의 새 프로젝트를 생성하고 `supabase/schema.sql`을 SQL Editor에서 실행합니다. 프로젝트 테이블과 비공개 이미지 버킷을 생성하며 브라우저에서의 직접 테이블 읽기/쓰기 권한을 부여하지 않습니다.

Vercel 환경변수에 다음 값을 설정합니다.

- NEXT_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY: 프로젝트 anon/publishable 키
- SUPABASE_SERVICE_ROLE_KEY: 서버 전용 service role/secret 키
- ADMIN_USER_ID: 승인한 Google 계정의 Supabase Auth 사용자 UUID
- NEXT_PUBLIC_SITE_URL: 실제 배포 주소

키 원문은 채팅·GitHub·공개 문서에 붙여넣지 않습니다. `SUPABASE_SERVICE_ROLE_KEY`와 `ADMIN_USER_ID`에 NEXT_PUBLIC 접두사를 붙이지 않습니다.

## 3. Google 로그인

Google Cloud에서 OAuth 웹 클라이언트를 만들고 Supabase가 안내하는 callback 주소를 등록합니다. Supabase Authentication Providers에서 Google을 활성화하고, Site URL과 Redirect URLs에 실제 사이트 주소 및 `/admin`을 등록합니다. 이 앱은 이메일 로그인이나 일반 회원가입 화면을 제공하지 않습니다.

관리자 UUID가 아직 없으면 로컬 환경에서 `ADMIN_USER_ID=pending`으로 임시 설정해 지정한 구글 계정으로 한 번 로그인합니다. UUID가 일치하지 않으므로 이 단계에서 관리 API 접근은 거부됩니다. Supabase Authentication > Users에서 그 Google 계정임을 확인한 뒤 UUID를 `ADMIN_USER_ID`에 설정합니다. 최종 관리자 이메일은 사용자와 별도로 확인한 주소를 사용하며 공개 코드에 기록하지 않습니다.

다른 Google 계정은 로그인 세션이 생기더라도 관리자 권한을 받지 않습니다. API는 Supabase 서버에서 검증한 사용자 ID 및 Google provider를 확인합니다. 관리자 UUID를 바꾸려면 비공개 배포 설정을 수정해야 합니다.

## 4. 최초 데이터 등록

로컬 `.env.local`에 Supabase URL과 서버 키를 넣은 뒤 `npm run seed`를 한 번 실행합니다. 기존 ID가 있으면 건너뛰므로 수정된 프로젝트를 덮어쓰지 않습니다. 이후 수정은 관리자 화면에서 진행합니다.

## 5. 이미지와 백업

PNG/JPG/WebP, 파일당 3MB 이하를 받습니다. 서버에서 실제 이미지 바이트를 검증하고 메타데이터를 제거한 WebP로 변환합니다. SVG 업로드는 허용하지 않습니다. Storage는 비공개이며 화면에 필요한 이미지에 한해 1시간짜리 서명 URL을 발급합니다. 이미 발급된 URL은 그 시간 동안 유효할 수 있습니다.

정보 내보내기는 JSON 데이터만 포함합니다. 이미지 원본 백업은 별도로 필요합니다. 운영 시작 전에 Supabase 제공 백업의 현재 플랜 조건을 확인하고 DB export와 Storage 파일 사본을 함께 보관하세요. 자동 전체 백업은 아직 설정하지 않았습니다. 미사용 업로드는 즉시 삭제하지 않아 편집 취소 시 데이터 손실을 방지합니다. 주기적으로 확인 후 정리할 수 있습니다.

최초 5개 사례의 공개 이미지와 설명은 Git에도 남아 있으므로 관리자 비공개 전환이 저장소 이력까지 삭제하는 것은 아닙니다.

## 6. 공개 전 필수 확인

- 지정한 구글 계정으로 로그인, 타 계정의 API 접근 거부
- 신규 프로젝트 임시저장, 새로고침 후 데이터 유지
- 썸네일과 캡처 업로드, 공개 후 카드·상세 반영
- 비공개 전환 시 목록 및 상세 URL에서 숨김
- 순서 변경, 휴지통 이동, 임시저장 복구
- 동시에 두 창을 수정했을 때 오래된 저장 거부
- 휴대폰 화면·캡처 확대·키보드 이동
- 실제 공개 주소와 외부 프로젝트 링크

이 항목은 운영 환경에서 실행해야 하며 로컬 테스트만으로 완료 처리하지 않습니다.
