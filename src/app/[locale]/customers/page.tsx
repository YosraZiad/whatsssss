'use client';

import { useTranslations, useLocale } from "next-intl";
import { CustomersTable } from '@/components/customers/CustomersTable';
import { useCustomers } from '@/hooks/useCustomers';
import { useRouter } from 'next/navigation';
import { Customer } from '@/types/customer';
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
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('deleteError'));
      }

      toast.success(t('deleteSuccess')); // Correct toast usage
      await refetch();
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error(
        error instanceof Error ? error.message : t('deleteError')
      );
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