
interface BalanceCardProps {
  title: string;
  amount: string | number;
  buttonText: string;
  onButtonClick?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ title, amount, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">{amount}</h2>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-4 px-4 py-2 bg-[#60da68] cursor-pointer text-white rounded-md font-medium hover:bg-[#60da68] transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default BalanceCard;
