import React, { useState } from "react";
import TransactionPinSetup from "@/components/Dashboard/TransactionPin/TransactionPinSetup";
import AvatarSelection from "@/components/Dashboard/Onboarding/AvatarSelection";
import { toast } from "react-hot-toast";
import { useSetPin, useUserOnboard } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiLock, FiUser, FiImage } from "react-icons/fi";

const TransactionPinStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { mutateAsync: setTransactionPin, isPending } = useSetPin();

  const handlePinSet = async (pin: string) => {
    try {
      await setTransactionPin(pin);
      toast.success("Transaction PIN set successfully!");
      onNext();
    } catch (error: any) {
      toast.error(error?.message || "Failed to set PIN");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <TransactionPinSetup onPinSet={handlePinSet} hasPinSet={false} />
    </motion.div>
  );
};

const AvatarStep: React.FC<{ onNext: (avatarUrl: string) => void }> = ({
  onNext,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="w-full flex flex-col items-center"
  >
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
        <FiImage className="w-8 h-8 text-green-700" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Choose Your Avatar
      </h2>
      <p className="text-gray-600">Select an avatar that represents you</p>
    </div>
    <AvatarSelection onSelectAvatar={onNext} />
  </motion.div>
);

const UsernameStep: React.FC<{ onNext: (username: string) => void }> = ({
  onNext,
}) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setLoading(true);
    // Simulate backend call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    onNext(username);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <FiUser className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Choose a Username
          </h2>
          <p className="text-gray-600">Pick a unique username for your account</p>
        </div>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Enter a unique username"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-green-200 focus:border-green-500"
            }`}
            disabled={loading}
          />
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-8 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </motion.div>
  );
};

// Step indicator component
const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  const steps = [
    { number: 1, label: "PIN", icon: FiLock },
    { number: 2, label: "Avatar", icon: FiImage },
    { number: 3, label: "Username", icon: FiUser },
  ];

  return (
    <div className="w-full max-w-2xl mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
          <motion.div
            className="h-full bg-green-700"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const Icon = step.icon;

          return (
            <div key={step.number} className="flex flex-col items-center z-10">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-700 text-white"
                    : isCurrent
                    ? "bg-green-700 text-white ring-4 ring-green-100"
                    : "bg-gray-200 text-gray-500"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {isCompleted ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>
              <span
                className={`text-xs mt-2 font-medium ${
                  isCurrent ? "text-green-700" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { mutateAsync: handleOnboarding } = useUserOnboard();
  const navigate = useNavigate();

  const handlePinNext = () => {
    setStep(2);
  };

  const handleAvatarNext = (avatar: string) => {
    setAvatarUrl(avatar);
    setStep(3);
  };

  const handleUsernameNext = async (uname: string) => {
    // Fixed: Use the parameter instead of state
    setUsername(uname);
    setSubmitting(true);

    if (!uname || !uname.trim()) {
      toast.error("Username is required");
      setSubmitting(false);
      return;
    }

    if (!avatarUrl) {
      toast.error("Avatar is required");
      setSubmitting(false);
      return;
    }

    const formData = {
      username: uname, // Fixed: Use parameter instead of state
      avatar_url: avatarUrl,
    };

    try {
      await handleOnboarding(formData);
      toast.success("Onboarding successful!");
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/personal/user");
      }, 1500);
    } catch (error: any) {
      toast.error(error?.message || "Failed to onboard user");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-2"
          >
            Welcome to Datafy!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Let's set up your account in just a few steps
          </motion.p>
        </div>

        {/* Step Indicator */}
        {!success && <StepIndicator currentStep={step} totalSteps={3} />}

        {/* Content Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          layout
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6"
                >
                  <FiCheck className="w-10 h-10 text-green-700" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Welcome, {username}!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your onboarding is complete. Redirecting to dashboard...
                </p>
                {avatarUrl && (
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-green-200 shadow-lg"
                  />
                )}
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <TransactionPinStep key="pin" onNext={handlePinNext} />
                )}
                {step === 2 && (
                  <AvatarStep key="avatar" onNext={handleAvatarNext} />
                )}
                {step === 3 && (
                  <UsernameStep key="username" onNext={handleUsernameNext} />
                )}

                {submitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center mt-6 text-green-700"
                  >
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700 mr-3"></div>
                    <span className="font-medium">Submitting your info...</span>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        {!success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-500 text-sm mt-6"
          >
            Step {step} of 3
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Onboarding;