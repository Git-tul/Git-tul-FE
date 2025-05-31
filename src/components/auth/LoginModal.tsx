"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/useAuthStore";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignup: () => void;
}

export function LoginModal({ isOpen, onClose, onOpenSignup }: LoginModalProps) {
  const { login, isLoading, authError, clearAuthError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
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

  const switchToSignup = () => {
    reset();
    clearAuthError();
    onOpenSignup();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex border-b">
            <button
              className="flex-1 py-2 px-4 text-center font-medium border-b-2 border-primary"
              onClick={(e) => e.preventDefault()}
            >
              로그인
            </button>
            <button
              className="flex-1 py-2 px-4 text-center font-medium text-muted-foreground"
              onClick={(e) => {
                e.preventDefault();
                switchToSignup();
              }}
            >
              회원가입
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
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

          {authError && (
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-red-500 text-sm">{authError}</p>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
