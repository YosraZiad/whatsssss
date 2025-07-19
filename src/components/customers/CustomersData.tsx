// src/components/customers/CustomersData.tsx
'use client';

import { useState } from 'react';
import { Customer } from '@/types/customer';
import { CustomersTable } from './CustomersTable';
import { CustomerForm } from './CustomerForm';
import { CustomerView } from './CustomerView';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CustomersDataProps {
  customers: Customer[];
}

export function CustomersData({ customers }: CustomersDataProps) {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>('view');

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setMode('view');
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setMode('edit');
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      router.refresh();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleCreate = () => {
    setSelectedCustomer(null);
    setMode('create');
  };

  const handleCancel = () => {
    setSelectedCustomer(null);
    setMode('view');
  };

  const handleSuccess = () => {
    router.refresh();
    setMode('view');
  };

  return (
    <div className="space-y-4">
      {mode === 'view' && (
        <>
          <Button onClick={handleCreate}>Add Customer</Button>
          <CustomersTable
            customers={customers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      {mode === 'edit' && selectedCustomer && (
        <CustomerForm
          defaultValues={selectedCustomer}
          onSubmit={async (values) => {
            await fetch(`/api/customers/${selectedCustomer.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            handleSuccess();
          }}
          isSubmitting={false}
          isEdit
        />
      )}

      {mode === 'create' && (
        <CustomerForm
          onSubmit={async (values) => {
            await fetch('/api/customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            handleSuccess();
          }}
          isSubmitting={false}
        />
      )}

      {mode === 'view' && selectedCustomer && (
        <CustomerView
          customer={selectedCustomer}
          onEdit={() => handleEdit(selectedCustomer)}
        />
      )}
    </div>
  );
}