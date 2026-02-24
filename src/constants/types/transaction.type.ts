// src/types/transaction.types.ts

export type TransactionType = 'credit' | 'debit';

export type TransactionStatus = 
  | 'pending' 
  | 'processing' 
  | 'successful' 
  | 'failed' 
  | 'refunded';

export type ServiceType =
  | 'waec-registration'
  | 'waec-result-checker'
  | 'airtime'
  | 'data'
  | 'electricity'
  | 'cable-tv'
  | 'internet'
  | 'jamb'
  | 'neco';

export interface Transaction {
  id: number;
  wallet_id: number;
  reference: string;
  external_reference: string;
  request_id?: string;
  service_type: ServiceType;
  service_provider: string;
  variation_code?: string;
  purpose: string;
  amount: number;
  quantity: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  balance_before: number;
  balance_after: number;
  phone?: string;
  email?: string;
  metadata?: Record<string, any>;
  provider_request?: Record<string, any>;
  provider_response?: Record<string, any>;
  error_message?: string;
  error_code?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface TransactionWithUser extends Transaction {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_phone?: string;
}

export interface TransactionFilters {
  status?: TransactionStatus;
  service_type?: ServiceType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
} 