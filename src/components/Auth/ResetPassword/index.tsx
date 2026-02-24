import { useResetPassword } from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Must contain a letter")
    .matches(/[0-9]/, "Must contain a number")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  
  // Extract token/OTP and email from the URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");
      const { mutateAsync: resetPassword, isPending:resetPending } = useResetPassword();
    
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid or expired reset link");
      navigate("/forgot");
      return;
    }
  }, [token, email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token || !email) {
        toast.error("Invalid or expired reset link");
        return;
      }
      await resetPasswordSchema.validate(form);
      setIsPending(true);

      const response = await resetPassword({ reset_token: token, email, password: form.password });
      toast.success(response.data?.message || "Password changed successfully!");
      navigate("/login");
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        toast.error(err.errors[0]);
      } else {
        toast.error("Failed to reset password");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="bg-[#F4F7FF] py-14 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-[525px] rounded-xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
          <p className="text-sm text-gray-600 mb-8">Enter your new secure password below.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-green-600 outline-none"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-green-600 outline-none"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;