import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useFundWallet, useVerifyFunds } from "@/hooks/useWallet";

interface FundWalletProps {
  show: boolean;
  onClose: () => void;
}

const FundWallet: React.FC<FundWalletProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const presetAmounts = [1000, 2000, 5000, 10000, 50000, 100000];

  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  // 🔥 React-Query Mutations
  const fundMutation = useFundWallet();
  const verifyMutation = useVerifyFunds();

  // ⛽ Fund Wallet Handler
  const handleFunding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      const res = await fundMutation.mutateAsync({
        email,
        amount
      });

      const url = res?.data?.data?.authorization_url;
      if (!url) throw new Error("Payment URL not returned");

      toast.info("Redirecting to Paystack...");
      window.location.href = url;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Unable to fund wallet");
    }
  };

  // 🔍 Verify Payment on Redirect
  useEffect(() => {
    if (!reference) return;

    verifyMutation.mutate(reference, {
      onSuccess: (res: any) => {
        toast.success(res?.data?.message || "Wallet funded successfully");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Verification failed");
      },
    });
  }, [reference]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <button
              className="absolute top-2 right-3 text-gray-400 hover:bg-red-500 hover:text-white rounded px-2"
              onClick={onClose}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
              Fund your Wallet
            </h2>

            {/* QUICK AMOUNTS */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`p-2 rounded-lg font-semibold ${
                    amount === amt
                      ? "bg-green-600 text-white"
                      : "border border-gray-300"
                  }`}
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="Enter custom amount"
                className="col-span-2 border rounded p-2 mt-2"
              />
            </div>

            <form onSubmit={handleFunding} className="space-y-4">
              <input
                type="email"
                placeholder="Your Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                disabled={fundMutation.isPending}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold flex justify-center"
              >
                {fundMutation.isPending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  `Fund ₦${amount || 0}`
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FundWallet;
