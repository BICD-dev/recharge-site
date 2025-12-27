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
import type { ElectricityPrepaid } from "@/constants/types/vtPassTypes";

// ALL NIGERIAN STATES
const nigeriaStates = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
  "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
  "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT"
];
interface ElectricityFormProps {
  onNext: (data: ElectricityPrepaid) => void;
}
const ElectricityForm: React.FC<ElectricityFormProps  > = ({onNext}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ElectricityPrepaid>({
    meter_number: "",
    meter_type: "",
    amount: 0,
    phone: "",
    serviceID: "",
    billersCode: "",
    variation_code: "",
  });

  const [loading, setLoading] = useState(false);

  // YUP VALIDATION
  const schema = Yup.object().shape({
    meter_number: Yup.string().required("Meter number is required"),
    meter_type: Yup.string().required("Meter type is required"),
    state: Yup.string().required("State is required"),
    amount: Yup.number().required("Amount is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setLoading(true);

      console.log("Electricity Purchase Payload:", formData);
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
            name="meter_number"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-500 rounded-md"
            placeholder="Enter meter number"
          />
        </div>

        {/* Meter Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Meter Type</label>
          <Select onValueChange={(value) => handleSelectChange("meter_type", value)}>
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
          <label className="text-sm font-medium">State</label>
          <Select onValueChange={(value) => handleSelectChange("state", value)}>
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nigeria States</SelectLabel>
                {nigeriaStates.map((st) => (
                  <SelectItem key={st} value={st}>{st}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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

        {/* Email */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium">Email</label>
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
          {loading ? "Processing..." : "Buy Electricity"}
        </button>
      </form>
    </div>
  );
};

export default ElectricityForm;
