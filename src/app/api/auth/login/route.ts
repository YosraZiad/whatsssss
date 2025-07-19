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
    const response = await axios.request(config);

    console.log("NeoSend API Response:", response.status, response.statusText);
    console.log("Response data:", response.data);

    // تحقق من نوع الاستجابة وتحويلها إلى التنسيق المتوقع
    const responseData = response.data;

    // إذا كانت الاستجابة تحتوي على result = 1، فهذا يعني نجاح
    if (responseData.result === 1 || responseData.description === "Success") {
      return NextResponse.json({
        success: true,
        result: {
          accessToken: responseData.accessToken || "mock-token-" + Date.now(),
          encryptedAccessToken: responseData.encryptedAccessToken || "",
          expireInSeconds: responseData.expireInSeconds || 3600,
          userId: responseData.userId || 1,
          user: responseData.user || {
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
    } else {
      // إذا كانت الاستجابة تشير إلى فشل
      return NextResponse.json({
        success: false,
        error: {
          message: responseData.error?.message || "فشل في تسجيل الدخول",
          code: responseData.error?.code || "LOGIN_FAILED",
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
