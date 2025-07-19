import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userNameOrEmailAddress, password, rememberMe } = body;

    // التحقق من وجود البيانات المطلوبة
    if (!userNameOrEmailAddress || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "اسم المستخدم وكلمة المرور مطلوبان",
          },
        },
        { status: 400 }
      );
    }

    // إرسال طلب تسجيل الدخول إلى NeoSend API
    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://neosending.com/api/account/login",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      data: JSON.stringify({
        password: password,
        userNameOrEmailAddress: userNameOrEmailAddress,
        rememberMe: rememberMe || false,
      }),
      timeout: 10000, // 10 seconds timeout
    };

    console.log("Attempting login to NeoSend API...");
    const loginResponse = await axios.request(config);

    console.log("NeoSend Login Response:", loginResponse.status, loginResponse.statusText);
    console.log("Login Response data:", loginResponse.data);

    const loginData = loginResponse.data;

    // تحقق من نجاح تسجيل الدخول
    if (loginData.result === 1 || loginData.description === "Success") {
      console.log("Login successful, now getting token from /connect/token...");

      try {
        // الحصول على التوكن من endpoint منفصل
        // استخدام الإعدادات الصحيحة من Postman
        const tokenConfigurations = [
          {
            client_id: "Whatsapp_App", // من Postman Environment
            scope: "Whatsapp" // من Postman - Scope
          },
          {
            client_id: "Whatsapp_App",
            scope: "Whatsapp api"
          },
          {
            client_id: "Whatsapp_App",
            scope: "api"
          },
          {
            client_id: "Whatsapp_App",
            scope: "Whatsapp api offline_access"
          }
        ];

        let tokenResponse = null;
        let tokenError = null;

        // جرب كل إعداد حتى ينجح واحد
        for (const config of tokenConfigurations) {
          try {
            console.log(`Trying token config: client_id=${config.client_id}, scope=${config.scope}`);
            
            // إعداد Basic Auth كما في Postman
            const basicAuth = Buffer.from(`${config.client_id}:`).toString('base64');
            
            const tokenConfig = {
              method: "post",
              maxBodyLength: Infinity,
              url: "https://neosending.com/connect/token",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
                Authorization: `Basic ${basicAuth}` // Basic Auth header
              },
              data: new URLSearchParams({
                grant_type: "password",
                username: userNameOrEmailAddress,
                password: password,
                client_id: config.client_id,
                scope: config.scope
              }).toString(),
              timeout: 10000,
            };

            tokenResponse = await axios.request(tokenConfig);
            console.log(`Token request successful with config: ${config.client_id}`);
            break; // إذا نجح، اخرج من الحلقة
            
          } catch (error: any) {
            console.log(`Token config failed: ${config.client_id} - ${error.message}`);
            tokenError = error;
            continue; // جرب الإعداد التالي
          }
        }

        if (!tokenResponse) {
          throw tokenError || new Error('All token configurations failed');
        }

        console.log("Token Response:", tokenResponse.status, tokenResponse.data);
        
        const tokenData = tokenResponse.data;

        return NextResponse.json({
          success: true,
          result: {
            accessToken: tokenData.access_token,
            tokenType: tokenData.token_type || "Bearer",
            expiresIn: tokenData.expires_in || 3600,
            refreshToken: tokenData.refresh_token,
            scope: tokenData.scope,
            userId: loginData.userId || 1,
            user: loginData.user || {
              id: 1,
              userName: userNameOrEmailAddress,
              name: userNameOrEmailAddress,
              surname: "",
              emailAddress: userNameOrEmailAddress.includes("@")
                ? userNameOrEmailAddress
                : "",
              isActive: true,
            },
          },
        });
      } catch (tokenError: any) {
        console.error("All token configurations failed:", tokenError);

        // إرجاع خطأ إذا فشل الحصول على التوكن
        return NextResponse.json({
          success: false,
          error: {
            message: "فشل في الحصول على التوكن. تحقق من بيانات الاعتماد أو اتصل بالدعم الفني.",
            code: "TOKEN_GENERATION_FAILED",
            details: {
              loginSuccess: true,
              tokenError: tokenError.response?.data || tokenError.message,
              status: tokenError.response?.status
            }
          }
        });
      }
    } else {
      // إذا كانت الاستجابة تشير إلى فشل في تسجيل الدخول
      return NextResponse.json({
        success: false,
        error: {
          message: loginData.error?.message || "فشل في تسجيل الدخول",
          code: loginData.error?.code || "LOGIN_FAILED",
        },
      });
    }
  } catch (error: any) {
    console.error("Login API Error:", error);

    // التعامل مع أخطاء axios
    if (error.response) {
      // الخادم أرجع استجابة مع كود خطأ
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              error.response.data?.error?.message ||
              "خطأ في بيانات تسجيل الدخول",
            code: error.response.status,
          },
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      // الطلب تم إرساله لكن لم يتم استلام استجابة
      console.error("Request error:", error.request);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "فشل في الاتصال بخادم NeoSend. تحقق من الاتصال بالإنترنت.",
            code: "NETWORK_ERROR",
          },
        },
        { status: 503 }
      );
    } else {
      // خطأ في إعداد الطلب
      console.error("Setup error:", error.message);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
            code: "UNKNOWN_ERROR",
          },
        },
        { status: 500 }
      );
    }
  }
}
