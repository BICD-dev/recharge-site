    import type {
  ApiResponse,
  TransactionWithUser,
  TransactionsResponse,
  TransactionFilters,
} from '../constants/types/transaction.type';
import axiosClient from './AxiosClient';

export const transactionApi = {
  /**
   * Get all transactions with optional filters
   */
  getTransactions: async (filters?: TransactionFilters): Promise<TransactionsResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.service_type) params.append('service_type', filters.service_type);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const { data } = await axiosClient.get<ApiResponse<TransactionsResponse>>(
      `/transaction?${params.toString()}`
    );
    
    return data.data;
  },

  /**
   * Get a single transaction by ID
   */
  getTransactionById: async (id: number): Promise<TransactionWithUser> => {
    const { data } = await axiosClient.get<ApiResponse<TransactionWithUser>>(
      `/transaction/${id}`
    );
    
    return data.data;
  },

  /**
   * Get receipt HTML preview
   */
  getReceiptPreview: async (id: number): Promise<string> => {
    const { data } = await axiosClient.get<string>(
      `/transaction/${id}/receipt`,
      {
        headers: {
          'Accept': 'text/html',
        },
      }
    );
    
    return data;
  },

  /**
   * Download receipt PDF
   * Returns blob URL for download
   */
  downloadReceipt: async (id: number, reference: string): Promise<string> => {
    const { data } = await axiosClient.get(
      `/transaction/${id}/receipt/download`,
      {
        responseType: 'blob',
      }
    );

    // Create blob URL for download
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${reference}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(url);
    
    return url;
  },

  /**
   * Download receipt PDF (alternative - returns blob for custom handling)
   */
  getReceiptBlob: async (id: number): Promise<Blob> => {
    const { data } = await axiosClient.get(
      `/transaction/${id}/receipt/download`,
      {
        responseType: 'blob',
      }
    );
    
    return data;
  },
};