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
import { useNavigate } from "react-router-dom";

const CableForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    provider: "",
    bundle: "",
    smart_card_number: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // Validation schema
  const schema = Yup.object().shape({
    provider: Yup.string().required("Provider is required"),
    bundle: Yup.string().required("Bundle is required"),
    smart_card_number: Yup.string().required("Smart card number is required"),
    phone: Yup.string().required("Customer phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Shadcn Select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setLoading(true);

      console.log("Cable subscription payload:", formData);

      toast.success("Cable subscription submitted!");

      // API call or redirect here

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

      <h1 className="text-3xl font-extrabold uppercase text-center mt-4">Cable Subscription</h1>
      <p className="text-center mt-3 text-sm text-gray-700 font-medium">
        Subscribe to DSTV, GOTV, and Startimes easily.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">

        {/* Provider */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Provider</label>
          <Select onValueChange={(value) => handleSelectChange("provider", value)}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Providers</SelectLabel>
                <SelectItem value="startimes">Startimes</SelectItem>
                <SelectItem value="dstv">DSTV</SelectItem>
                <SelectItem value="gotv">GOTV</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Bundle */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Bundle</label>
          <Select onValueChange={(value) => handleSelectChange("bundle", value)}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Select bundle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bundles</SelectLabel>
                {/* You will populate these dynamically later */}
                <SelectItem value="basic">Basic Package</SelectItem>
                <SelectItem value="premium">Premium Package</SelectItem>
                <SelectItem value="others">More bundles coming...</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Smart Card Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Smart Card Number</label>
          <input
            type="text"
            name="smart_card_number"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter smart card number"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Customer Phone</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter customer phone"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter email"
          />
        </div>

        <button
          className="uppercase text-white bg-green-700 py-4 px-10 text-[0.9rem] rounded-md
                     font-semibold cursor-pointer disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Subscribe Now"}
        </button>
      </form>
    </div>
  );
};

export default CableForm;
