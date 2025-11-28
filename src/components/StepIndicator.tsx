import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number; // 1, 2 or 3
}

const steps = [
  { id: 1, label: "Enter Information" },
  { id: 2, label: "Make Payment" },
  { id: 3, label: "View Receipt" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-between items-center py-4">
      {steps.map((step) => {
        const isActive = step.id === currentStep;

        return (
          <div
            key={step.id}
            className="flex flex-col items-center w-full text-center"
          >
            <span
              className={`text-sm font-medium ${
                isActive ? "text-green-600" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>

            {/* Green active bar */}
            <div className="relative w-full h-1 mt-2">
              {isActive && (
                <motion.div
                  layoutId="activeStepBar"
                  className="h-1 bg-green-500 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
