import {useState} from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as Yup from "yup";
// import type { RegisterFormTypes } from "../../../constants/types/authTypes";
import type {Airtime} from "../../../constants/types/vtPassTypes";
import { useNavigate } from "react-router-dom";
import { buyAirtime } from "../../../api/vtpass";
const AirtimeForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState<Airtime>({
    serviceID: "",
    phone: 0,
    amount: 0,
    request_id: "",
  });
  const [loading, setLoading] = useState(false);
    // Yup validation schema
    const schema = Yup.object().shape({
        serviceID: Yup.string().required("Service ID is required"),
        phone: Yup.number().required("Phone number is required"),
        amount: Yup.number().required("Amount is required"),
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const key = name as keyof Airtime;
        // convert numeric fields to numbers, leave others as strings
        if (key === "phone" || key === "amount") {
            setFormData(prev => ({ ...prev, [key]: Number(value) } as Airtime));
        } else {
            setFormData(prev => ({ ...prev, [key]: value } as Airtime));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await schema.validate(formData, {abortEarly: false});
            setLoading(true);
            const result = await buyAirtime(formData);
            console.log("Airtime purchase response:", result);
            toast.success("Airtime purchase successful!");
            console.log("Airtime purchase response:", formData);
            // navigate("/dashboard/wallet");
            // navigate to a success page or update UI accordingly
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach((err) => {
                    toast.error(err.message);
                });
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="backdrop-blur-lg flex justify-center items-center mb-4 mt-26 text-sm text-gray-700">
              <div className="rounded-3xl border py-4 px-6 w-[90%] md:w-fit bg-white h-fit">
                <h1 className="text-2xl my-4 text-center font-bold uppercase">Buy Airtime</h1>
                <h2 className="text-center my-4">Stay Connected! Top-up your airtime online - MTN, 9mobile, Glo, and Airtel</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex gap-4 md:flex-row flex-col">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Network Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Network Providers</SelectLabel>
                            <SelectItem value="mtn">MTN</SelectItem>
                            <SelectItem value="airtel">Airtel</SelectItem>
                            <SelectItem value="glo">Glo</SelectItem>
                            <SelectItem value="9mobile">9mobile</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                  </div>
        
                  <div className="flex gap-4 md:flex-row flex-col">
                    <span className="flex flex-col gap-1">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="telephone"
                        name="phone"
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-500 rounded-sm"
                        placeholder="Enter phone number"
                      />
                    </span>
                    <span className="flex flex-col gap-1">
                      <label htmlFor="email">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-500 rounded-sm"
                        placeholder="Enter Amount"
                      />
                    </span>
                    
                  </div>
                
                  <button
                    className="uppercase text-white bg-green-700 py-5 px-10 text-[0.8rem] rounded-sm cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Purchase"}
                  </button>
                </form>
              </div>
            </div>
     );
}
 
export default AirtimeForm
;