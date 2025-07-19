// src/app/api/customers/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE = 'https://neosending.com/api/neosending/Whatsapp';
const API_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3ODA0NjgxQzMzMzc2NUYwMTMwRkQxQzEwRjZBNEM4QjhFMTk5MzAiLCJ4NXQiOiJSNEJHZ2NNemRsOEJNUDBjRVBha3lMamhtVEEiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL25lb3NlbmRpbmcuY29tLyIsImV4cCI6MTc4NDAxNjg5NSwiaWF0IjoxNzUyNDgwODk1LCJhdWQiOiJXaGF0c2FwcCIsInNjb3BlIjoiV2hhdHNhcHAiLCJqdGkiOiIwYzI3ZTkyOS02ODZhLTQxNzMtOTgzZS1jMmVkZjUwZjcyZWQiLCJzdWIiOiI4NGU3MmQ0OC0wNWNlLTJmNzgtYjFiMy0zYTFhZGVhMmIxZTUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ3ZWIiLCJlbWFpbCI6IndlYkBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoid2ViIiwiZmFtaWx5X25hbWUiOiJ0ZXN0IiwicGhvbmVfbnVtYmVyIjoiNzc3Nzc3Nzc3IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbF92ZXJpZmllZCI6IkZhbHNlIiwidW5pcXVlX25hbWUiOiJ3ZWIiLCJvaV9wcnN0IjoiV2hhdHNhcHBfQXBwIiwiY2xpZW50X2lkIjoiV2hhdHNhcHBfQXBwIiwib2lfdGtuX2lkIjoiNDI2NTQ2YzUtMjBhYi1hMzhjLTQ1M2UtM2ExYjFhMmQyYjJkIn0.JtO8wstX0e9gayzVKJ1_IuyE7TXJBphM0d4rH1PrUKAbRbebLFqHvKXDOg5IYNMlKcreL4SEF4AH3YNrJuKcCfVY74xXF4sK5dFesHZPPy9p208I6yodzh9tYJ9kBDKnDHTW8OivTsYshy2LO9CweVExgNVdsdKWrYMT4k5u9M9a8oZPWQYyiuh9nyi6Hphx25zMToeojHB-ARBvmp9x4Pi3y6_mqJsEiKO6pSSkajiW4KeDLvyyz6Tr2IlSzBxk2ko_ZwXM5iicueVjhqiLIXkzA8YZEZmCUJyRhAiln14w_gRhqhj-b0VYuJRH-mHNENMHvCDb7EQ4C5ppMgZ-NA';

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE}/customer`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': API_TOKEN 
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
        'Authorization': API_TOKEN
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