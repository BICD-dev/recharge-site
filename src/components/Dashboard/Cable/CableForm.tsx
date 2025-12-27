import { useState, useMemo, useEffect } from "react";
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
import type { CableTv } from "@/constants/types/vtPassTypes";
import { getVariations, verifySmartCardApi } from "@/api/purchase";
import type { VerifyResponseContent } from "@/api/purchase";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
interface CableFormProps {
  onNext: (data: CableTv) => void;
}

const SMARTCARD_PROVIDERS = ["dstv", "gotv", "startimes"];

const CableForm: React.FC<CableFormProps> = ({ onNext }) => {
  const [loading, setLoading] = useState(false);
  const [bundleLoading, setBundleLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [variations, setVariations] = useState<
    { variation_code: string; name: string; variation_amount: string }[]
  >([]);

  const [bouquetData, setBouquetData] = useState<VerifyResponseContent | null>(null);

  const [formData, setFormData] = useState<CableTv>({
    serviceID: "",
    billersCode: "",
    variation_code: "",
    amount: 0,
    phone: "",
    subscription_type: "renew",
  });

  const isSmartcardProvider = SMARTCARD_PROVIDERS.includes(formData.serviceID);

  // Unique bundles
  const uniqueVariations = useMemo(() => {
    return Array.from(
      new Map(variations.map((v) => [v.variation_code, v])).values()
    );
  }, [variations]);

  //  validation schema
  const schema = Yup.object().shape({
    serviceID: Yup.string().required("Provider is required"),
    variation_code: Yup.string().required("Bundle is required"),
    billersCode: Yup.string().required(
      isSmartcardProvider
        ? "Smartcard number is required"
        : "Phone number is required"
    ),
    phone: Yup.string().when("serviceID", {
      is: (id: string) => SMARTCARD_PROVIDERS.includes(id),
      then: (s) => s.required("Customer phone is required"),
      otherwise: (s) => s.notRequired(),
    }),
    subscription_type: Yup.string().when("serviceID", {
      is: (id: string) => SMARTCARD_PROVIDERS.includes(id),
      then: (s) => s.required("Subscription type is required"),
      otherwise: (s) => s.notRequired(),
    }),

  });
  // Update form field
  const updateField = (name: keyof CableTv, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** ---------------------------
   * PROVIDER CHANGE
   * --------------------------- */
  const handleProviderChange = async (provider: string) => {
    // reset dependent fields
    setFormData({
      serviceID: provider,
      variation_code: "",
      amount: 0,
      billersCode: "",
      phone: "",
      subscription_type: SMARTCARD_PROVIDERS.includes(provider)
        ? "renew"
        : undefined,
    });

    setBouquetData(null);
    setVariations([]);

    try {
      setBundleLoading(true);
      const result = await getVariations(provider);
      setVariations(result.data.content.variations);
    } catch {
      toast.error("Failed to load bundles");
    } finally {
      setBundleLoading(false);
    }
  };

  //  bundle selection change
  const handleBundleChange = (value: string) => {
    const selected = variations.find((v) => v.variation_code === value);
    if (!selected) return;

    updateField("variation_code", value);
    updateField("amount", parseFloat(selected.variation_amount));
  };
  // Smartcard verification
  useEffect(() => {
    if (!isSmartcardProvider) return;

    if (!formData.billersCode || formData.billersCode.length < 8) return;

    const timeout = setTimeout(async () => {
      try {
        setVerifying(true);
        const res = await verifySmartCardApi({
          billersCode: formData.billersCode,
          serviceID: formData.serviceID as "dstv" | "gotv" | "startimes",
        });

        setBouquetData(res.content);
        setFormData((prev) => ({
          ...prev,
          amount: res.content.Renewal_Amount
            ? parseFloat(res.content.Renewal_Amount)
            : prev.amount,
        }));
        toast.success("Smartcard verified");
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Invalid smartcard number");
        setBouquetData(null);
      } finally {
        setVerifying(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData.billersCode, formData.serviceID, isSmartcardProvider]);

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await schema.validate(formData, { abortEarly: false });

      const payload: CableTv = { ...formData };

      // Showmax: phone is same as billersCode
      if (!isSmartcardProvider) {
        payload.phone = formData.billersCode;
      }

      onNext(payload);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Something went wrong");
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
      
      <h1 className="text-3xl font-extrabold uppercase text-center">
        Cable Subscription
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10">
        {/* Provider */}
        <div>
          <label className="text-sm font-medium">Provider</label>
          <Select
            value={formData.serviceID}
            onValueChange={handleProviderChange}
          >
            <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="startimes">Startimes</SelectItem>
                <SelectItem value="dstv">DSTV</SelectItem>
                <SelectItem value="gotv">GOTV</SelectItem>
                <SelectItem value="showmax">Showmax</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Bundle */}
        <div className="flex flex-col gap-3 ">
          <label className="text-sm font-medium">Select Bundle</label>
          {bundleLoading ? (
            <div className="h-10 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <Select
              value={formData.variation_code}
              onValueChange={handleBundleChange}
            >
              <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
                <SelectValue placeholder="Choose a bundle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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

        {/* Smartcard or Showmax Phone */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">
            {isSmartcardProvider ? "Smartcard Number" : "Phone Number"}
          </label>
          <input
            type="text"
            className="border px-4 py-3 rounded-md"
            value={formData.billersCode}
            onChange={(e) => updateField("billersCode", e.target.value)}
            placeholder={
              isSmartcardProvider
                ? "Enter smartcard number"
                : "Enter phone number"
            }
          />
          {verifying ?(<p className="text-blue-600 text-sm">Verifying…</p>) : (
            (bouquetData === null && isSmartcardProvider && formData.billersCode.length >=8) ? (
              <p className="text-red-600 text-sm">Smartcard not found</p>
            ) : (
              <div>
                {bouquetData && (
                  <>
                    {bouquetData.Customer_Name && <p>{`Customer name: ${bouquetData.Customer_Name}`}</p>}
                    {bouquetData.Smartcard_Number && <p>{`SmartCard number: ${bouquetData.Smartcard_Number}`}</p>}
                    {bouquetData.Balance && <p>{`Available balance: ${bouquetData.Balance}`}</p>}
                    {bouquetData.Current_Bouquet && <p>{`Current Bouquet: ${bouquetData.Current_Bouquet}`}</p>}
                    {bouquetData.Renewal_Amount && <p>{`Renewal Amount: ${bouquetData.Renewal_Amount}`}</p>}
                    {bouquetData.Due_Date && <p>{`Due Date: ${bouquetData.Due_Date}`}</p>}
                    {bouquetData.error && <p className="text-red-600">{`Error: ${bouquetData.error}`}</p>}
                  </>
                )}
                </div>
            )
          )}
        </div>

        {/* Smartcard verification details */}
        {isSmartcardProvider && bouquetData?.content && (
          <div className="bg-green-50 p-3 rounded-md border">
            <p className="font-medium">{bouquetData.content.Customer_Name}</p>
            <p>Status: {bouquetData.content.Status}</p>
          </div>
        )}

        {/* Customer Phone (ONLY smartcard providers) */}
        {isSmartcardProvider && (
          <div className="flex flex-col ">
            <label className="text-sm font-medium">Customer Phone</label>
            <input
              type="tel"
              className="border px-4 py-3 rounded-md"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Enter customer phone"
            />
          </div>
        )}

        {/* Subscription type */}
        {isSmartcardProvider && (
          <div>
            <label className="text-sm font-medium">Subscription Type</label>
            <Select
              value={formData.subscription_type}
              onValueChange={(v) => updateField("subscription_type", v)}
            >
              <SelectTrigger className="w-full border-2 py-3 cursor-pointer">
                <SelectValue placeholder="Select subscription type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="renew">Renew Current Bouquet</SelectItem>
                <SelectItem value="change">Change Bouquet</SelectItem>
              </SelectContent>
            </Select>
          {formData.subscription_type === "change" && (
            <div className="flex flex-col mt-2 ">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-yellow-700">
                          Note: Changing bouquet may interrupt current subscription.
                        </p>
                      </div>
                    </div>
                  </div>
            <label className="text-sm font-medium">Number of Months</label>
            <input
              type="number"
              className="border px-4 py-3 rounded-md"
              value={formData.quantity}
              onChange={(e) => updateField("quantity", e.target.value)}
              placeholder="Enter the number of months to subscribe for. Default is 1"
            />
            </div>
          

          )}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || verifying}
          className="bg-green-700 text-white py-4 px-10 rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default CableForm;
