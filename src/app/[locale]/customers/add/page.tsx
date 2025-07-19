// src/app/[locale]/customers/add/page.tsx
'use client';

import { useTranslations, useLocale } from "next-intl";
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddCustomerPage() {
  const t = useTranslations('Customers');
  const locale = useLocale();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const requestData = {
        ...values,
        userName: values.userName || generateUsername(values.fullName),
        password: values.password || generateTempPassword()
      };

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('submissionFailed'));
      }

      toast.success(t('customerCreatedSuccessfully'));
      router.push(`/${locale}/customers`);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('unknownError'));
    }
  };

  const generateUsername = (fullName: string) => {
    return fullName.toLowerCase().replace(/\s+/g, '') + Math.floor(1000 + Math.random() * 9000);
  };

  const generateTempPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#f9fafb] dark:bg-gray-950 px-2">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center mb-6 gap-2">
          <Link href={`/${locale}/customers`} className="text-[#2563eb] hover:text-[#1d4ed8] transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#2563eb] dark:text-[#60a5fa]">{t('addCustomer')}</h1>
        </div>
        <CustomerForm 
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/${locale}/customers`)}
          showUsernameField={true}
          showPasswordField={true}
          // الأزرار داخل CustomerForm يجب أن تستخدم نفس التصميم والألوان كما في الجدول
        />
      </div>
    </div>
  );
}