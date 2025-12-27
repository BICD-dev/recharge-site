import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as purchaseApi from '@/api/purchase';
import type {
  Airtime,
  CableTv,
  Data,
  Education_Jamb_Pin_Vending,
  Education_Jamb_Profile_verification,
  Education_Waec_PinCheck,
  ElectricityMeterValidation,
  ElectricityPostpaid,
  ElectricityPrepaid,
} from '@/constants/types/vtPassTypes';
import { toast } from 'react-hot-toast';

// Query Keys
export const purchaseKeys = {
  all: ['purchase'] as const,
  variations: (serviceID?: string) =>
    [...purchaseKeys.all, 'variations', { serviceID }] as const,
  validatePin: (pin?: string) => [...purchaseKeys.all, 'validatePin', { pin }] as const,
  verifySmartcard: (serviceID?: string, billersCode?: string) =>
    [...purchaseKeys.all, 'verifySmartcard', { serviceID, billersCode }] as const,
};

// Queries

export function useGetVariations(serviceID?: string) {
  return useQuery({
    queryKey: purchaseKeys.variations(serviceID),
    queryFn: async () => {
      if (!serviceID) throw new Error('serviceID is required');
      const res = await purchaseApi.getVariations(serviceID);
      return res.data ?? res;
    },
    enabled: !!serviceID,
    staleTime: 2 * 60 * 1000,
  });
}

export function useValidatePin(pin?: string) {
  return useQuery({
    queryKey: purchaseKeys.validatePin(pin),
    queryFn: async () => {
      if (!pin) throw new Error('pin is required');
      const res = await purchaseApi.validatePin(pin);
      return res.data ?? res;
    },
    enabled: !!pin,
    staleTime: 5 * 60 * 1000,
  });
}

// Mutations

export function useBuyAirtime() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Airtime) => purchaseApi.buyAirtime(data),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('Airtime purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Airtime purchase failed');
    },
  });
}

export function useBuyData() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Data) => purchaseApi.buyData(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('Data purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Data purchase failed');
    },
  });
}

export function useBuyCableTv() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => purchaseApi.buyCableTv(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('Cable TV purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Cable TV purchase failed');
    },
  });
}

export function useVerifySmartCard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { billersCode: string; serviceID: 'dstv' | 'gotv' | 'startimes' }) =>
      purchaseApi.verifySmartCardApi(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
    },
    onError: (err: any) => {
      toast.error(err?.message || err?.response?.data?.message || 'Smartcard verification failed');
    },
  });
}

export function useBuyElectricityPostpaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ElectricityPostpaid) => purchaseApi.buyElectricityPostpaid(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('Electricity (postpaid) purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Electricity postpaid purchase failed');
    },
  });
}

export function useBuyElectricityPrepaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ElectricityPrepaid) => purchaseApi.buyElectricityPrepaid(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('Electricity (prepaid) purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Electricity prepaid purchase failed');
    },
  });
}

export function useValidateElectricityMeter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ElectricityMeterValidation) => purchaseApi.validateElectricityMeter(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Meter validation failed');
    },
  });
}

export function useBuyWaecPin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Education_Waec_PinCheck) => purchaseApi.buyWaecPin(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('WAEC PIN purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'WAEC purchase failed');
    },
  });
}

export function useValidateJambPin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Education_Jamb_Profile_verification) => purchaseApi.validateJambPin(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'JAMB validation failed');
    },
  });
}

export function useBuyJambPin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Education_Jamb_Pin_Vending) => purchaseApi.buyJambPin(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: purchaseKeys.all });
      toast.success('JAMB PIN purchase successful');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'JAMB PIN purchase failed');
    },
  });
}