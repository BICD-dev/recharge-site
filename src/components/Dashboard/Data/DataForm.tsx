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
import type { Data } from "../../../constants/types/vtPassTypes";
import { useNavigate } from "react-router-dom";
import { buyData } from "../../../api/purchase";

const DataForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Data>({
    billersCode:"",
    variation_code:"",
    serviceID: "",
    phone: 0,
});

  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    serviceID: Yup.string().required("Service provider is required"),
    variation_code: Yup.string().required("Data bundle is required"),
    phone: Yup.number().required(" is required"),
    billersCode: Yup.string().required("phone number is required"),
  });

  // Handle text/number changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof Data;

    setFormData((prev) => ({
      ...prev,
      [key]: key === "phone" ? Number(value) : value,
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

      const result = await buyData(formData);
      console.log("Data purchase response:", result);

      toast.success("Data purchase successful!");

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

      <h1 className="text-3xl font-extrabold uppercase text-center mt-4">Buy Data Here!</h1>
      <p className="text-center mt-3 text-sm text-gray-700 font-medium">
        Buy Cheap MTN Data Plan, Airtel Data Plan, GloData Plan, and Spectranet data plans. SME data also available.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">

        {/* Provider Select */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Provider</label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
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
        {/* bundle  */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Bundle</label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Choose bundle" />
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
        <div className="flex gap-6 flex-col md:flex-row w-full">
          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm font-medium">Recipient Phone Number</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              className="px-4 py-3 border border-gray-500 rounded-md"
              placeholder="Reciepient phone number"
            />
          </span>

          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm font-medium">Notification Phone Number</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              className="px-4 py-3 border border-gray-500 rounded-md"
              placeholder="Notification phone number"
            />
          </span>
        </div>

        <button
          className="uppercase text-white bg-green-700 py-4 px-10 text-[0.9rem] rounded-md
                     font-semibold cursor-pointer disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>
      </form>
    </div>
  );
};

export default DataForm;
