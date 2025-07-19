import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE = 'https://neosending.com/api/neosending/Whatsapp';
const API_TOKEN = process.env.API_TOKEN || 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3ODA0NjgxQzMzMzc2NUYwMTMwRkQxQzEwRjZBNEM4QjhFMTk5MzAiLCJ4NXQiOiJSNEJHZ2NNemRsOEJNUDBjRVBha3lMamhtVEEiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL25lb3NlbmRpbmcuY29tLyIsImV4cCI6MTc4NDAxNjg5NSwiaWF0IjoxNzUyNDgwODk1LCJhdWQiOiJXaGF0c2FwcCIsInNjb3BlIjoiV2hhdHNhcHAiLCJqdGkiOiIwYzI3ZTkyOS02ODZhLTQxNzMtOTgzZS1jMmVkZjUwZjcyZWQiLCJzdWIiOiI4NGU3MmQ0OC0wNWNlLTJmNzgtYjFiMy0zYTFhZGVhMmIxZTUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ3ZWIiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoid2ViIiwiZmFtaWx5X25hbWUiOiJ0ZXN0IiwicGhvbmVfbnVtYmVyIjoiNzc3Nzc3Nzc3IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbF92ZXJpZmllZCI6IkZhbHNlIiwidW5pcXVlX25hbWUiOiJ3ZWIiLCJvaV9wcnN0IjoiV2hhdHNhcHBfQXBwIiwiY2xpZW50X2lkIjoiV2hhdHNhcHBfQXBwIiwib2lfdGtuX2lkIjoiNDI2NTQ2YzUtMjBhYi1hMzhjLTQ1M2UtM2ExYjFhMmQyYjJkIn0.JtO8wstX0e9gayzVKJ1_IuyE7TXJBphM0d4rH1PrUKAbRbebLFqHvKXDOg5IYNMlKcreL4SEF4AH3YNrJuKcCfVY74xXF4sK5dFesHZPPy9p208I6yodzh9tYJ9kBDKnDHTW8OivTsYshy2LO9CweVExgNVdsdKWrYMT4k5u9M9a8oZPWQYyiuh9nyi6Hphx25zMToeojHB-ARBvmp9x4Pi3y6_mqJsEiKO6pSSkajiW4KeDLvyyz6Tr2IlSzBxk2ko_ZwXM5iicueVjhqiLIXkzA8YZEZmCUJyRhAiln14w_gRhqhj-b0VYuJRH-mHNENMHvCDb7EQ4C5ppMgZ-NA';

// Helper function for error responses
function errorResponse(message: string, status: number, details?: any) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status }
  );
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
      return errorResponse('معرف العميل غير صالح', 400);
    }

    const response = await axios.get(`${API_BASE}/customer/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': API_TOKEN
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
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || isNaN(Number(id))) {
      return errorResponse('معرف العميل غير صالح', 400);
    }

    const requestData = await request.json();

    const response = await axios.put(`${API_BASE}/customer/${id}`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': API_TOKEN
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
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, error: 'معرف العميل غير صالح' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.delete(`${API_BASE}/customer/${id}`, {
      headers: {
        'Accept': 'text/plain', // فقط هذا الهيدر
        'Authorization': API_TOKEN
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