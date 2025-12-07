import { XCircle, Phone, DollarSign, Calendar, Home, RefreshCcw, AlertCircle } from 'lucide-react';

interface FailedProps {
  purpose: string;
  formData: {
    variation_name?: string;
    variation_amount?: number;
    amount?: number;
    phone: string;
    serviceID: string;
  };
  errorMessage?: string;
  onGoHome: () => void;
  onRetry: () => void;
}

const FailedPage: React.FC<FailedProps> = ({ 
  purpose, 
  formData, 
  errorMessage = "An unexpected error occurred",
  onGoHome, 
  onRetry 
}) => {
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 h-screen">
      {/* Failed Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-red-500 rounded-full p-4">
            <XCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Failed Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Transaction Failed
        </h1>
        <p className="text-gray-600">
          Your {purpose} purchase could not be completed
        </p>
      </div>

      {/* Error Message */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 text-sm mb-1">
              Error Details
            </h3>
            <p className="text-sm text-red-700">
              {errorMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <p className="text-lg font-semibold text-gray-900">
                ₦{(formData.amount || formData.variation_amount)?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 rounded-full p-2">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-lg font-semibold text-gray-900">
                {formData?.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 rounded-full p-2">
              <div className="w-5 h-5 flex items-center justify-center text-orange-600 font-bold text-xs">
                SIM
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Network Provider</p>
              <p className="text-lg font-semibold text-gray-900">
                {formData?.serviceID}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-200 rounded-full p-2">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Attempted At</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate()}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" />
          Try Again
        </button>
        
        <button
          onClick={onGoHome}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      {/* Help Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center mb-2">
          Transaction ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
        </p>
        <p className="text-xs text-gray-500 text-center">
          Need help? Contact support at{' '}
          <a href="mailto:support@datafy.com" className="text-green-600 hover:underline">
            support@datafy.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default FailedPage;