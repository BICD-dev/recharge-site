import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { fundWallet, verifyFunds } from "@/api/wallet";
interface FundWalletProps {
  show: boolean;               // `show` determines if the modal is visible
  onClose: () => void;         // `onClose` is a callback function with no arguments
}

const FundWallet: React.FC<FundWalletProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const presetAmounts = [1000, 2000, 5000, 10000, 50000, 100000];
//   const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reference, setReference] = useState(searchParams.get("reference"));

  const handleFunding = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    console.log("entered here")
    try {
      const result = await fundWallet({ email, amount });
      // console.log("result: ", result)
      // redirect on success
      toast.info("Redirecting to paystack");
      setLoading(false);
      window.location.href = result.data.data?.authorization_url;
    } catch (error: any) {
      console.log("Error funding wallet:", error);
      toast.error(error.message || "An error occurred");
      setLoading(false);
    }
  };
// handle reference when paystack redirects back
  useEffect(() => {
    if (!reference) return;
  
    const verifyPayment = async () => {
      try {
        const result = await verifyFunds(reference);
        toast.success(result.data.message || "Wallet funded successfully!");
        setAmount(result.data.data?.amount) //set the amount
      } catch (error: any) {
        console.error("Payment could not be verified:", error);
        toast.error(error?.message || "An error occurred");
      }
    };
  
    verifyPayment();
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
          {/* <Toaster
    position="top-center"
    theme="light"
    toastOptions={{
      className: "bg-white text-black border border-green-600",
      duration: 4000,
    }}
/> */}

          <motion.div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <button
              className="absolute top-2 right-3 text- text-gray-400 hover:text-white hover:bg-red-500 text-xl cursor-pointer"
              onClick={onClose}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
              Fund you Wallet
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`p-2 rounded-lg font-semibold text-center ${
                    amount == amt
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;

                  // Allow empty string
                  if (value === "") {
                    setAmount("");
                    return;
                  }

                  // Convert to number
                  setAmount(Number(value));
                }}
                placeholder="Name your own amount, maybe ₦25,000?"
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
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold flex justify-center"
              >
                {loading ? (
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
