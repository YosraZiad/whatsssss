// src/components/ui/use-toast.ts
'use client';

import { toast } from 'react-hot-toast';

export const useToast = () => {
  return {
    toast,
    success: toast.success,
    error: toast.error,
    loading: toast.loading,
    dismiss: toast.dismiss,
  };
};

export default toast;