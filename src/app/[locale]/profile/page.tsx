"use client";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/providers/auth-provider";
import { AuthService } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, LogOut, User, Key, Clock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const token = AuthService.getToken();
  const userData = AuthService.getUser();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ النص!");
  };

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              يرجى تسجيل الدخول أولاً
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الملف الشخصي</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="w-4 h-4 mr-2" />
          تسجيل الخروج
        </Button>
      </div>

      {/* معلومات المستخدم */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            معلومات المستخدم
          </CardTitle>
          <CardDescription>البيانات الأساسية للمستخدم المسجل</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  الاسم
                </label>
                <p className="text-lg">{user.name || "غير محدد"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  اسم المستخدم
                </label>
                <p className="text-lg">{user.userName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  البريد الإلكتروني
                </label>
                <p className="text-lg">{user.emailAddress || "غير محدد"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  الحالة
                </label>
                <div>
                  <Badge
                    className={
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {user.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* معلومات التوكن */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            معلومات المصادقة
          </CardTitle>
          <CardDescription>التوكن المستخدم للمصادقة مع API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Access Token
            </label>
            <div className="flex items-center gap-2 mt-1">
              <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                {token
                  ? `${token.substring(0, 20)}...${token.substring(
                      token.length - 20
                    )}`
                  : "غير متوفر"}
              </code>
              {token && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(token)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              التوكن الكامل
            </label>
            <div className="mt-1">
              <textarea
                readOnly
                value={token || "غير متوفر"}
                className="w-full p-2 bg-muted rounded text-sm font-mono resize-none"
                rows={4}
              />
              {token && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => copyToClipboard(token)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  نسخ التوكن الكامل
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              استخدام التوكن في Headers
            </label>
            <div className="mt-1">
              <code className="block p-2 bg-muted rounded text-sm">
                Authorization: Bearer{" "}
                {token ? token.substring(0, 30) + "..." : "[TOKEN]"}
              </code>
              {token && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() =>
                    copyToClipboard(`Authorization: Bearer ${token}`)
                  }
                >
                  <Copy className="w-4 h-4 mr-2" />
                  نسخ Header
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* بيانات JSON الخام */}
      <Card>
        <CardHeader>
          <CardTitle>البيانات الخام (JSON)</CardTitle>
          <CardDescription>
            جميع البيانات المحفوظة في localStorage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                بيانات المستخدم
              </label>
              <pre className="mt-1 p-2 bg-muted rounded text-sm overflow-auto">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
