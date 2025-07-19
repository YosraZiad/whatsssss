// src/components/customers-data.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { CustomersTable } from './customers-table';
import { useTranslations } from 'next-intl';
import { useCustomerColumns } from '@/app/[locale]/customers/columns';
import { Customer, CustomerApiResponse } from '@/types/customer';

export function CustomersData() {
  const { data, isLoading, error } = useQuery<CustomerApiResponse>({
    queryKey: ['customers'],
    queryFn: async () => {
      const res = await fetch('/api/customers');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    retry: 3,
    retryDelay: 1000
  });

  const t = useTranslations('CustomersTable');
  const columns = useCustomerColumns(); // تأكد أن هذا يعيد ColumnDef<Customer>[]

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {t('totalCustomers', { count: data?.totalCount ?? 0 })}
        </p>
      </div>
      <CustomersTable
        columns={columns}
        data={data?.items || []}
        isLoading={isLoading}
      />
    </>
  );
}