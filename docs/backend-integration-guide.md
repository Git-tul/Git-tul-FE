# Git-tul 프로젝트 백엔드 연동 가이드

이 문서는 Git-tul 프론트엔드 프로젝트의 백엔드 연동 필요 부분과 환경 설정에 대한 가이드입니다.

## 백엔드 연동이 필요한 부분

현재 프로젝트는 다음 기능들이 백엔드 연동이 필요합니다:

1. **포스트 작성 기능**
   - `src/app/(home)/post/_components/PostCard/index.tsx`에서 폼 데이터를 백엔드로 전송하는 API 연동이 필요합니다.
   - 현재는 `handleSubmitPost` 함수에서 콘솔 로그만 출력하고 있습니다.

2. **스레드 데이터 목록**
   - `src/app/(home)/dashboard/_components/ThreadList/index.tsx`에서 하드코딩된 데이터 대신 백엔드 API 호출이 필요합니다.

3. **인기 개발자 목록**
   - `src/app/(home)/dashboard/_components/RightAside/_components/PopularDeveloperCard.tsx`에서 하드코딩된 데이터 대신 백엔드 API 호출이 필요합니다.

4. **인기 해시태그 목록**
   - `src/app/(home)/dashboard/_components/LeftAside/components/HashTagCard.tsx`에서 하드코딩된 태그 목록 대신 백엔드 API 호출이 필요합니다.

5. **사용자 인증 시스템**
   - 로그인, 회원가입, 사용자 인증 관련 백엔드 연동이 구현되어 있지 않습니다.

## 환경 변수 설정

현재 프로젝트에서는 환경 변수 파일(`.env`, `.env.local`, `.env.development` 등)이 설정되어 있지 않습니다. 다음 환경 변수를 설정해야 합니다:

1. **API 엔드포인트**
   ```
   NEXT_PUBLIC_API_URL=https://api.gittul.example.com/api
   ```

2. **인증 관련 변수**
   ```
   NEXT_PUBLIC_AUTH_URL=https://api.gittul.example.com/auth
   ```

## 백엔드 연동을 위한 권장 구현 방법

1. **API 클라이언트 설정**
   - `src/lib/api.ts` 파일을 생성하여 axios 또는 fetch 기반 API 클라이언트 설정
   - 예시:
   ```typescript
   import axios from 'axios';

   const api = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL,
     timeout: 10000,
     headers: {
       'Content-Type': 'application/json',
     },
   });

   // 인터셉터 설정
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   export default api;
   ```

2. **API 함수 구현**
   - `src/lib/api/` 디렉토리에 각 도메인별 API 함수 구현
   - 예시:
   ```typescript
   // src/lib/api/thread.ts
   import api from '../api';
   import { Thread } from '@git-tul-types';

   export const getThreads = async () => {
     const response = await api.get('/threads');
     return response.data as Thread[];
   };

   export const createThread = async (threadData: Omit<Thread, 'id' | 'createdAt' | 'updatedAt'>) => {
     const response = await api.post('/threads', threadData);
     return response.data;
   };
   ```

3. **React Query 또는 SWR 사용 권장**
   - 데이터 페칭 및 캐싱을 위한 라이브러리 도입 권장
   - package.json에 추가:
   ```json
   "dependencies": {
     "@tanstack/react-query": "^5.0.0",
     // 또는
     "swr": "^2.0.0"
   }
   ```

## 필요한 추가 패키지

현재 프로젝트에 백엔드 연동을 위해 다음 패키지가 필요합니다:

1. HTTP 클라이언트
   ```bash
   pnpm add axios
   ```

2. 데이터 페칭 라이브러리
   ```bash
   pnpm add @tanstack/react-query
   # 또는
   pnpm add swr
   ```

3. 인증 관련
   ```bash
   pnpm add next-auth
   ```

## 결론

이 프로젝트는 현재 프론트엔드 UI 구현은 완료되었으나, 백엔드 API 연동이 되어 있지 않습니다. 위에서 언급한 부분들을 구현하여 실제 데이터를 사용하는 애플리케이션으로 개발해야 합니다. 