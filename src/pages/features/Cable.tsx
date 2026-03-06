import TransactionPinInput from "@/components/Dashboard/TransactionPin/TransactionPinInput";
import StepIndicator from "@/components/StepIndicator";
import { useState } from "react";
import { toast } from "sonner";
import SuccessPage from "@/components/Dashboard/Status_pages/SuccessPage";
import { useNavigate } from "react-router-dom";
import FailedPage from "@/components/Dashboard/Status_pages/FailurePage";
import LoadingPage from "@/components/Dashboard/Status_pages/LoadingPage";
import CableForm from "@/components/Dashboard/Cable/CableForm";
import { useBuyCableTv } from "@/hooks/usePurchase";
import { useDownloadReceipt } from "@/hooks/useTransaction";

interface CableData {
  serviceID: string;
  phone: string;
  billersCode: string;
  variation_code: string;
  variation_amount?: number;
  amount: number;
  pin?: string;
}

const Cable = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CableData>({
    serviceID: "",
    phone: "",
    billersCode: "",
    variation_code: "",
    variation_amount: 0,
    amount: 0,
  });
  const [status, setStatus] = useState<"success" | "failure" | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [receiptReference, setReceiptReference] = useState<string>("");
  const navigate = useNavigate();

  const { mutateAsync: purchaseCable } = useBuyCableTv();
  const { mutateAsync: downloadReceipt } = useDownloadReceipt();

  const handleInternetNext = (payload: any) => {
    setData(payload);
    setStep(2);
  };

  const handlePinSuccess = async (pinValue: string) => {
    setLoading(true);
    try {
      const finalPayload = {
        ...data,
        pin: pinValue,
      };

      const result = await purchaseCable(finalPayload);
      setStatus(result.data?.status === "success" ? "success" : "failure");
      setError(result.data?.status === "failure" && result.data?.message ? result.data.message : "");

      if (result.data?.message) toast.success(result.data.message);
      setTransactionId(result.data?.data?.transactionId || null);
      setReceiptReference(result.data?.data?.reference || "");

      setStep(3);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred during purchase");
      setStatus("failure");
      setError(err.response?.data?.message || "An error occurred during purchase");
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col mt-4 justify-center items-center">
      <StepIndicator currentStep={step} />

      {step === 1 && !loading && <CableForm onNext={handleInternetNext} />}

      {step === 2 && !loading && (
        <TransactionPinInput
          onSuccess={handlePinSuccess}
          transactionDetails={{
            amount: data?.amount,
            service: data?.serviceID,
            phone: data?.phone,
          }}
        />
      )}

      {loading && <LoadingPage purpose="Cable" formData={data} />}

      {step === 3 && !loading && (status === "success" ? (
        <SuccessPage
          purpose="Cable"
          formData={data}
          onGoHome={() => navigate("/dashboard")}
          transactionId={transactionId!}
          onDownloadReceipt={() => downloadReceipt({ id: transactionId!, reference: receiptReference })}
        />
      ) : (
        <FailedPage
          purpose="Cable"
          formData={data}
          errorMessage={error}
          onGoHome={() => navigate("/dashboard")}
          onRetry={() => setStep(1)}
        />
      ))}
    </div>
  );
};

export default Cable;
