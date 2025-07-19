// src/components/customers/CustomerForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { CustomerFormValues, CustomerFormProps } from '@/types/customer';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function CustomerForm({
  initialData,
  onSubmit,
  onSuccess,
  onError,
  onCancel, // أضف هذا السطر
  loading = false,
}: CustomerFormProps & { onCancel?: () => void }) { // أضف onCancel هنا
  const t = useTranslations('Customers');
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormValues>({
    defaultValues: initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (onError) {
        onError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEdit = !!initialData;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-black dark:text-white">{t('fullName')} *</Label>
        <Input
          id="fullName"
          {...register('fullName', { required: t('validation.required') })}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="mobileNumber" className="text-black dark:text-white">{t('mobileNumber')} *</Label>
        <Input
          id="mobileNumber"
          {...register('mobileNumber', { 
            required: t('validation.required'),
            pattern: {
              value: /^[0-9]+$/,
              message: t('errors.invalidMobile') || 'Invalid mobile number'
            }
          })}
        />
        {errors.mobileNumber && (
          <p className="text-sm text-red-500">{errors.mobileNumber.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="userName" className="text-black dark:text-white">{t('userName', { defaultValue: 'Username' })} *</Label>
        <Input
          id="userName"
          {...register('userName', { required: t('validation.required') })}
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-black dark:text-white">{t('password', { defaultValue: 'Password' })} *</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { 
            required: t('validation.required'),
            minLength: {
              value: 8,
              message: t('errors.passwordMinLength')
            },
            validate: {
              hasLowercase: value => /[a-z]/.test(value) || t('errors.passwordLowercase'),
              hasUppercase: value => /[A-Z]/.test(value) || t('errors.passwordUppercase'),
              hasSpecial: value => /[!@#$%^&*]/.test(value) || t('errors.passwordSpecial')
            }
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="masterMobileNumber" className="text-black dark:text-white">{t('masterMobileNumber')} ({t('optional', { defaultValue: 'Optional' })})</Label>
        <Input
          id="masterMobileNumber"
          {...register('masterMobileNumber')}
        />
      </div>

      <div className="flex gap-2 mt-6 justify-end">
        <button
          type="submit"
          className="h-10 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition flex items-center gap-2"
          disabled={isSubmitting || loading}
          title={isEdit ? t('update') : t('create')}
        >
          {isSubmitting || loading
            ? t('submitting', { defaultValue: 'Submitting...' })
            : isEdit
              ? t('update', { defaultValue: 'Update' })
              : t('create', { defaultValue: 'Create' })}
        </button>
        <button
          type="button"
          onClick={() => onCancel && onCancel()}
          className="h-10 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200 font-semibold transition flex items-center gap-2"
          disabled={isSubmitting || loading}
          title={t('cancel')}
        >
          {t('cancel', { defaultValue: 'Cancel' })}
        </button>
      </div>
    </form>
  );
}