import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import type { Electricity } from "@/constants/types/vtPassTypes";
import { useValidateElectricityMeter } from "@/hooks/usePurchase";

// ALL Service providers for electricity
const electricityProviders = [
  { name: "ikedc", label: "Ikeja Electric" , code:"ikeja-electric"},
  { name: "ekedc", label: "Eko Electricity", code:"eko-electric" },
  { name: "kedco", label: "Kano Electricity", code:"kano-electric" },
  { name: "phed", label: "Port Harcourt Electric", code:"portharcourt-electric" },
  { name: "jed", label: "Jos Electricity", code:"jos-electric" },
  { name: "ibedc", label: "Ibadan Electricity", code:"ibadan-electric" },
  { name: "kaedco", label: "Kaduna Electric", code:"kaduna-electric" },
  { name: "aedc", label: "Abuja Electric", code:"abuja-electric" },
  { name: "eedc", label: "Enugu Electricity", code:"enugu-electric" },
  { name: "bedc", label: "Benin Electric", code:"benin-electric" },
  { name: "aba", label: "ABA Electric" , code:"aba-electric"},
  { name: "yedc", label: "Yola Electric", code:"yola-electric" }
];
interface ElectricityFormProps {
  onNext: (data: Electricity) => void;
}
const ElectricityForm: React.FC<ElectricityFormProps  > = ({onNext}) => {
  const navigate = useNavigate();
  const { mutateAsync: validateMeter, isPending: isValidating } = useValidateElectricityMeter();

  const [formData, setFormData] = useState<Electricity>({
    amount: 0,
    phone: "",
    serviceID: "",
    billersCode: "",
    variation_code: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    name?: string;
    message?: string;
    address?: string; 
  } | null>(null);

  // YUP VALIDATION
  const schema = Yup.object().shape({
    billersCode: Yup.string().required("Meter number is required"),
    variation_code: Yup.string().required("Meter type is required"),
    amount: Yup.number().required("Amount is required"),
    phone: Yup.string().required("Phone number is required"),
    serviceID: Yup.string().required("electricity service is required"),
  });

  // Handle text/number changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Handle select changes dynamically
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidateMeter = async () => {
    if (!formData.billersCode || !formData.serviceID || !formData.variation_code) {
      toast.error("Please enter meter number, meter type, and service provider first.");
      return;
    }

    try {
      const res = await validateMeter({
        billersCode: formData.billersCode,
        serviceID: formData.serviceID,
        type: formData.variation_code,
      });

      const data = res?.data ?? res;
      const name =
        data?.data?.Customer_Name ||
        data?.content?.Customer_Name ||
        data?.data?.customer_name ||
        data?.content?.customer_name;
      const message = data?.message || data?.data?.message;

      setValidationResult({ name, message });
      toast.success(message || "Meter validated successfully");
    } catch {
      setValidationResult(null);
      // error toast handled in hook
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setLoading(true);

      toast.success("Electricity purchase order submitted!");

      // navigate or send API call here
      // send payload to the next step
      onNext(formData);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl py-8 px-8 w-[90%] md:w-[70%] bg-gray-50 min-h-screen mx-auto">
      {/* Back button */}
        <div className="mb-4">
          <Link
            to="/dashboard/personal/user"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back to Dashboard
          </Link>
        </div>
      <h1 className="text-3xl font-extrabold uppercase text-center mt-4">Buy Electricity</h1>
      <p className="text-center mt-3 text-sm text-gray-700 font-medium">
        Purchase electricity tokens safely and instantly.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">

        {/* Meter Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Meter Number</label>
          <input
            type="text"
            name="billersCode"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter meter number"
          />
        </div>

        {/* Meter Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Meter Type/ Account ID</label>
          <Select onValueChange={(value) => handleSelectChange("variation_code", value)}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Select meter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Meter Types</SelectLabel>
                <SelectItem value="prepaid">Prepaid</SelectItem>
                <SelectItem value="postpaid">Postpaid</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* State Select */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Electricity Service</label>
          <Select onValueChange={(value) => handleSelectChange("serviceID", value)}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Select your Electricity service provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Electricity Service Providers</SelectLabel>
                {electricityProviders.map((provider) => (
                  <SelectItem key={provider.name} value={provider.code}>
                    {provider.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={handleValidateMeter}
            disabled={isValidating}
            className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-all disabled:opacity-70"
          >
            {isValidating ? "Validating..." : "Validate Meter"}
          </button>

          {validationResult && (
            <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
              {validationResult.name ? (
                <p>
                  <span className="font-semibold">Customer:</span> {validationResult.name}
                </p>
              ) : null}
              {validationResult.message ? (
                <p>{validationResult.message}</p>
              ) : null}
            </div>
          )}
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter phone number"
          />
        </div>

        

        <button
          className="uppercase text-white bg-green-700 py-4 px-10 text-[0.9rem] rounded-md
                     font-semibold cursor-pointer disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Electricity"}
        </button>
      </form>
    </div>
  );
};

export default ElectricityForm;
