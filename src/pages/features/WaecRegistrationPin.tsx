import StepIndicator from "@/components/StepIndicator";
import TransactionPinInput from "@/components/Dashboard/TransactionPin/TransactionPinInput";
import SuccessPage from "@/components/Dashboard/Status_pages/SuccessPage";
import FailedPage from "@/components/Dashboard/Status_pages/FailurePage";
import LoadingPage from "@/components/Dashboard/Status_pages/LoadingPage";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useBuyWaecPin, useGetVariations } from "@/hooks/usePurchase";
import type { Education_Waec_PinCheck } from "@/constants/types/vtPassTypes";

interface WaecFormData extends Education_Waec_PinCheck {
    serviceID: string;
}

function WaecForm({ onNext }: { onNext: (d: WaecFormData) => void }) {
    const [formData, setFormData] = useState<WaecFormData>({
        serviceID: "waec-registration",
        variation_code: "",
        variation_amount: "",
        phone: "",
        quantity: 1,
        amount: undefined,
    });

    const { data, isLoading, isError } = useGetVariations(formData.serviceID);
const [variations, setVariations] = useState<{ variation_code: string; name: string; variation_amount: string }[]>([]);

// 1. Update state when data is successfully fetched
useEffect(() => {
  if (data?.content?.variations) {
    setVariations(data.content.variations);
  }
}, [data]);

// 2. Memoize the unique variations
const uniqueVariations = useMemo(() => {
  return Array.from(
    new Map(variations.map((v) => [v.variation_code, v])).values()
  );
}, [variations]);

console.log(uniqueVariations, "waec variations");

    useEffect(() => {
        if (isError) toast.error("Failed to load WAEC variations");
    }, [isError]);

    const schema = Yup.object().shape({
        variation_code: Yup.string().required("Please select a WAEC PIN type"),
        phone: Yup.string().required("Phone number is required"),
        quantity: Yup.number().min(1, "Quantity must be at least 1"),
    });

    const handleBundleChange = (value: string) => {
        const selected = uniqueVariations.find((v) => v.variation_code === value);
        setFormData((p) => ({ ...p, variation_code: value, variation_amount: selected?.variation_amount ?? "" }));
    };

    const handleServiceChange = (value: string) => {
        setFormData((p) => ({ ...p, serviceID: value, variation_code: "", variation_amount: "" }));
        setVariations([]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: name === "quantity" ? Number(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });
            onNext(formData);
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((er: any) => toast.error(er.message));
            }
        }
    };

    return (
        <div className="rounded-3xl py-8 px-8 w-[90%] md:w-[70%] bg-gray-50 min-h-screen mx-auto">
            <h1 className="text-3xl font-extrabold uppercase text-center mt-4">{formData.serviceID === 'waec' ? 'Buy WAEC Result Checker PIN' : 'Buy WAEC Registration PIN'}</h1>
            <p className="text-center mt-3 text-sm text-gray-700 font-medium">Purchase WAEC registration/result checker PINs instantly.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Service</label>
                    <select
                        value={formData.serviceID}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className="w-full border-2 py-3 rounded-md px-3"
                    >
                        <option value="waec-registration">WAEC Registration PIN</option>
                        <option value="waec">WAEC Result Checker</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Select PIN Type</label>
                    {isLoading ? (
                        <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
                    ) : uniqueVariations.length === 0 ? (
                        <p className="text-sm text-gray-500">No variations available</p>
                    ) : (
                        <select
                            value={formData.variation_code}
                            onChange={(e) => handleBundleChange(e.target.value)}
                            className="w-full border-2 py-3 rounded-md px-3"
                        >
                            <option value="">Choose a PIN option</option>
                            {uniqueVariations.map((v) => (
                                <option key={v.variation_code} value={v.variation_code}>
                                    {v.name ?? v.variation_code} — {v.variation_amount}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex gap-6 flex-col md:flex-row w-full">
                    <span className="flex flex-col gap-1 w-full">
                        <label htmlFor="phone" className="text-sm font-medium">Recipient Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-500 rounded-md"
                            placeholder="Recipient phone number"
                        />
                    </span>

                    <span className="flex flex-col gap-1 w-full">
                        <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min={1}
                            value={formData.quantity}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-500 rounded-md"
                        />
                    </span>
                </div>

                <button type="submit" className="uppercase text-white bg-green-700 py-4 px-10 rounded-md font-semibold hover:bg-green-800">
                    Continue
                </button>
            </form>
        </div>
    );
}

const Waec = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"success" | "failure" | null>(null);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const { mutateAsync: purchaseWaec } = useBuyWaecPin();

    const handleFormNext = (data: WaecFormData) => {
        setFormData(data);
        setStep(2);
    };

    const handlePinSuccess = async (pinValue: string) => {
        setLoading(true);

        try {
            const payload = {
                ...formData,
                pin: pinValue,
            };

            const result = await purchaseWaec(payload);
            setStatus(result.data?.status === "success" ? "success" : "failure");
            setError(result.data?.status === "failure" && result.data?.message ? result.data.message : "");

            if (result.data?.message) toast(result.data.message);

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

            {step === 1 && !loading && <WaecForm onNext={handleFormNext} />}

            {step === 2 && !loading && (
                <TransactionPinInput
                    onSuccess={handlePinSuccess}
                    transactionDetails={{
                        amount: formData?.variation_amount,
                        service: formData?.serviceID,
                        phone: formData?.phone,
                    }}
                />
            )}

            {loading && <LoadingPage purpose={formData?.serviceID === 'waec' ? 'WAEC Result Checker' : 'WAEC Registration PIN'} formData={formData} />}

            {step === 3 && !loading && (status === "success" ? (
                <SuccessPage
                    purpose={formData?.serviceID === 'waec' ? 'WAEC Result Checker' : 'WAEC Registration PIN'}
                    formData={formData}
                    onGoHome={() => navigate("/dashboard")}
                    onDownloadReceipt={() => console.log("Download receipt")}
                />
            ) : (
                <FailedPage
                    purpose={formData?.serviceID === 'waec' ? 'WAEC Result Checker' : 'WAEC Registration PIN'}
                    formData={formData}
                    errorMessage={error}
                    onGoHome={() => navigate("/dashboard")}
                    onRetry={() => setStep(1)}
                />
            ))}
        </div>
    );
};

export default Waec;