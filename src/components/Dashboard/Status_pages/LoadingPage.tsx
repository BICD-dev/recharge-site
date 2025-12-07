import { Loader2, Phone, DollarSign, Calendar } from "lucide-react";

interface LoadingProps {
  purpose: string;
  formData: {
    amount?: number;
    variation_amount?: number;
    phone: string;
    serviceID: string;
  };
}

const LoadingPage: React.FC<LoadingProps> = ({ purpose, formData }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 h-screen">
      {/* Loading Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-300 rounded-full blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-blue-500 rounded-full p-4">
            <Loader2 className="w-16 h-16 text-white animate-spin" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Processing...
        </h1>
        <p className="text-gray-600">
          We are completing your {purpose} purchase. Please wait.
        </p>
      </div>

      {/* Quick Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <p className="text-lg font-semibold text-gray-900">
                ₦ {formData.amount || formData.variation_amount}
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
                {formData.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Request Time</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Please do not close this page.
      </p>
    </div>
  );
};

export default LoadingPage;
