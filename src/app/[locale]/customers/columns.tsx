//src/app/[locale]/customers/columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Customer } from "@/types/customer";

export function useCustomerColumns(): ColumnDef<Customer>[] {
  const t = useTranslations('TableHeaders');

  return [
    {
      accessorKey: 'fullName',
      header: t('columns.fullName'),
    },
    {
      accessorKey: 'companyName',
      header: t('columns.companyName'),
    },
    {
      accessorKey: 'mobileNumber',
      header: t('columns.mobileNumber'),
    },
    {
      accessorKey: 'masterMobileNumber',
      header: t('columns.masterMobileNumber'),
    },
    {
      accessorKey: 'creationTime',
      header: t('columns.creationTime'),
      cell: ({ row }) => formatDate(row.getValue('creationTime')),
    },
    {
      accessorKey: 'lastModificationTime',
      header: t('columns.lastModificationTime'),
      cell: ({ row }) => formatDate(row.getValue('lastModificationTime')),
    },
  ];
};