"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService, LoginCredentials } from "@/lib/auth";
import { toast } from "sonner";

interface User {
  id: number;
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // التحقق من وجود مستخدم محفوظ عند تحميل التطبيق
    const savedUser = AuthService.getUser();
    const token = AuthService.getToken();

    if (savedUser && token) {
      setUser(savedUser);
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);

      if (response.success && response.result) {
        const {
          accessToken,
          refreshToken,
          expiresIn,
          user: userData,
        } = response.result;

        AuthService.saveToken(accessToken, refreshToken, expiresIn);
        AuthService.saveUser(userData);
        setUser(userData);

        toast.success("تم تسجيل الدخول بنجاح!");
        return true;
      } else {
        toast.error(response.error?.message || "فشل في تسجيل الدخول");
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    toast.success("تم تسجيل الخروج بنجاح");

    // استخراج الـ locale من المسار الحالي
    const locale = pathname.split("/")[1] || "ar"; // افتراضي العربية

    // إعادة التوجيه إلى صفحة تسجيل الدخول مع الـ locale
    router.push(`/${locale}/login`);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
