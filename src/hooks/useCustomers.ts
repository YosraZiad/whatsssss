// src/hooks/useCustomers.ts
'use client';

import { useState, useEffect } from 'react';
import { Customer } from '@/types/customer';

interface ApiResponse {
  success: boolean;
  items?: Customer[];
  totalCount?: number;
  error?: string;
}

export function useCustomers() {
  const [state, setState] = useState<{
    customers: Customer[];
    loading: boolean;
    error: string | null;
    totalCount: number;
  }>({
    customers: [],
    loading: true,
    error: null,
    totalCount: 0,
  });

  const fetchCustomers = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch('/api/customers');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'API request failed');
      }

      setState({
        customers: data.items || [],
        loading: false,
        error: null,
        totalCount: data.totalCount || 0,
      });
      
    } catch (err) {
      console.error('Fetch Error:', err);
      setState({
        customers: [],
        loading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
        totalCount: 0,
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    ...state,
    refetch: fetchCustomers,
  };
}