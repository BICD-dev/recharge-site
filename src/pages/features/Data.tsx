import DataForm from "@/components/Dashboard/Data/DataForm";
import TransactionPinInput from "@/components/Dashboard/TransactionPin/TransactionPinInput";
import StepIndicator from "@/components/StepIndicator";
import { useState } from "react";
import { toast } from "sonner";
import SuccessPage from "@/components/Dashboard/Status_pages/SuccessPage";
import { useNavigate } from "react-router-dom";
import FailedPage from "@/components/Dashboard/Status_pages/FailurePage";
import LoadingPage from "@/components/Dashboard/Status_pages/LoadingPage";
import { useBuyData } from "@/hooks/usePurchase";

interface InternetData {
  serviceID: string;
  phone: string;
  billersCode: string;
  variation_code: string;
  variation_amount: number;
  amount?: number;
}
const Data = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InternetData>({
    serviceID: "",
    phone: "",
    billersCode: "",
    variation_code: "",
    variation_amount: 0,
  });
  const [status, setStatus] = useState<"success" | "failure" | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: purchaseData } = useBuyData();

  const handleInternetNext = (payload: any) => {
    setData(payload);
    setStep(2);
  };

  const handlePinSuccess = async (pinValue: string) => {
    setLoading(true);

    try {
      const payload = {
        ...data,
        pin: pinValue,
      };

      const result = await purchaseData(payload);
      setStatus(result.data?.status === "success" ? "success" : "failure");
      setError(
        result.data?.status === "failure" && result.data?.message
          ? result.data.message
          : ""
      );

      if (result.data?.message) toast(result.data.message);

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

      {step === 1 && !loading && <DataForm onNext={handleInternetNext} />}

      {step === 2 && !loading && (
        <TransactionPinInput
          onSuccess={handlePinSuccess}
          transactionDetails={{
            amount: data?.variation_amount,
            service: data?.serviceID,
            phone: data?.phone,
          }}
        />
      )}
      {loading && <LoadingPage purpose="Data" formData={data} />}
      {step === 3 && !loading && (
        status === "success" ? (
          <SuccessPage
            purpose="Data"
            formData={data}
            onGoHome={() => navigate("/dashboard")}
            onDownloadReceipt={() => console.log("Download receipt")}
          />
        ) : (
          <FailedPage
            purpose="Data"
            formData={data}
            errorMessage={error}
            onGoHome={() => navigate("/dashboard")}
            onRetry={() => setStep(1)}
          />
        )
      )}
    </div>
  );
};

export default Data;
