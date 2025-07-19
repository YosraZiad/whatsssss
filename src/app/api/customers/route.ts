// src/app/api/customers/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE = 'https://neosending.com/api/neosending/Whatsapp';

// دالة لاستخراج التوكن من الهيدر
function getAuthToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader;
  }
  return null;
}

export async function GET(request: Request) {
  try {
    // استخراج التوكن من الهيدر
    const authToken = getAuthToken(request);
    if (!authToken) {
      return NextResponse.json(
        { success: false, error: 'لم يتم توفير توكن المصادقة' },
        { status: 401 }
      );
    }

    const response = await axios.get(`${API_BASE}/customer`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': authToken 
      },
      timeout: 30000
    });

    // معالجة الهيكل المختلف للبيانات
    const responseData = response.data;
    let customers = [];
    let totalCount = 0;

    if (Array.isArray(responseData)) {
      // إذا كانت البيانات مصفوفة مباشرة
      customers = responseData;
      totalCount = responseData.length;
    } else if (responseData.items && Array.isArray(responseData.items)) {
      // إذا كانت البيانات تحتوي على items كصفة
      customers = responseData.items;
      totalCount = responseData.totalCount || responseData.items.length;
    } else if (Array.isArray(responseData.items)) {
      // الهيكل الغريب الذي تتلقاه حالياً
      const firstItem = responseData.items[0];
      customers = firstItem.items || [];
      totalCount = firstItem.totalCount || 0;
    }

    return NextResponse.json({
      success: true,
      items: customers,
      totalCount: totalCount
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch customers',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // استخراج التوكن من الهيدر
    const authToken = getAuthToken(request);
    if (!authToken) {
      return NextResponse.json(
        { success: false, error: 'لم يتم توفير توكن المصادقة' },
        { status: 401 }
      );
    }

    const requestData = await request.json();

    // التحقق من الحقول المطلوبة
    const requiredFields = ['fullName', 'mobileNumber', 'userName', 'password'];
    const missingFields = requiredFields.filter(field => !requestData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: `الحقول التالية مطلوبة: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    const response = await axios.post(`${API_BASE}/customer`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Authorization': authToken
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data
    });

  } catch (error: any) {
    console.error('Error creating customer:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        success: false,
        error: 'فشل في إنشاء العميل',
        details: error.response?.data || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}
export const dynamic = 'force-dynamic';