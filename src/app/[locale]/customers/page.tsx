'use client';

import { useTranslations, useLocale } from "next-intl";
import { CustomersTable } from '@/components/customers/CustomersTable';
import { useCustomers } from '@/hooks/useCustomers';
import { useRouter } from 'next/navigation';
import { Customer } from '@/types/customer';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast'; // Correct import

export default function CustomersPage() {
  const t = useTranslations('Customers');
  const locale = useLocale();
  
  const { customers = [], loading, error, refetch } = useCustomers();
  const router = useRouter();

  const handleView = (customer: Customer) => {
    router.push(`/${locale}/customers/${customer.id}`);
  };

  const handleEdit = (customer: Customer) => {
    router.push(`/${locale}/customers/${customer.id}/edit`);
  };

  const handleDelete = async (id: number) => {
    try {
      // استخدام apiClient الذي يحتوي على التوكن تلقائياً
      const response = await apiClient.delete(`/customers/${id}`);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.error || t('deleteError'));
      }

      toast.success(t('deleteSuccess')); // Correct toast usage
      await refetch();
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      const errorMessage = error.response?.data?.error || error.message || t('deleteError');
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2
        className="text-3xl font-bold mb-4 text-black pl-4"
        style={{ letterSpacing: '0.01em', lineHeight: '1.2' }}
      >
        {t('title')}
      </h2>
     
      <div className="mt-0">
        <CustomersTable
          customers={customers}
          loading={loading}
          error={error}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}