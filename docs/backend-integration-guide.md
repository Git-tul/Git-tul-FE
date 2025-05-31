1. **스레드 데이터 목록**

   - `src/app/(home)/dashboard/_components/ThreadList/index.tsx`에서 하드코딩된 데이터 대신 백엔드 API 호출이 필요합니다.

2. **사용자 인증 시스템**
   - 로그인, 회원가입, 사용자 인증 관련 백엔드 연동이 구현되어 있지 않습니다.

## 환경 변수 설정

현재 프로젝트에서는 환경 변수 파일(`.env`, `.env.local`, `.env.development` 등)이 설정되어 있지 않습니다. 다음 환경 변수를 설정해야 합니다:

1. **API 엔드포인트**

   ```
   NEXT_PUBLIC_API_URL=https://api.gittul.miensoap.com/
   ```

2. **인증 관련 변수**
   ```
   NEXT_PUBLIC_AUTH_URL=https://api.gittul.miensoap.com/auth
   ```
