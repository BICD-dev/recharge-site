import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fundWallet, walletBalance, verifyFunds, getTransactionHistory } from '@/api/wallet';
import { toast } from 'react-hot-toast';

// Query Keys
export const walletKeys = {
  all: ['wallet'] as const,
  balance: () => [...walletKeys.all, 'balance'] as const,
  transactions: () => [...walletKeys.all, 'transactions'] as const,
  fund: () => [...walletKeys.all, 'fund'] as const,
  verify: () => [...walletKeys.all, 'verify'] as const,
};

// get wallet balance
export function useWalletBalance() {
  return useQuery({
    queryKey: walletKeys.balance(),
    queryFn: async () => {
      const response = await walletBalance();
      return response.data;
    },
  });
}

// get transaction history
export function useWalletTransactions() {
  return useQuery({
    queryKey: walletKeys.transactions(),
    queryFn: async () => {
      const response = await getTransactionHistory();
      return response.data;
    },
  });
}

// mutation: fund wallet
export function useFundWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { amount?: number | string; email: string }) => fundWallet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
      queryClient.invalidateQueries({ queryKey: walletKeys.transactions() });
      toast.success('Wallet funding initiated');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to initiate funding');
    },
  });
}

// mutation: verify funds
export function useVerifyFunds() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reference: string) => verifyFunds(reference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
      queryClient.invalidateQueries({ queryKey: walletKeys.transactions() });
      toast.success('Payment verified');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Verification failed');
    },
  });
}