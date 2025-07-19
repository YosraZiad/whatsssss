"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TestLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userNameOrEmailAddress: username,
          password: password,
          rememberMe: false
        })
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResult(`خطأ: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch('https://neosending.com/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain'
        },
        body: JSON.stringify({
          userNameOrEmailAddress: "test",
          password: "test",
          rememberMe: false
        })
      });

      const data = await response.text();
      setResult(`استجابة مباشرة: ${data}`);
    } catch (error: any) {
      setResult(`خطأ في الاتصال المباشر: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>اختبار تسجيل الدخول - NeoSend API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">اسم المستخدم أو البريد الإلكتروني</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={testLogin} 
              disabled={loading || !username || !password}
              className="flex-1"
            >
              {loading ? "جاري الاختبار..." : "اختبار عبر API Route"}
            </Button>
            
            <Button 
              onClick={testConnection} 
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              {loading ? "جاري الاختبار..." : "اختبار مباشر"}
            </Button>
          </div>

          <div className="space-y-2">
            <Label>النتيجة:</Label>
            <Textarea
              value={result}
              readOnly
              className="min-h-[200px] font-mono text-sm"
              placeholder="ستظهر النتيجة هنا..."
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p><strong>ملاحظة:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>استخدم بيانات حقيقية للاختبار</li>
              <li>API Route يمر عبر الخادم المحلي لتجنب مشاكل CORS</li>
              <li>الاختبار المباشر قد يفشل بسبب CORS</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
