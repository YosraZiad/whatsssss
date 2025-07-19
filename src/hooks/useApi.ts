// src/hooks/useApi.ts

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import type { Customer, CustomerListResponse, ApiResponse } from '@/types/customer.d.ts'; // استيراد الواجهات

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>, // تم تحديث نوع apiCall لقبول ApiResponse
  dependencies: any[] = []
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiCall(); // response هو الآن من نوع ApiResponse<T>

        if (isMounted) {
          // نستخدم response.data لأن ApiResponse الخاص بك يحتوي على خاصية data
          setState({
            data: response.data || null, // إذا كانت response.data فارغة، ستكون data null
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع'
          });
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}

// Hooks مخصصة للكيانات المختلفة
export function useCustomers() {
  // هنا نحدد أن useApi ستعود ببيانات من نوع CustomerListResponse
  return useApi<CustomerListResponse>(() => apiService.getCustomers());
}

export function useMobileAccounts(customerId?: number) {
  return useApi(
    () => apiService.getMobileAccounts(customerId ? { customerId } : undefined),
    [customerId]
  );
}

export function useSubscriptions(customerId?: number) {
  return useApi(
    () => apiService.getSubscriptions(customerId ? { customerId } : undefined),
    [customerId]
  );
}