// src/hooks/useTransaction.ts
import { useQuery, useMutation, useQueryClient,type UseQueryOptions } from '@tanstack/react-query';
import { transactionApi } from '../api/transaction';
import type {
  TransactionWithUser,
  TransactionsResponse,
  TransactionFilters,
} from '../constants/types/transaction.type';
import { toast } from 'react-hot-toast'; 

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters?: TransactionFilters) => [...transactionKeys.lists(), filters] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: number) => [...transactionKeys.details(), id] as const,
  receipt: (id: number) => [...transactionKeys.all, 'receipt', id] as const,
};


/**
 * Get all transactions with filters
 */
export const useTransactions = (
  filters?: TransactionFilters,
  options?: Omit<UseQueryOptions<TransactionsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => transactionApi.getTransactions(filters),
    staleTime: 30000, // 30 seconds
    ...options,
  });
};

/**
 * Get single transaction by ID
 */
export const useTransaction = (
  id: number,
  options?: Omit<UseQueryOptions<TransactionWithUser>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => transactionApi.getTransactionById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute
    ...options,
  });
};

/**
 * Get receipt HTML preview
 */
export const useReceiptPreview = (
  id: number,
  options?: Omit<UseQueryOptions<string>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: transactionKeys.receipt(id),
    queryFn: () => transactionApi.getReceiptPreview(id),
    enabled: !!id,
    staleTime: Infinity, // Receipts don't change
    ...options,
  });
};

/**
 * Download receipt PDF
 */
export const useDownloadReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reference }: { id: number; reference: string }) =>
      transactionApi.downloadReceipt(id, reference),
    onSuccess: () => {
      toast.success('Receipt downloaded successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to download receipt');
    },
  });
};

/**
 * Get receipt blob (for custom handling)
 */
export const useReceiptBlob = () => {
  return useMutation({
    mutationFn: (id: number) => transactionApi.getReceiptBlob(id),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to fetch receipt');
    },
  });
};

/**
 * Invalidate transaction queries
 * Useful after creating/updating transactions
 */
export const useInvalidateTransactions = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: transactionKeys.all });
  };
};

/**
 * Prefetch transaction details
 * Useful for optimistic UI
 */
export const usePrefetchTransaction = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: transactionKeys.detail(id),
      queryFn: () => transactionApi.getTransactionById(id),
      staleTime: 60000,
    });
  };
};