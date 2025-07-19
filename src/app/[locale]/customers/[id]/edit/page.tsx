'use client';

import { CustomerForm } from '@/components/customers/CustomerForm';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const t = useTranslations('Customers');
  const locale = useLocale();
  const router = useRouter();

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${params.id}`);
        if (!response.ok) {
          throw new Error(t('customerNotFound'));
        }
        const data = await response.json();
        setCustomer(data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('unknownError'));
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params.id, t]);

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(t('errors.submissionFailed'));
      }

      toast.success(t('updateSuccess'));
      router.push(`/${locale}/customers`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('unknownError'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-[#2563eb] font-semibold">
        {t('loading')}
      </div>
    );
  }
  if (!customer) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 font-semibold">
        {t('customerNotFound')}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#f9fafb] dark:bg-gray-950 px-2">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center mb-6 gap-2">
          <Link href={`/${locale}/customers`} className="text-[#2563eb] hover:text-[#1d4ed8] transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#2563eb] dark:text-[#60a5fa]">{t('editCustomer')}</h1>
        </div>
        <CustomerForm
          initialData={customer}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/${locale}/customers`)}
        />
      </div>
    </div>
  );
}