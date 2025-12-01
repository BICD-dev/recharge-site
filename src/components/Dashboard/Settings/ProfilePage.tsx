import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { toast } from "sonner";
interface JwtPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  [key: string]: any; // for other properties
}
export default function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const { first_name, last_name, email, phone } = decoded;

      setUser({ firstName: first_name || "", lastName: last_name || "", email, phone });
      setPhone(phone);
    }
  }, []);

  const handleUpdatePhone = async () => {
    setLoading(true);
    try {
      // Example API call
      await new Promise((res) => setTimeout(res, 1200));

      setUser((prev) => ({ ...prev, phone }));
      toast.success("Phone number updated successfully");
    } catch (error) {
        console.error("Error updating phone number:", error);
      toast.error("Could not update phone number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" w-full flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile Information</h2>
                    <p className="text-sm text-gray-600">Update your personal details</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.firstName.charAt(0).toUpperCase()}
                    </div>
                    <button className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-all">
                      Change Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">First Name</label>
                      <input
                        type="text"
                        value={user.firstName} 
                        disabled
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all bg-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Last Name</label>
                      <input
                        type="text"
                        value={user.lastName} 
                        disabled
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all bg-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email</label>
                      <input
                        type="email"
                        value={user.email} 
                        disabled
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all bg-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        value={user.phone} 
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleUpdatePhone}
                    className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-600/30 cursor-pointer"
                  >
                    Save Changes
                  </button>
                

      {/* <Card className="rounded-2xl shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-green-700">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-green-700">First Name</Label>
            <Input value={user.firstName} disabled className="bg-gray-200" />
          </div>
          <div>
            <Label className="text-green-700">Last Name</Label>
            <Input value={user.lastName} disabled className="bg-gray-200" />
          </div>
          <div>
            <Label className="text-green-700">Email</Label>
            <Input value={user.email} disabled className="bg-gray-200" />
          </div>
          <div>
            <Label className="text-green-700">Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="border-green-700" />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              onClick={handleUpdatePhone}
              disabled={loading}
              className="bg-green-700 text-white hover:bg-green-800 cursor-pointer"
            >
              {loading ? "Updating..." : "Update Phone Number"}
            </Button>
          </div>
        </CardContent>
      </Card> */}

      
    </motion.div>
  );
}
