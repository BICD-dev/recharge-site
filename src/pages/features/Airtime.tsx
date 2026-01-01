import AirtimeForm from "@/components/Dashboard/Airtime/Airtimeform";
import TransactionPinInput from "@/components/Dashboard/TransactionPin/TransactionPinInput";
import StepIndicator from "@/components/StepIndicator";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SuccessPage from "@/components/Dashboard/Status_pages/SuccessPage";
import FailedPage from "@/components/Dashboard/Status_pages/FailurePage";
import LoadingPage from "@/components/Dashboard/Status_pages/LoadingPage";
import { useBuyAirtime } from "@/hooks/usePurchase";

interface AirtimeData {
  serviceID: string;
  phone: string;
  amount: number;
}
const Airtime = () => {
  const [step, setStep] = useState(1);
  const [airtimeData, setAirtimeData] = useState<AirtimeData>({
    serviceID: "",
    phone: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "failure" | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { mutateAsync: purchaseAirtime } = useBuyAirtime();

  const handleAirtimeNext = (data: any) => {
    setAirtimeData(data);
    setStep(2);
  };

  const handlePinSuccess = async (pinValue: string) => {
    setLoading(true);

    try {
      const payload = {
        ...airtimeData,
        pin: pinValue,
      };

      const result = await purchaseAirtime(payload);
      setStatus(result.data?.status === "success" ? "success" : "failure");
      setError(
        result.data?.status === "failure" && result.data?.message
          ? result.data.message
          : ""
      );

      // show backend message if present (hook already shows a toast)
      if (result.data?.message) {
        toast(result.data.message);
      }

      setStep(3);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred during purchase"
      );
      setStatus("failure");
      setError(
        error.response?.data?.message || "An error occurred during purchase"
      );
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col mt-4 justify-center items-center">
      <StepIndicator currentStep={step} />

      {step === 1 && !loading && <AirtimeForm onNext={handleAirtimeNext} />}

      {step === 2 && !loading && (
        <TransactionPinInput
          onSuccess={handlePinSuccess}
          transactionDetails={{
            amount: airtimeData?.amount,
            service: airtimeData?.serviceID,
            phone: airtimeData?.phone,
          }}
        />
      )}

      {loading && <LoadingPage purpose="Airtime" formData={airtimeData} />}

      {step === 3 && !loading && (status === "success" ? (
        <SuccessPage
          purpose="Airtime"
          formData={airtimeData}
          onGoHome={() => navigate("/dashboard")}
          onDownloadReceipt={() => console.log("Download receipt")}
        />
      ) : (
        <FailedPage
          purpose="Airtime"
          formData={airtimeData}
          errorMessage={error}
          onGoHome={() => navigate("/dashboard")}
          onRetry={() => setStep(1)}
        />
      ))}
    </div>
  );
};

export default Airtime;
