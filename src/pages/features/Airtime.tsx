import AirtimeForm from "@/components/Dashboard/Airtime/Airtimeform";
import TransactionPinInput from "@/components/Dashboard/TransactioPin/TransactionPinInput";
import StepIndicator from "@/components/StepIndicator";
import { useState } from "react";
import { buyAirtime } from "@/api/purchase"
import { toast } from "sonner";
import AirtimeSuccess from "@/components/Dashboard/Status_pages/AirtimeSuccess";
import { useNavigate } from "react-router-dom";
interface AirtimeData {
  serviceID: string;
  phone: string;
  amount: number;
}
const Airtime = () => {
  const [step, setStep] = useState(1);
  const [airtimeData, setAirtimeData] = useState<AirtimeData>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAirtimeNext = (data: any) => {
    setAirtimeData(data);
    setStep(2);
  };

  const handlePinSuccess = async (pinValue: string) => {
    setLoading(true);

    try {
      const payload = {
        ...airtimeData,
        pin: pinValue
      };

      console.log("Final Payload to Backend:", payload);

      const result = await buyAirtime(payload);

      toast.success(result.data.message || "Airtime purchased successfully!");

      setStep(3);

    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during purchase"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col mt-4 justify-center items-center">
      <StepIndicator currentStep={step} />

      {step === 1 && (
        <AirtimeForm onNext={handleAirtimeNext} />
      )}

      {step === 2 && (
        <TransactionPinInput
          onSuccess={handlePinSuccess}
          transactionDetails={{
            amount: airtimeData?.amount,
            service: airtimeData?.serviceID,
            phone: airtimeData?.phone,
          }}
        />
      )}

      {step === 3 && (
        <AirtimeSuccess
        formData={airtimeData}
        onGoHome={() => navigate('/dashboard')}
        onDownloadReceipt={() => console.log("Download receipt")}
      />
  )
};
  </div>
  );
};

export default Airtime;
