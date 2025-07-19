export interface Customer {
  id: number;
  fullName: string;
  companyName?: string;
  mobileNumber: string;
  masterMobileNumber?: string;
  creationTime: string;
  lastModificationTime?: string;
  isDeleted?: boolean;
}

export interface CustomerFormValues {
  fullName: string;
  mobileNumber: string;
  userName: string;
  password: string;
  masterMobileNumber?: string;
}

export interface CustomerApiResponse {
  success: boolean;
  items?: Customer[];
  totalCount?: number;
  error?: string;
  message?: string;
}

export interface CustomersTableProps {
  customers: Customer[];
  loading?: boolean;
  error?: string | null;
  onView?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (id: number) => Promise<void>;
  onRefresh?: () => Promise<void>;
  className?: string;
}

export interface CustomerFormProps {
  initialData?: Partial<Customer>;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  loading?: boolean;
  showUsernameField?: boolean;
  showPasswordField?: boolean;
}