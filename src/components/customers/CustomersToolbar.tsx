// src/components/customers/CustomersToolbar.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface CustomersToolbarProps {
  onRefresh: () => void;
}

export function CustomersToolbar({ onRefresh }: CustomersToolbarProps) {
  const t = useTranslations('Customers');

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('refresh')}
        </Button>
      </div>
    </div>
  );
}