import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface TransactionPinSetupProps {
  onPinSet: (pin: string) => Promise<void>;
  hasPinSet: boolean;
}

const TransactionPinSetup = ({ onPinSet, hasPinSet }: TransactionPinSetupProps) => {
  const [step, setStep] = useState<"create" | "confirm" | "success">("create");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePinChange = (index: number, value: string, isConfirm = false) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = isConfirm ? [...confirmPin] : [...pin];
    newPin[index] = value.slice(-1);

    if (isConfirm) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(
        `${isConfirm ? "confirm-" : ""}pin-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    isConfirm = false
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      const prevInput = document.getElementById(
        `${isConfirm ? "confirm-" : ""}pin-${index - 1}`
      );
      prevInput?.focus();
    }
  };

  const handleCreatePin = () => {
    const pinValue = pin.join("");
    if (pinValue.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }
    setStep("confirm");
  };

  const handleConfirmPin = async () => {
    const pinValue = pin.join("");
    const confirmPinValue = confirmPin.join("");

    if (confirmPinValue.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }

    if (pinValue !== confirmPinValue) {
      toast.error("PINs do not match. Please try again.");
      setConfirmPin(["", "", "", ""]);
      return;
    }

    setLoading(true);
    try {
      await onPinSet(pinValue);
      setStep("success");
      setTimeout(() => {
        window.location.reload(); // Refresh to update token
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to set PIN");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    setStep("create");
  };

  if (hasPinSet) {
    return (
      <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Lock className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 mb-1">Transaction PIN Active</h3>
            <p className="text-sm text-green-700 mb-4">
              Your transaction PIN is set and active. You can change it below if needed.
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all">
              Change PIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-green-500 rounded-full p-4">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">PIN Created Successfully!</h3>
        <p className="text-gray-600">
          Your transaction PIN has been set. You'll need this PIN to authorize transactions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
        <div className="flex items-start gap-3">
          <Lock className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Set Up Transaction PIN</h3>
            <p className="text-sm text-yellow-700">
              Create a 4-digit PIN to secure your transactions. You'll need this PIN every time
              you make a purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {step === "create" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Create Your 4-Digit PIN
              </label>
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex gap-4 justify-center mb-6">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleCreatePin}
              disabled={pin.join("").length !== 4}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Confirm Your PIN
              </label>
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex gap-4 justify-center mb-6">
              {confirmPin.map((digit, index) => (
                <input
                  key={index}
                  id={`confirm-pin-${index}`}
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value, true)}
                  onKeyDown={(e) => handleKeyDown(e, index, true)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPin}
                disabled={confirmPin.join("").length !== 4 || loading}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Setting PIN..." : "Confirm PIN"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">PIN Requirements:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Must be exactly 4 digits</li>
          <li>• Avoid obvious patterns (1234, 0000)</li>
          <li>• Keep it secure and don't share with anyone</li>
          <li>• You'll need this PIN for all transactions</li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionPinSetup;