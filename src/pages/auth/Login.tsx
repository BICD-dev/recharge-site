import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { LoginFormTypes } from "../../constants/types/authTypes";
import { authUrl } from "../../constants/links/links";
import { Link, useNavigate } from "react-router-dom";

// Yup validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW STATE

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

      const url = `${import.meta.env.VITE_API_URL}/${authUrl.loginUrl}`;
      const response = await axios.post(url, formData);

      toast.success("Login successful!");

      navigate("/personal");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err: any) => toast.error(err.message));
      } else if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-lg flex justify-center items-center h-screen text-sm text-gray-700">
      <div className="rounded-3xl border py-4 px-6 w-[90%] md:w-[40%] bg-white">
        <h1 className="text-2xl my-4 text-center font-bold uppercase">Login</h1>
        <h2 className="text-center my-4">Login to your account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Email */}
          <span className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
              placeholder="Enter email"
            />
          </span>

          {/* Password with toggle */}
          <span className="flex flex-col gap-1 relative">
            <label htmlFor="password">Password</label>

            <input
              type={showPassword ? "text" : "password"}  // 👈 TOGGLE HERE
              name="password"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm pr-12"
              placeholder="Enter password"
            />

            {/* Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </span>

          {/* Submit */}
          <button
            disabled={loading}
            className={`uppercase text-white py-5 px-10 text-lg rounded-sm cursor-pointer
              ${loading ? "bg-green-500" : "bg-green-700"} disabled:opacity-70`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/forgot" className="text-right text-green-700 font-semibold">
            Forgot your password?
          </Link>

          <p className="text-gray-600 font-semibold">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-700">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
