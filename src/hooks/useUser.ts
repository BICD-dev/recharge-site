import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUser, setPin } from '@/api/user';
import { toast } from 'react-hot-toast';

// Query Keys
export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  setPin: () => [...userKeys.all, 'setPin'] as const,
};

// Query: fetch current user
export function useUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const res = await fetchUser();
      return res.data?.data ?? null;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Mutation: set transaction PIN
export function useSetPin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (pin: string) => setPin(pin),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: userKeys.me() });
      toast.success(res.data?.message ?? 'PIN set successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to set PIN');
    },
  });
}