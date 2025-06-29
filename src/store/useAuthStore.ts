import { create } from "zustand";

export interface User {
  id: number;
  nickname: string;
  email: string;
  profileImage: string | null;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  authError: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  loginWithOAuth: (provider: string, code: string) => Promise<boolean>;
  signup: (userData: {
    userName: string;
    email: string;
    password: string;
    profileImage?: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  clearAuthError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  isLoading: false,
  authError: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, authError: null });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        set({
          authError: error.message || "로그인에 실패했습니다.",
          isLoading: false,
        });
        return false;
      }

      // 사용자 정보 가져오기
      const userInfo = await fetch("/api/auth/my");
      if (userInfo.ok) {
        const userData = await userInfo.json();
        set({ user: userData, isLoggedIn: true, isLoading: false });
      } else {
        set({ isLoggedIn: true, isLoading: false });
      }

      return true;
    } catch (error) {
      set({
        authError: "로그인 중 오류가 발생했습니다.",
        isLoading: false,
      });
      return false;
    }
  },

  loginWithOAuth: async (provider: string, code: string) => {
    set({ isLoading: true, authError: null });
    try {
      const response = await fetch(`/api/auth/oauth/${provider}?code=${code}`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        set({
          authError: error.message || "OAuth 로그인에 실패했습니다.",
          isLoading: false,
        });
        return false;
      }

      // 사용자 정보 가져오기
      const userInfo = await fetch("/api/auth/my");
      if (userInfo.ok) {
        const userData = await userInfo.json();
        set({ user: userData, isLoggedIn: true, isLoading: false });
      } else {
        set({ isLoggedIn: true, isLoading: false });
      }

      return true;
    } catch (error) {
      set({
        authError: "OAuth 로그인 중 오류가 발생했습니다.",
        isLoading: false,
      });
      return false;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, authError: null });
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        set({
          authError: error.message || "회원가입에 실패했습니다.",
          isLoading: false,
        });
        return false;
      }

      // 회원가입 성공 후 자동 로그인
      return get().login(userData.email, userData.password);
    } catch (error) {
      set({
        authError: "회원가입 중 오류가 발생했습니다.",
        isLoading: false,
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      set({ isLoggedIn: false, user: null, isLoading: false });
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/auth/check");

      if (response.ok) {
        const data = await response.json();
        set({ isLoggedIn: true, user: data.user, isLoading: false });
        return true;
      } else {
        set({ isLoggedIn: false, user: null, isLoading: false });
        return false;
      }
    } catch (error) {
      set({ isLoggedIn: false, user: null, isLoading: false });
      return false;
    }
  },

  clearAuthError: () => set({ authError: null }),
}));

export default useAuthStore;
