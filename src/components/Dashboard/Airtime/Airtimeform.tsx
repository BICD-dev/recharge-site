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
import type { Airtime } from "../../../constants/types/vtPassTypes";
import { useNavigate } from "react-router-dom";
import { buyAirtime } from "../../../api/purchase";

const AirtimeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Airtime>({
    serviceID: "",
    phone: 0,
    amount: 0,
  });

  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    serviceID: Yup.string().required("Service provider is required"),
    phone: Yup.number().required("Phone number is required"),
    amount: Yup.number().required("Amount is required"),
  });

  // Handle text/number changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof Airtime;

    setFormData((prev) => ({
      ...prev,
      [key]: key === "phone" || key === "amount" ? Number(value) : value,
    }));
  };

  // Handle Select component change
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceID: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setLoading(true);

      const result = await buyAirtime(formData);
      console.log("Airtime purchase response:", result);

      toast.success("Airtime purchase successful!");

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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-6 px-4 ">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Card */}
        <div className="y p-8 mb-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Buy Airtime
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Stay Connected! Top-up online — MTN, 9mobile, Glo & Airtel
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className=" ">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Provider Select */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Select Provider
              </label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-green-500 focus:border-green-500 transition-colors rounded-lg">
                  <SelectValue placeholder="Choose a network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Providers</SelectLabel>
                    <SelectItem value="mtn">MTN</SelectItem>
                    <SelectItem value="airtel">Airtel</SelectItem>
                    <SelectItem value="glo">Glo</SelectItem>
                    <SelectItem value="9mobile">9mobile</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Phone + Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-green-500 focus:ring-2 
                           focus:ring-green-100 transition-all"
                  placeholder="080 1234 5678"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg 
                           focus:outline-none focus:border-green-500 focus:ring-2 
                           focus:ring-green-100 transition-all"
                  placeholder="₦ 1,000"
                />
              </div>
            </div>

            <button
              className="w-full h-12 md:h-14 bg-green-500 hover:bg-green-500 
                       text-white font-semibold rounded-lg transition-all 
                       transform hover:scale-[1.02] active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       disabled:hover:scale-100 shadow-lg shadow-green-500/30 px-1"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "CONFIRM PURCHASE"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AirtimeForm;