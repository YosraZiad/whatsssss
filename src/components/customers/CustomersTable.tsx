// src/components/customers/CustomersTable.tsx
'use client';

import { useState, useMemo } from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import  Link from 'next/link';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye, Search, ChevronLeft, ChevronRight, Settings2, Plus, RefreshCw } from 'lucide-react';
import { useTranslations ,useLocale} from 'next-intl';



interface CustomersTableProps {
  customers: Customer[];
  loading?: boolean;
  error?: string | null;
  onView?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (id: number) => Promise<void>;
  onRefresh?: () => Promise<void>;
}

export function CustomersTable({
  customers = [],
  loading = false,
  error = null,
  onView,
  onEdit,
  onDelete,
  onRefresh,
}: CustomersTableProps) {
  const t = useTranslations('Customers');
  const locale = useLocale()
  
  const [search, setSearch] = useState('');

  // فلترة العملاء حسب البحث
  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    return customers.filter((c) =>
      [c.fullName, c.companyName, c.mobileNumber, c.masterMobileNumber]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, customers]);

  // تخصيص الأعمدة
  const allColumns = [
    { key: 'fullName', label: t('name') },
    { key: 'companyName', label: t('company') },
    { key: 'mobileNumber', label: t('mobile') },
    { key: 'masterMobileNumber', label: t('master_mobile') },
  ];
  const [visibleCols, setVisibleCols] = useState<string[]>(allColumns.map(col => col.key));
  const [showColsMenu, setShowColsMenu] = useState(false);

  // الباجيناشن
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const pagedCustomers = useMemo(
    () => filteredCustomers.slice((page - 1) * pageSize, page * pageSize),
    [filteredCustomers, page, pageSize]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* البحث في اليسار، الأزرار في اليمين */}
        <div className="flex-1 order-2 sm:order-1">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder={t('search_customers') || 'Search...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition outline-none bg-white dark:bg-gray-900 dark:text-gray-100 shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
          </div>
        </div>
        <div className="flex gap-2 items-center order-1 sm:order-2 justify-end w-full sm:w-auto">
          <Link href={`/${locale}/customers/add`} passHref>
            <Button
              variant="default"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white h-10 px-4 rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {t('add_customer')}
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-200 dark:border-gray-700 h-10 w-10 rounded-lg flex items-center justify-center"
                  onClick={onRefresh}
                  aria-label={t('refresh')}
                >
                  <RefreshCw className="h-5 w-5 text-[#2563eb] dark:text-[#60a5fa]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t('refresh_tooltip')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 dark:border-gray-700 h-10 w-10 rounded-lg flex items-center justify-center"
              onClick={() => setShowColsMenu(v => !v)}
              aria-label={t('customize_columns')}
            >
              <Settings2 className="h-5 w-5 text-[#2563eb] dark:text-[#60a5fa]" />
            </Button>
            {showColsMenu && (
              <div className="absolute z-20 right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg p-2">
                <div className="font-bold mb-2 text-[#2563eb] dark:text-[#60a5fa]">
                  {t('customize_columns_title')}
                </div>
                {allColumns.map(col => (
                  <label key={col.key} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleCols.includes(col.key)}
                      onChange={() => {
                        setVisibleCols(cols =>
                          cols.includes(col.key)
                            ? cols.filter(k => k !== col.key)
                            : [...cols, col.key]
                        );
                      }}
                    />
                    <span className="dark:text-gray-100">{col.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-x-auto border border-gray-100 dark:border-gray-700">
        {loading ? (
          <div className="py-10 text-center text-[#2563eb] font-semibold">{t('loading_customers') || 'Loading customers...'}</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{t('error')}: {error}</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="py-10 text-center text-gray-400">{t('no_customers_found') || 'No customers found.'}</div>
        ) : (
          <>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#2563eb]/10 text-[#2563eb]">
                  {allColumns.map(
                    col =>
                      visibleCols.includes(col.key) && (
                        <th key={col.key} className="px-6 py-3 text-left font-semibold">
                          {col.label}
                        </th>
                      )
                  )}
                  <th className="px-6 py-3 text-left font-semibold">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {pagedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t hover:bg-[#2563eb]/5 transition">
                    {visibleCols.includes('fullName') && (
                      <td className="px-6 py-2">{customer.fullName}</td>
                    )}
                    {visibleCols.includes('companyName') && (
                      <td className="px-6 py-2">{customer.companyName}</td>
                    )}
                    {visibleCols.includes('mobileNumber') && (
                      <td className="px-6 py-2">{customer.mobileNumber}</td>
                    )}
                    {visibleCols.includes('masterMobileNumber') && (
                      <td className="px-6 py-2">{customer.masterMobileNumber}</td>
                    )}
                    <td className="px-6 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-[#2563eb]/10">
                            <MoreHorizontal className="h-5 w-5 text-[#2563eb]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg shadow border border-gray-100">
                          <DropdownMenuItem onClick={() => onView?.(customer)} className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-[#2563eb]" />
                            <span className="text-[#2563eb]">{t('view')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit?.(customer)} className="flex items-center gap-2">
                            <Edit className="h-4 w-4 text-[#f59e42]" />
                            <span className="text-[#f59e42]">{t('edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete?.(customer.id)}
                            className="flex items-center gap-2 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>{t('delete')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* الباجيناشن */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t bg-[#f9fafb] rounded-b-xl">
              <div className="text-xs text-gray-500">
                {t('showing')} {(page - 1) * pageSize + 1}
                {' - '}
                {Math.min(page * pageSize, filteredCustomers.length)}
                {' '}
                {t('of')} {filteredCustomers.length} {t('customers')}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 flex items-center justify-center"
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  aria-label={t('previous')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? 'default' : 'ghost'}
                    size="icon"
                    className={`rounded-full h-8 w-8 flex items-center justify-center ${page === i + 1 ? 'bg-[#2563eb] text-white' : ''}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 flex items-center justify-center"
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  aria-label={t('next')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}