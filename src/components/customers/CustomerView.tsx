// src/components/customers/CustomerView.tsx
'use client';

import { Customer } from '@/types/customer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CustomerViewProps {
  customer: Customer;
  onEdit?: () => void;
}

export function CustomerView({ customer, onEdit }: CustomerViewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{customer.fullName}</CardTitle>
          {onEdit && <Button onClick={onEdit}>Edit</Button>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Company Name</h3>
            <p>{customer.companyName}</p>
          </div>
          <div>
            <h3 className="font-medium">Mobile Number</h3>
            <p>{customer.mobileNumber}</p>
          </div>
          <div>
            <h3 className="font-medium">Master Mobile Number</h3>
            <p>{customer.masterMobileNumber}</p>
          </div>
          <div>
            <h3 className="font-medium">Creation Time</h3>
            <p>{new Date(customer.creationTime).toLocaleString()}</p>
          </div>
          {customer.lastModificationTime && (
            <div>
              <h3 className="font-medium">Last Modification Time</h3>
              <p>{new Date(customer.lastModificationTime).toLocaleString()}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}