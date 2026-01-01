import { FiSearch } from "react-icons/fi";
import { MdElectricBolt } from "react-icons/md";
import { FaTv, FaUserCheck } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import { GiNetworkBars } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import FundWallet from "@/components/Dashboard/Wallet/FundWallet";
import BalanceCard from "../../components/Dashboard/Wallet/BalanceCard";
import ReferralCard from "../../components/Dashboard/Wallet/ReferralCard";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useWalletBalance } from "@/hooks/useWallet";   // <-- your hook

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);
  const referralCode = "BRIGHTX92";
  const [search, setSearch] = useState("");

  // 🔥 React Query fetch
  const { data, isLoading, isError } = useWalletBalance();

  // wallet amount (default 0)
  const amount = data?.data?.amount ?? 0;

  const features = [
    { name: "Airtime", icon: <BsPhoneFill size={28} />, link: "/dashboard/airtime" },
    { name: "Data", icon: <GiNetworkBars size={28} />, link: "/dashboard/data" },
    { name: "Electricity", icon: <MdElectricBolt size={28} />, link: "/dashboard/electricity" },
    { name: "Cable TV", icon: <FaTv size={28} />, link: "/dashboard/cable" },
    { name: "WAEC Pin", icon: <IoSchool size={28} />, link: "/dashboard/waec" },
    { name: "JAMB Pin", icon: <IoSchool size={28} />, link: "/dashboard/jamb" },
    { name: "KYC", icon: <FaUserCheck size={28} />, link: "/dashboard/kyc" },
  ];

  const filtered = features.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  // copy referral
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.info("Referral code copied!");
  };

  if (isError) {
    toast.error("Failed to load wallet balance");
  }

  return (
    <div className="p-4 md:p-6 space-y-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard
          title="Current Balance"
          amount={Number(amount)}
          buttonText="Fund Wallet"
          onButtonClick={() => setShowModal(true)}
          variant="gradient"
          showIcon
          showLastUpdated
          loading={isLoading}
        />

        <BalanceCard
          title="Referral Balance"
          amount={0.0}
          buttonText="Withdraw"
          onButtonClick={() => console.log("Withdraw")}
          variant="white"
          loading={false}
        />
      </div>

      <ReferralCard
        referralCode={referralCode}
        onCopy={handleCopy}
        description="Share this code with your friends. You earn a bonus when they register."
      />

      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-full pl-10 py-3 focus:ring-2 focus:ring-green-600 outline-none"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Services</h2>
        <Link to="" className="text-green-700 font-semibold">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {filtered.map((f) => (
          <Link
            to={f.link}
            key={f.name}
            className="flex flex-col items-center bg-white rounded-2xl p-4 hover:bg-green-50 transition"
          >
            <div className="text-green-700 mb-2">{f.icon}</div>
            <span className="text-sm font-medium text-gray-800 text-center">
              {f.name}
            </span>
          </Link>
        ))}
      </div>

      <FundWallet show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Wallet;
