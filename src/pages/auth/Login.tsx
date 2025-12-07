/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { LoginFormTypes } from "../../constants/types/authTypes";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import loginImage from '@/assets/feature-img/login-feature.png';
// Yup validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 4 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginSchema.validate(formData, { abortEarly: false });
      const response = await login(formData);
      
        toast.success(response.data.message);
        localStorage.setItem("token", response.data?.data?.token || "");
        navigate("/dashboard"); // navigate to the dashboard on success
      
    } catch (err: unknown) {
      const errorAny = err as any;

      // Handle Yup validation errors
      if (errorAny?.name === "ValidationError" && Array.isArray(errorAny.errors)) {
        errorAny.errors.forEach((e: string) => toast.error(e));
      }
      // Handle HTTP / API errors (e.g., axios style)
      else if (errorAny?.response?.status === 403 || errorAny?.code === 403) {
        const verify_token = errorAny?.response?.data?.data?.verify_token;
        // display the reason for the unsuccessful login, inactive account in this case
        toast.error(errorAny?.response?.data?.message || errorAny?.message || "Account inactive");
        // navigate to the otp page
        // navigate(`/verify-otp?verify_token=${verify_token}`);
        navigate(`/verify-otp?verify_token=${encodeURIComponent(verify_token)}`);

      } else {
        toast.error(errorAny?.response?.data?.message || errorAny?.message || "Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="h-screen mt-12 w-full flex justify-center items-center bg-gray-100 text-sm text-gray-700">

  {/* CONTAINER */}
  <div className="flex w-[90%] md:w-[70%] lg:w-[60%] bg-white rounded-3xl overflow-hidden shadow-lg">

    {/* LEFT SIDE - IMAGE PANEL (Desktop Only) */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hidden md:flex md:w-1/2 bg-contain bg-center"
      style={{
        // backgroundImage: `url(${loginImage})`
      }}
    >
      {/* Optional dark overlay */}
      <div className="w-full h-full bg-green-700 flex flex-col justify-center items-center gap-40 p-6">
        <h2 className="text-white text-3xl font-bold">Welcome Back</h2>
        <p className="text-white">
          Stay connected and manage your account effortlessly. Log in to continue your payments, purchases, and everyday transactions without stress.
        </p>
      </div>
    </motion.div>

    {/* RIGHT SIDE - LOGIN FORM */}
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full md:w-1/2 px-8 py-10"
    >
      <h1 className="text-3xl font-bold uppercase text-center">Login</h1>
      <h2 className="text-center text-gray-600 mt-2 mb-8">Login to your account</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email */}
        <span className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md"
            placeholder="Enter email"
          />
        </span>

        {/* Password */}
        <span className="flex flex-col gap-1 relative">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            className="px-4 py-2 border border-gray-500 rounded-sm"
            placeholder="Password"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </span>

        {/* Submit */}
        <button
          disabled={loading}
          className={`uppercase text-white py-4 rounded-md text-sm font-semibold transition cursor-pointer 
            ${loading ? "bg-green-500" : "bg-green-700"} disabled:opacity-70`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link to="/forgot" className="text-right text-green-700 font-semibold">
          Forgot your password?
        </Link>

        <p className="text-gray-600 font-semibold text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-700">
            Sign Up
          </Link>
        </p>
      </form>
    </motion.div>

  </div>
</div>


  );
};

export default Login;
