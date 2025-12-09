import { Loader2 } from "lucide-react";

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
  const displayAmount = formData.amount || formData.variation_amount;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 h-screen">

      {/* Loading Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-300 rounded-full blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-green-700 rounded-full p-4">
            <Loader2 className="w-16 h-16 text-white animate-spin" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Processing...</h1>
        <p className="text-gray-600">
          We are completing your {purpose} purchase. Please wait.
        </p>
      </div>

      {/* Processing Summary Section */}
      <div className="bg-green-700 text-white rounded-xl p-6 mb-6 flex flex-col items-center">
        <p className="text-sm opacity-80 mb-1">Amount</p>
        <p className="text-3xl font-semibold mb-4">₦ {displayAmount}</p>

        <p className="text-center text-sm opacity-90 leading-relaxed">
          Please hold on while we process your request…
        </p>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-500 text-center">
        Please do not close this page.
      </p>
    </div>
  );
};

export default LoadingPage;
