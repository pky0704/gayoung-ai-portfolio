# 관리자 비밀번호 로그인 (2026-10-12)

가영님 1인 운영을 위해 Google OAuth를 비밀번호 로그인으로 교체했다.
기존 projects/work_items/이미지 저장소와 모든 관리자 API의 인증 검사는 유지한다.

## 운영 설정

1. `supabase/migrations/20261012_admin_password.sql`을 Supabase SQL Editor에서 실행한다.
2. Vercel gayoungene / gayoungai / Production에 서버 전용 Secret `ADMIN_PASSWORD`를 저장한다.
   12~256자. 다른 계정과 겹치지 않는 긴 비밀번호를 사용한다. 저장소·채팅에 값을 남기지 않는다.
3. 최신 main을 다시 배포한다. `/admin`에서 비밀번호 로그인과 데이터 저장을 확인한다.

기존 NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY는 계속 필요하다.
ADMIN_USER_ID, Google OAuth, NEXT_PUBLIC_SUPABASE_ANON_KEY는 관리자 로그인에 사용하지 않는다.
현재 값은 다른 사용 여부를 확인하기 전까지 삭제하지 않아도 된다.

## 접근 보호

- 서버에서만 비밀번호를 비교한다. 브라우저 번들·응답에 비밀번호를 전달하지 않는다.
- HMAC-SHA256 서명, 12시간 만료, HttpOnly/Secure/SameSite=Strict/host-only 쿠키.
- 서명 키는 기존 서버 비밀키와 관리자 비밀번호로 용도를 구분해 도출한다.
- 비밀번호 또는 서버 비밀키 변경 후 재배포하면 이전 세션은 무효화된다.
- 로그인/로그아웃/모든 데이터 변경 요청은 동일 출처 검사.
- Supabase 원자적 카운터로 전체 로그인 시도를 5분당 20회 제한한다.
  여러 서버 인스턴스 및 IP 변경에도 공유된다. 제3자가 한도를 소진하면 최대 5분 기다려야 한다.
- 카운터/DB 설정 장애 시 인증을 허용하지 않는다.
- 로그아웃은 해당 브라우저의 쿠키를 삭제한다. 다른 기기 로그아웃은 비밀번호 변경 후 재배포한다.
- 비밀번호 분실 시 Vercel에서 새 값을 저장하고 재배포한다.

## 확인 범위

서명 위조·만료·비밀번호 변경·잘못된 입력 테스트 및 기존 관리 기능 테스트.
운영 환경의 실제 비밀번호 입력 및 저장 성공은 사용자 설정 이후 별도 검증한다.
