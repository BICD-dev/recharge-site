import { CheckCircle2, Phone, DollarSign, Calendar, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AirtimeSuccessProps {
    formData: {
        amount: number;
        phone: string;
        serviceID: string;
    };
    onGoHome: () => void;
    onDownloadReceipt: () => void;
}
const AirtimeSuccess: React.FC<AirtimeSuccessProps> = ({ formData, onGoHome, onDownloadReceipt }) => {
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-green-500 rounded-full p-4">
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Purchase Successful!
        </h1>
        <p className="text-gray-600">
          Your airtime has been delivered successfully
        </p>
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
                ₦{airtimeData?.amount?.toLocaleString()}
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
                {airtimeData?.phone}
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
                {airtimeData?.serviceID}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-green-100 rounded-full p-2">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Transaction Date</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate()}
            </p>
          </div>
        </div>
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
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Transaction ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
        </p>
      </div>
    </div>
  );
};
export default AirtimeSuccess;
// // Example usage
// export default function App() {
//   const sampleData = {
//     amount: 5000,
//     phone: "0812 345 6789",
//     serviceID: "MTN"
//   };
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      
//     </div>
//   );
// }