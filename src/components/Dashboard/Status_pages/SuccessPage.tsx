import {
  CheckCircle2,
  Download,
  Home,
} from "lucide-react";

interface SuccessProps {
  purpose: string;
  formData: {
    variation_name?: string;
    variation_amount?: number;
    amount?: number;
    phone: string;
    serviceID: string;
  };
  onGoHome: () => void;
  onDownloadReceipt: () => void;
}
const SuccessPage: React.FC<SuccessProps> = ({
  purpose,
  formData,
  onGoHome,
  onDownloadReceipt,
}) => {
  const displayAmount = formData.amount || formData.variation_amount;
  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 h-screen my-2">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-green-700 rounded-full p-4">
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Purchase Successful!
        </h1>
        <p className="text-gray-600">
          Your {purpose} has been delivered successfully
        </p>
      </div>
       <div className="bg-white text-gray-900 rounded-xl p-6 mb-6 flex flex-col items-center">
        {/* <p className="text-sm opacity-80 mb-1">Amount</p> */}
        <p className="text-3xl font-semibold mb-4">₦ {displayAmount}</p>
      </div>

      {/* Transaction Details */}
      {/* Quick Actions Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Share Receipt */}
        <button
          onClick={() => {
            /* handle share */
          }}
          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="bg-blue-100 p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M7.76 7.76l.01.01M16.24 16.24l.01.01M7.76 16.24l.01.01M16.24 7.76l.01.01M9 12a3 3 0 116 0 3 3 0 01-6 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Share</p>
        </button>

        {/* Add to Favorites */}
        <button
          onClick={() => {
            /* handle favorite */
          }}
          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="bg-pink-100 p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Favorite</p>
        </button>

        {/* View Details */}
        <button
          onClick={() => {
            /* handle view details */
          }}
          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Details</p>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onDownloadReceipt}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Receipt
        </button>

        <button
          onClick={onGoHome}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      {/* Reference Info */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Transaction ID:{" "}
          {Math.random().toString(36).substring(2, 15).toUpperCase()}
        </p>
      </div> */}
    </div>
  );
};
export default SuccessPage;
