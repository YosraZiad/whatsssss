"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { api, neoSendApi } from "@/lib/api-client";
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/providers/auth-provider";
import { Copy, Send, Key } from "lucide-react";
import { toast } from "sonner";

export default function ApiTestPage() {
  const [endpoint, setEndpoint] = useState("/account/info");
  const [method, setMethod] = useState("GET");
  const [requestBody, setRequestBody] = useState("{}");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const token = AuthService.getToken();

  const testApi = async (useNeoSendDirect = false) => {
    setLoading(true);
    setResponse("");

    try {
      let result;
      const data = requestBody ? JSON.parse(requestBody) : undefined;

      if (useNeoSendDirect) {
        // استخدام NeoSend API مباشرة
        switch (method) {
          case "GET":
            result = await neoSendApi.get(endpoint);
            break;
          case "POST":
            result = await neoSendApi.post(endpoint, data);
            break;
          case "PUT":
            result = await neoSendApi.put(endpoint, data);
            break;
          case "DELETE":
            result = await neoSendApi.delete(endpoint);
            break;
          default:
            throw new Error("Unsupported method");
        }
      } else {
        // استخدام API المحلي
        switch (method) {
          case "GET":
            result = await api.get(endpoint);
            break;
          case "POST":
            result = await api.post(endpoint, data);
            break;
          case "PUT":
            result = await api.put(endpoint, data);
            break;
          case "DELETE":
            result = await api.delete(endpoint);
            break;
          default:
            throw new Error("Unsupported method");
        }
      }

      setResponse(JSON.stringify({
        status: result.status,
        statusText: result.statusText,
        headers: result.headers,
        data: result.data
      }, null, 2));

    } catch (error: any) {
      setResponse(JSON.stringify({
        error: true,
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ النص!");
  };

  const commonEndpoints = [
    { name: "معلومات الحساب", endpoint: "/account/info", method: "GET" },
    { name: "قائمة الرسائل", endpoint: "/messages", method: "GET" },
    { name: "إرسال رسالة", endpoint: "/messages/send", method: "POST" },
    { name: "الإعدادات", endpoint: "/settings", method: "GET" },
    { name: "الاشتراكات", endpoint: "/subscriptions", method: "GET" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              يرجى تسجيل الدخول أولاً لاختبار API
            </p>
            <Button onClick={() => window.location.href = "/login"}>
              تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">اختبار API</h1>
        <Badge className="bg-green-100 text-green-800">
          <Key className="w-3 h-3 mr-1" />
          مصادق
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* إعدادات الطلب */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>النقاط الشائعة</Label>
              <div className="grid gap-2">
                {commonEndpoints.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEndpoint(item.endpoint);
                      setMethod(item.method);
                      if (item.method === "POST") {
                        setRequestBody(JSON.stringify({
                          message: "Hello from API test",
                          recipient: "+966501234567"
                        }, null, 2));
                      } else {
                        setRequestBody("{}");
                      }
                    }}
                    className="justify-start"
                  >
                    <Badge variant="secondary" className="mr-2">
                      {item.method}
                    </Badge>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method</Label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint</Label>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="/api/endpoint"
              />
            </div>

            {(method === "POST" || method === "PUT") && (
              <div className="space-y-2">
                <Label htmlFor="body">Request Body (JSON)</Label>
                <Textarea
                  id="body"
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={4}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>التوكن المستخدم</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-xs font-mono break-all">
                  {token ? `Bearer ${token.substring(0, 20)}...` : "غير متوفر"}
                </code>
                {token && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`Bearer ${token}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => testApi(false)}
                disabled={loading}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "جاري الإرسال..." : "اختبار عبر API المحلي"}
              </Button>
              <Button
                onClick={() => testApi(true)}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "جاري الإرسال..." : "اختبار مباشر"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* الاستجابة */}
        <Card>
          <CardHeader>
            <CardTitle>الاستجابة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Response</Label>
                {response && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(response)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    نسخ
                  </Button>
                )}
              </div>
              <Textarea
                value={response}
                readOnly
                placeholder="ستظهر الاستجابة هنا..."
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات مهمة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>API المحلي:</strong> يمر عبر الخادم المحلي (/api) ويرفق التوكن تلقائياً</p>
            <p><strong>الاختبار المباشر:</strong> يتصل مباشرة بـ NeoSend API مع التوكن</p>
            <p><strong>التوكن:</strong> يتم إرفاقه تلقائياً في header Authorization</p>
            <p><strong>Base URL:</strong> https://neosending.com/api</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
