import { useMemo, useState } from "react";
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
import { getVariations } from "../../../api/purchase";
interface DataFormProps {
  onNext: (data: Data) => void;
}
const DataForm: React.FC<DataFormProps> = ({onNext}) => {
  const navigate = useNavigate();
  const [bundleLoading, setBundleLoading] = useState(false);

  const [formData, setFormData] = useState<Data>({
    phone: "",
    billersCode: "",
    variation_code: "",
    serviceID: "",
  });
const [variations, setVariations] = useState<
  { variation_code: string; name: string; variation_amount: string }[]
>([]);

    const uniqueVariations = useMemo(() => {
    return Array.from(
      new Map(variations.map((v) => [v.variation_code, v])).values()
    );
  }, [variations]);

  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    serviceID: Yup.string().required("Service provider is required"),
    variation_code: Yup.string().required("Data bundle is required"),
    phone: Yup.string().required("Phone number is required"),
    billersCode: Yup.string().required("Billers code is required"),
  });

  // Handle text/number changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof Data;

    setFormData((prev) => ({
      ...prev,
      [key]: key === "phone" ? (value) : value,
    }));
  };

  // Handle Provider Select change
const handleProviderChange = async (value: string) => {
  setFormData((prev) => ({
    ...prev,
    serviceID: value,
    variation_code: "",
  }));

  try {
    setBundleLoading(true); // Start loading skeleton
    const result = await getVariations(value);
    setVariations(result.data.content.variations);
  } catch (error) {
    toast.error("Failed to load data plans");
    setVariations([]);
  } finally {
    setBundleLoading(false); // Stop loading skeleton
  }
};


  // Handle Bundle Select change
  const handleBundleChange = (value: string) => {
    const selected = uniqueVariations.find(
    (v) => v.variation_code === value
  );

    setFormData((prev) => ({
      ...prev,
      variation_code: value,
      variation_amount: selected?.variation_amount ?? "0",
    }));
    console.log("Updated formData:", formData);
    console.log("Selected bundle:", selected);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      onNext(formData); // ⬅⬅ Pass data to parent component
    } catch (error:any) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => toast.error(err.message));
      }
    }
    setLoading(false)
  };

  return (
    <div className="rounded-3xl py-8 px-8 w-[90%] md:w-[70%] bg-gray-50 min-h-screen mx-auto">
      <h1 className="text-3xl font-extrabold uppercase text-center mt-4">
        Buy Data Here!
      </h1>
      <p className="text-center mt-3 text-sm text-gray-700 font-medium">
        Buy Cheap MTN Data Plan, Airtel Data Plan, Glo Data Plan, and Spectranet
        data plans. SME data also available.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">
        {/* Provider Select */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Provider</label>
          <Select
            value={formData.serviceID}
            onValueChange={handleProviderChange}
          >
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Choose a network" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Providers</SelectLabel>
                <SelectItem value="mtn-data">MTN</SelectItem>
                <SelectItem value="airtel-data">Airtel</SelectItem>
                <SelectItem value="glo-data">Glo</SelectItem>
                <SelectItem value="glo-sme-data">Glo SME Data</SelectItem>
                <SelectItem value="etisalat">9mobile</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Bundle Select */}
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium">Select Bundle</label>

  {bundleLoading ? (
    // 🔵 Skeleton Loader
    <div className="space-y-1">
      <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
    </div>
  ) : variations.length === 0 ? (
    <p className="text-sm text-gray-500">
      Please select a provider to load bundles.
    </p>
  ) : (
    <Select
      key={formData.serviceID}
      value={formData.variation_code || undefined}
      onValueChange={handleBundleChange}
    >
      <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
        <SelectValue placeholder="Choose a data bundle" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Data Bundles</SelectLabel>

          {uniqueVariations.map((v) => (
            <SelectItem key={v.variation_code} value={v.variation_code}>
              {v.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )}
</div>


        {/* Phone Numbers */}
        <div className="flex gap-6 flex-col md:flex-row w-full">
          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="text-sm font-medium">
              Recipient Phone Number
            </label>
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
            <label htmlFor="billersCode" className="text-sm font-medium">
              Notification Phone Number
            </label>
            <input
              type="tel"
              name="billersCode"
              value={formData.billersCode}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-500 rounded-md"
              placeholder="Notification phone number"
            />
          </span>
        </div>

        <button
          className="uppercase text-white bg-green-700 py-4 px-10 text-[0.9rem] rounded-md
                     font-semibold cursor-pointer disabled:opacity-50 hover:bg-green-800 transition-colors"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default DataForm;
