
import TransactionPinInput from "@/components/Dashboard/TransactionPin/TransactionPinInput";
import StepIndicator from "@/components/StepIndicator";
import { useState } from "react";
import { toast } from "sonner";
import SuccessPage from "@/components/Dashboard/Status_pages/SuccessPage";
import { useNavigate } from "react-router-dom";
import FailedPage from "@/components/Dashboard/Status_pages/FailurePage";
import LoadingPage from "@/components/Dashboard/Status_pages/LoadingPage";
import ElectricityForm from "@/components/Dashboard/Electricity/ElectricityForm";

interface ElectricityData {
    meter_number: string;
    meter_type: string;
    state: string;
    amount: number;
    phone: string;
    email: string;
    pin: string;
    serviceID: string;
}

const Electricity = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<ElectricityData>({
        meter_number: "",
        meter_type: "",
        state: "",
        amount: 0,
        phone: "",
        email: "",
        pin: "",
        serviceID: "", // or set dynamically if needed
    });
    const [status, setStatus] = useState<"success" | "failure" | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormNext = (formData: Partial<ElectricityData>) => {
        setData(prev => ({ ...prev, ...formData }));
        setStep(2);
    };

    // ElectricityForm does not support onNext, so handle submission inside ElectricityForm and update state via navigation or context if needed.

    const handlePinSuccess = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setStatus("success");
            toast.success("Electricity purchase successful!");
            setStep(3);
            setLoading(false);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || "An error occurred during purchase");
            setError(err.response?.data?.message || "An error occurred during purchase");
            setStatus("failure");
            setStep(3);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col mt-4 justify-center items-center">
            <StepIndicator currentStep={step} />

            {step === 1 && !loading && (
                <ElectricityForm onNext={handleFormNext} />
            )}

            {step === 2 && !loading && (
                <TransactionPinInput
                    onSuccess={handlePinSuccess}
                    transactionDetails={{
                        amount: data?.amount,
                        service: data?.meter_type,
                        phone: data?.phone,
                    }}
                />
            )}
            {loading && (
                <LoadingPage purpose="Electricity" formData={{ ...data, serviceID: data.serviceID }} />
            )}
            {step === 3 && !loading && (
                status === "success" ? (
                    <SuccessPage
                        purpose="Electricity"
                        formData={{ ...data, serviceID: data.serviceID }}
                        onGoHome={() => navigate('/dashboard')}
                        onDownloadReceipt={() => console.log("Download receipt")}
                    />
                ) : (
                    <FailedPage
                        purpose="Electricity"
                        formData={{ ...data, serviceID: data.serviceID }}
                        errorMessage={error}
                        onGoHome={() => navigate('/dashboard')}
                        onRetry={() => setStep(1)}
                    />
                )
            )}
        </div>
    );
};

export default Electricity;