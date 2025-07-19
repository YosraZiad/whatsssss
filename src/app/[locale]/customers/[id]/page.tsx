'use client';

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; // Correct import

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('Customers');
  const locale = useLocale();
  const router = useRouter();
  
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        setCustomer(data.data); // تأكد أن البيانات في data.data
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params?.id]);

  const handleUpdate = async (values: any) => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t('submissionFailed'));
      }
      toast.success(t('customerUpdatedSuccessfully'));
      router.push(`/${locale}/customers`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('unknownError'));
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t('submissionFailed'));
      }
      toast.success(t('customerDeletedSuccessfully'));
      router.push(`/${locale}/customers`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('unknownError'));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#f9fafb] dark:bg-gray-950 px-2">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center mb-6 gap-2">
          <Link href={`/${locale}/customers`} className="text-[#2563eb] hover:text-[#1d4ed8] transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#2563eb] dark:text-[#60a5fa]">{t('customerDetails')}</h1>
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Customer Details</h1>
          <button
            onClick={() => router.push(`/${locale}/customers/${params.id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p>{customer.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p>{customer.companyName || '-'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p>{customer.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Master Mobile</p>
                <p>{customer.masterMobileNumber || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}