import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser"; 

export default function ProfilePage() {
  const { data: userData, isLoading, isError } = useUser();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync fetched user -> local state
  useEffect(() => {
    if (userData) {
      setUser({
        firstName: userData.first_name ?? "",
        lastName: userData.last_name ?? "",
        email: userData.email ?? "",
        phone: userData.phone ?? "",
      });

      setPhone(userData.phone ?? "");
    }
  }, [userData]);

  const handleUpdatePhone = async () => {
    setLoading(true);
    try {
      // Example API call placeholder
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

  if (isLoading) {
    return <p>Loading profile…</p>;
  }

  if (isError || !userData) {
    return <p>Unable to load user profile.</p>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col gap-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile Information</h2>
        <p className="text-sm text-gray-600">Update your personal details</p>
      </div>

      <div className="flex items-center gap-6">
        {userData?.avatar_url ? (
            <img
              src={userData.avatar_url}
              alt={userData.first_name}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-700"
            />
          ) : (
        <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user.firstName.charAt(0).toUpperCase()}
        </div>
          )}
        <button className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-all cursor-pointer">
          Change Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">First Name</label>
          <input
            type="text"
            value={user.firstName}
            className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Last Name</label>
          <input
            type="text"
            value={user.lastName}
            className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg"
          />
        </div>
      </div>

      <button
        onClick={handleUpdatePhone}
        disabled={loading}
        className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </motion.div>
  );
}
