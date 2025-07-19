"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Send, Key, Info } from "lucide-react";
import { toast } from "sonner";

export default function TokenTestPage() {
  const [username, setUsername] = useState("web"); // من Postman Environment
  const [password, setPassword] = useState("W3b_TeSt"); // من Postman Environment
  const [clientId, setClientId] = useState("Whatsapp_App"); // من Postman Environment
  const [scope, setScope] = useState("Whatsapp"); // من Postman - Scope
  const [grantType, setGrantType] = useState("password");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testTokenEndpoint = async () => {
    setLoading(true);
    setResult("");

    try {
      const formData = new URLSearchParams({
        grant_type: grantType,
        username: username,
        password: password,
        client_id: clientId,
        scope: scope
      });

      console.log('Sending token request with data:', Object.fromEntries(formData));

      // إعداد Basic Auth كما في Postman
      const basicAuth = btoa(`${clientId}:`);
      
      const response = await fetch('https://neosending.com/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': `Basic ${basicAuth}` // Basic Auth header
        },
        body: formData.toString()
      });

      const responseText = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      setResult(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData
      }, null, 2));

    } catch (error: any) {
      setResult(JSON.stringify({
        error: true,
        message: error.message,
        type: error.name
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const testViaApiRoute = async () => {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ النص!");
  };

  const commonConfigurations = [
    {
      name: "WhatsApp Token (من Postman)",
      clientId: "Whatsapp_App",
      scope: "Whatsapp",
      grantType: "password"
    },
    {
      name: "WhatsApp + API Scope",
      clientId: "Whatsapp_App",
      scope: "Whatsapp api",
      grantType: "password"
    },
    {
      name: "API Only",
      clientId: "Whatsapp_App",
      scope: "api",
      grantType: "password"
    },
    {
      name: "Full Access",
      clientId: "Whatsapp_App",
      scope: "Whatsapp api offline_access",
      grantType: "password"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Key className="w-6 h-6" />
        <h1 className="text-3xl font-bold">اختبار Token Endpoint</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* إعدادات الطلب */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات Token Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>الإعدادات الشائعة</Label>
              <div className="grid gap-2">
                {commonConfigurations.map((config, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setClientId(config.clientId);
                      setScope(config.scope);
                      setGrantType(config.grantType);
                    }}
                    className="justify-start"
                  >
                    <Badge variant="secondary" className="mr-2">
                      {config.grantType}
                    </Badge>
                    {config.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="اسم المستخدم"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="client_id"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grantType">Grant Type</Label>
                <select
                  id="grantType"
                  value={grantType}
                  onChange={(e) => setGrantType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="password">password</option>
                  <option value="client_credentials">client_credentials</option>
                  <option value="authorization_code">authorization_code</option>
                  <option value="refresh_token">refresh_token</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Scope</Label>
              <Input
                id="scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="api offline_access"
              />
            </div>

            <div className="space-y-2">
              <Label>Request Body (form-urlencoded)</Label>
              <code className="block p-2 bg-muted rounded text-sm">
                grant_type={grantType}<br/>
                username={username}<br/>
                password=***<br/>
                client_id={clientId}<br/>
                scope={scope}
              </code>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={testTokenEndpoint}
                disabled={loading || !username || !password}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "جاري الاختبار..." : "اختبار /connect/token"}
              </Button>
              
              <Button
                onClick={testViaApiRoute}
                disabled={loading || !username || !password}
                variant="outline"
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? "جاري الاختبار..." : "عبر API Route"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* النتيجة */}
        <Card>
          <CardHeader>
            <CardTitle>النتيجة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Response</Label>
                {result && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(result)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    نسخ
                  </Button>
                )}
              </div>
              <Textarea
                value={result}
                readOnly
                placeholder="ستظهر النتيجة هنا..."
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            معلومات مهمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Endpoint:</strong> https://neosending.com/connect/token</p>
            <p><strong>Method:</strong> POST</p>
            <p><strong>Content-Type:</strong> application/x-www-form-urlencoded</p>
            <p><strong>Accept:</strong> application/json</p>
            <p><strong>Grant Types:</strong> password, client_credentials, authorization_code</p>
            <p><strong>Common Scopes:</strong> api, openid, profile, offline_access</p>
            <p><strong>Response:</strong> JSON object with access_token, token_type, expires_in</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
