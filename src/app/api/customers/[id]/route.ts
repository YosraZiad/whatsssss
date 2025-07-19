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

// Helper function for error responses
function errorResponse(message: string, status: number, details?: any) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status }
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return errorResponse('معرف العميل غير صالح', 400);
    }

    // استخراج التوكن من الهيدر
    const authToken = getAuthToken(request);
    if (!authToken) {
      return errorResponse('لم يتم توفير توكن المصادقة', 401);
    }

    const response = await axios.get(`${API_BASE}/customer/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': authToken
      },
      timeout: 15000
    });

    return NextResponse.json({
      success: true,
      data: response.data
    });

  } catch (error: any) {
    console.error('Error fetching customer:', error);
    return errorResponse(
      'فشل في جلب بيانات العميل',
      error.response?.status || 500,
      error.response?.data || error.message
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return errorResponse('معرف العميل غير صالح', 400);
    }

    // استخراج التوكن من الهيدر
    const authToken = getAuthToken(request);
    if (!authToken) {
      return errorResponse('لم يتم توفير توكن المصادقة', 401);
    }

    const requestData = await request.json();

    const response = await axios.put(`${API_BASE}/customer/${id}`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
      },
      timeout: 15000
    });

    return NextResponse.json({
      success: true,
      data: response.data
    });

  } catch (error: any) {
    console.error('Error updating customer:', error);
    return errorResponse(
      'فشل في تحديث بيانات العميل',
      error.response?.status || 500,
      error.response?.data || error.message
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, error: 'معرف العميل غير صالح' },
      { status: 400 }
    );
  }

  // استخراج التوكن من الهيدر
  const authToken = getAuthToken(request);
  if (!authToken) {
    return NextResponse.json(
      { success: false, error: 'لم يتم توفير توكن المصادقة' },
      { status: 401 }
    );
  }

  try {
    const response = await axios.delete(`${API_BASE}/customer/${id}`, {
      headers: {
        'Accept': 'text/plain', // فقط هذا الهيدر
        'Authorization': authToken
      },
      timeout: 10000
    });

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json({
        success: true,
        message: 'تم حذف العميل بنجاح'
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'فشل في حذف العميل',
        details: response.data
      },
      { status: response.status }
    );

  } catch (error: any) {
    console.error('خطأ في حذف العميل:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'فشل في حذف العميل',
        details: error.response?.data || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}