import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, register, resetPassword, sendResetPasswordOtp } from '@/api/auth';
import { toast } from 'react-hot-toast';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  login: () => [...authKeys.all, 'login'] as const,
  register: () => [...authKeys.all, 'register'] as const,
    sendResetPassword: () => [...authKeys.all, 'sendResetPassword'] as const,
};
interface LoginCredentials {
    email: string;
    password: string;
}

// Mutation: register user
// export function useRegister() {
//   const qc = useQueryClient();
//     return useMutation({
//     mutationFn: (data: { username: string; email: string; password: string }) => register(data),
//     onSuccess: (res) => {
//       qc.invalidateQueries(); // Invalidate all queries to clear stale data
//     },
//   });
// }
// Mutation: login user

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    // 1. Wrap multiple arguments into a single object
    mutationFn: ({ email, password }: LoginCredentials) => login({ email, password }),
    
    // 2. Place handlers inside the options object, not the function call
    onSuccess: (res) => {
      // 3. Invalidate EVERYTHING to clear stale data from previous users
      qc.invalidateQueries(); 
      
      toast.success(res.data?.message ?? 'Logged in successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Login failed');
    },
  });
}

export function useSendResetPassword() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (email: string) => sendResetPasswordOtp(email),
        onSuccess: (res) => {
            qc.invalidateQueries();
            toast.success(res.data?.message || 'Reset OTP sent successfully');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Failed to send reset OTP');
        }
    });
}

export function useResetPassword() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string; reset_token: string; password: string }) => resetPassword(data),
        onSuccess: (res) => {
            qc.invalidateQueries();
            toast.success(res.data?.message || 'Password reset successfully');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Password reset failed');
        }
    });
}
