import BalanceCard from "../../components/Dashboard/Wallet/BalanceCard";
import ReferralCard from "../../components/Dashboard/Wallet/ReferralCard";

const Wallet = () => {
  const referralCode = "BRIGHTX92";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard title="Wallet Balance" amount="₦ 54,200" buttonText="Fund Wallet" />
        <BalanceCard title="Referral Balance" amount="₦ 9,500" buttonText="Withdraw" />
      </div>

      {/* Referral Code Section */}
      <ReferralCard
        referralCode={referralCode}
        onCopy={handleCopy}
        description="Share this code with your friends. You earn a bonus when they sign up."
      />
    </div>
  );
}

export default Wallet;