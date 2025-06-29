"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/useAuthStore";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { GithubLoginButton } from "./GithubLoginButton";

interface SignupFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export function SignupModal({
  isOpen,
  onClose,
  onOpenLogin,
}: SignupModalProps) {
  const { signup, isLoading, authError, clearAuthError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    // 기본 프로필 이미지 사용 (실제로는 프로필 이미지 업로드 기능 필요)
    const userData = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      profileImage: "https://via.placeholder.com/150",
    };

    const success = await signup(userData);
    if (success) {
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    clearAuthError();
    onClose();
  };

  const switchToLogin = () => {
    reset();
    clearAuthError();
    onOpenLogin();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>계정 회원가입</DialogTitle>
          </VisuallyHidden>
          <div className="flex border-b">
            <button
              className="flex-1 py-2 px-4 text-center font-medium text-muted-foreground"
              onClick={(e) => {
                e.preventDefault();
                switchToLogin();
              }}
            >
              로그인
            </button>
            <button
              className="flex-1 py-2 px-4 text-center font-medium border-b-2 border-primary"
              onClick={(e) => e.preventDefault()}
            >
              회원가입
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* 깃허브 로그인 버튼 */}
          <div className="space-y-4">
            <GithubLoginButton />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  또는 회원가입
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userName">닉네임</Label>
            <Input
              id="userName"
              placeholder="닉네임을 입력하세요"
              {...register("userName", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 2자 이상이어야 합니다",
                },
              })}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "유효한 이메일 주소를 입력해주세요",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "숨기기" : "보기"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 입력하세요"
              {...register("confirmPassword", {
                required: "비밀번호를 다시 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {authError && (
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-red-500 text-sm">{authError}</p>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
