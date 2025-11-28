
interface ReferralCardProps {
  referralCode: string;
  onCopy?: () => void;
  description?: string;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referralCode, onCopy, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Your Referral Code</h3>

      <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
        <span className="font-mono text-lg tracking-wider">{referralCode}</span>
        <button
          onClick={onCopy}
          className="ml-auto px-3 py-1.5 bg-[#60da68] text-white rounded-lg hover:bg-[#60da68] transition cursor-pointer"
        >
          Copy
        </button>
      </div>

      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default ReferralCard;
