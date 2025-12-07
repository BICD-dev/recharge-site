import { CreditCard } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount?: string | number;
  buttonText?: string;
  onButtonClick?: () => void;
  loading?: boolean;
  variant?: "gradient" | "white";
  showIcon?: boolean;
  showLastUpdated?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  title, 
  amount, 
  buttonText, 
  onButtonClick,
  loading,
  variant = "white",
  showIcon = false,
  showLastUpdated = false
}) => {
  const isGradient = variant === "gradient";

  return (
    <div 
      className={`p-6 rounded-2xl shadow ${
        isGradient 
          ? "bg-linear-to-br from-green-500 to-green-600 text-white" 
          : "bg-white"
      } flex flex-col justify-between`}
    >
      <div className={`flex justify-between items-start mb-4 ${!isGradient && "mb-2"}`}>
        <div className="flex-1">
          <p className={`text-sm mb-1 ${
            isGradient ? "opacity-90" : "text-gray-500"
          }`}>
            {title}
          </p>

          {loading ? (
            <div className={`h-8 w-32 rounded-md mt-2 animate-pulse ${
              isGradient ? "bg-white/20" : "bg-gray-200"
            }`}></div>
          ) : (
            <h2 className={`text-3xl font-bold mt-2 ${
              isGradient ? "text-white" : "text-gray-900"
            }`}>
              ₦{amount?.toLocaleString()}
            </h2>
          )}
        </div>

        {showIcon && (
          <CreditCard 
            size={32} 
            className={isGradient ? "opacity-80" : "text-gray-400"} 
          />
        )}
      </div>

      {showLastUpdated && isGradient && (
        <p className="text-sm opacity-90 mb-4">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
      )}

      {buttonText && (
        <button
          onClick={onButtonClick}
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
            isGradient
              ? "bg-white text-green-600 hover:bg-gray-50 shadow-lg"
              : "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/30"
          }`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default BalanceCard;