/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import type { RegisterFormTypes } from "../../constants/types/authTypes";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../../api/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormTypes>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    conf_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Yup validation schema
  const schema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Invalid phone number")
      .required("Phone is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required(),
    conf_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // i hvae to change the logic here... build the backend first
    try {
      await schema.validate(formData, { abortEarly: false });

      setLoading(true);
      const response = await register(formData);

      toast.success("Registration successful!");
      console.log("Register response:", response.data);

      navigate("/login");
    } catch (err) {
          toast.error("Network error. Please try again.");
        
      } finally {
        setLoading(false);
      }
  };

  return (
        <div className="min-h-screen mt-16 md:mt-12 w-full flex justify-center items-center bg-gray-100 text-sm text-gray-700">

  <div className="w-full max-w-5xl bg-white rounded-3xl border shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
    {/* LEFT — FORM WITH ANIMATION */}
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-10 px-8 md:px-12"
    >
      <h1 className="text-3xl font-bold uppercase text-center mb-2">Register</h1>
      <p className="text-center text-gray-600 mb-8">
        Join Datafy Community today!!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* FIRST / LAST */}
        <div className="flex gap-4 flex-col md:flex-row">
          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
              placeholder="Enter your first name"
            />
          </span>

          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
              placeholder="Enter your last name"
            />
          </span>
        </div>

        {/* EMAIL / PHONE */}
        <div className="flex gap-4 flex-col md:flex-row">
          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
              placeholder="Enter Email Address"
            />
          </span>

          <span className="flex flex-col gap-1 w-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
              placeholder="Enter phone number"
            />
          </span>
        </div>

        {/* PASSWORD */}
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

        {/* CONFIRM PASSWORD */}
        <span className="flex flex-col gap-1 relative">
          <label htmlFor="conf_password">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="conf_password"
            onChange={handleChange}
            className="px-4 py-2 border border-gray-500 rounded-sm"
            placeholder="Confirm Password"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </span>

        {/* BUTTON */}
        <button
          className="uppercase text-white bg-green-700 py-5 px-10 text-[0.8rem] rounded-sm cursor-pointer disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-gray-600 font-semibold text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 capitalize">
            login
          </Link>
        </p>
      </form>
    </motion.div>

    {/* RIGHT COLUMN — STATIC OR WITH SUBTLE FADE */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="hidden md:flex flex-col justify-center items-center bg-green-700 text-white p-10"
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Create your Account</h1>
      <p className="text-center text-white opacity-90">
        Secure, fast, and reliable data solutions for your everyday needs.
      </p>
    </motion.div>

  </div>
</div>

  );
};

export default Register;
