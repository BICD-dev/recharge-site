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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-green-700">My Profile</h1>

      <Card className="rounded-2xl shadow-md bg-white">
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
      </Card>

      {/* EXTRA PROFILE FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-green-700">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p>Manage your account security settings.</p>
            <Button className="bg-green-700 text-white hover:bg-green-800 cursor-pointer">Reset Password</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-green-700">Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none  text-sm text-gray-700">
              <li>Last login: 2 hours ago</li>
              <li>Account created: Jan 2024</li>
              <li>Transactions this month: 12</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
