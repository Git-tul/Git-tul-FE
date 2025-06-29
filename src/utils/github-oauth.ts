export const GITHUB_CLIENT_ID = "Ov23linKoxF1gqL1YcUP";
export const GITHUB_REDIRECT_URI = `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/auth/github/callback`;

/**
 * 깃허브 OAuth 로그인 URL을 생성합니다
 */
export const getGithubOAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: "user:email",
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

/**
 * 깃허브 OAuth 로그인을 시작합니다
 */
export const initiateGithubLogin = () => {
  const url = getGithubOAuthUrl();
  window.location.href = url;
};

/**
 * URL에서 코드 파라미터를 추출합니다
 */
export const extractCodeFromUrl = (): string | null => {
  if (typeof window === "undefined") return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("code");
}; 