import { FiSearch } from "react-icons/fi";
import { MdElectricBolt } from "react-icons/md";
import { FaTv, FaUserCheck } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import { GiNetworkBars } from "react-icons/gi";
import { SiBuymeacoffee } from "react-icons/si";
import { IoSchool } from "react-icons/io5";
import FundWallet from "@/components/Dashboard/Wallet/FundWallet";
import BalanceCard from "../../components/Dashboard/Wallet/BalanceCard";
import ReferralCard from "../../components/Dashboard/Wallet/ReferralCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { walletBalance } from "@/api/wallet";
import { Link } from "react-router-dom";

const Wallet = () => {
  const [showNodal, setShowModal] = useState(false);
  const referralCode = "BRIGHTX92";
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const features = [
    { name: "Airtime", icon: <BsPhoneFill size={28} />, link: "/dashboard/airtime" },
    { name: "Data", icon: <GiNetworkBars size={28} />, link: "/dashboard/data" },
    {
      name: "Electricity",
      icon: <MdElectricBolt size={28} />,
      link: "/dashboard/electricity",
    },
    { name: "Cable TV", icon: <FaTv size={28} />, link: "/dashboard/cable" },
    { name: "WAEC Pin", icon: <IoSchool size={28} />, link: "/dashboard/waec" },
    { name: "JAMB Pin", icon: <IoSchool size={28} />, link: "/dashboard/jamb" },
    { name: "KYC", icon: <FaUserCheck size={28} />, link: "/dashboard/kyc" },
  ];

  const filtered = features.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );
  // fetch the wallet balance
  const getBalance = async () => {
    try {
      // put this function in a use effect, so that it runs when the component is rendered
      const response = await walletBalance();
      // console.log(response)
      setAmount(response.data.data?.amount);
      
    } catch (error:any) {
      console.error(error)
    }
  };
  // function to handle the copying of details such as referral codes
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.info("Referral code copied!");
  };

  //  get balance on page render
  useEffect(() => {
    getBalance()
  }, []);
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard
          title="Wallet Balance"
          amount={`₦ ${amount}`}
          buttonText="Fund Wallet"
          onButtonClick={() => {
            setShowModal(true);
          }}
          loading={!amount}
        />
        <BalanceCard
          title="Referral Balance"
          amount="₦ 9,500"
          buttonText="Withdraw"
          loading={false}
        />
      </div>

      {/* Referral Code Section */}
      <ReferralCard
        referralCode={referralCode}
        onCopy={handleCopy}
        description="Share this code with your friends. You earn a bonus when they register."
      />
      {/* Search Bar */}
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

      {/* Features Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Services</h2>
        <Link to="" className="text-green-700 font-semibold">
          View All
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {filtered.map((f) => (
          <Link
            to={f.link}
            key={f.name}
            className="flex flex-col items-center bg-white  rounded-2xl p-4 hover:bg-green-50 transition"
          >
            <div className="text-green-700 mb-2">{f.icon}</div>
            <span className="text-sm font-medium text-gray-800 text-center">
              {f.name}
            </span>
          </Link>
        ))}
      </div>
      <FundWallet show={showNodal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Wallet;
