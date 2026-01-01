/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../../api/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    conf_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^[A-Za-z0-9]{8,}$/,"Password not strong, only alphanumeric characters allowed")
      .required("Password is required"),
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
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate individual field on blur
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      await schema.validateAt(name, { [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => ({
          ...prev,
          [name]: err.message,
        }));
      }
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.firstname.trim() !== "" &&
      formData.lastname.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.conf_password.trim() !== "" &&
      Object.values(errors).every((error) => error === "")
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate entire form
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      setLoading(true);
      const body = {
        first_name: formData.firstname,
        last_name: formData.lastname,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      };
      const response = await register(body);

      const verify_token = response.data.data?.verify_token;
      toast.success(response.data?.message);
      
      // Put a timer for this
      setTimeout(() => {
        toast.info(response.data.data?.verification);
      }, 1500);
      
      // Display response data
      console.log("Register response:", response.data);
      
      // Navigate to the verify otp page
      navigate(
        `/verify-otp?verify_token=${encodeURIComponent(
          response.data.data?.verify_token || ""
        )}`
      );
    } catch (err) {
      // Handle Yup validation errors
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
        toast.error("Please fix the errors in the form");
      }
      // Handle HTTP / network errors
      else if ((err as any)?.response) {
        const message =
          (err as any).response.data?.message || "Something went wrong";
        toast.error(message);
      } else {
        // Fallback for network errors
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 md:mt-12 w-full flex justify-center items-center bg-gray-100 text-sm text-gray-700">
      <div className="w-full max-w-5xl bg-white rounded-3xl border shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — FORM WITH ANIMATION */}
        <div
          className="py-10 px-8 md:px-12"
        >
          <h1 className="text-3xl font-bold uppercase text-center mb-2">
            Register
          </h1>
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
                  value={formData.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-4 py-2 border rounded-sm ${
                    errors.firstname ? "border-red-500" : "border-gray-500"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstname && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.firstname}
                  </span>
                )}
              </span>

              <span className="flex flex-col gap-1 w-full">
                <label htmlFor="lastname">Last name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-4 py-2 border rounded-sm ${
                    errors.lastname ? "border-red-500" : "border-gray-500"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastname && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.lastname}
                  </span>
                )}
              </span>
            </div>

            {/* EMAIL / PHONE */}
            <div className="flex gap-4 flex-col md:flex-row">
              <span className="flex flex-col gap-1 w-full">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-4 py-2 border rounded-sm ${
                    errors.email ? "border-red-500" : "border-gray-500"
                  }`}
                  placeholder="Enter Email Address"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </span>
                )}
              </span>

              <span className="flex flex-col gap-1 w-full">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`px-4 py-2 border rounded-sm ${
                    errors.phone ? "border-red-500" : "border-gray-500"
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </span>
                )}
              </span>
            </div>

            {/* PASSWORD */}
            <span className="flex flex-col gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`px-4 py-2 border rounded-sm ${
                  errors.password ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password}
                </span>
              )}
            </span>

            {/* CONFIRM PASSWORD */}
            <span className="flex flex-col gap-1 relative">
              <label htmlFor="conf_password">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="conf_password"
                value={formData.conf_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`px-4 py-2 border rounded-sm ${
                  errors.conf_password ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              {errors.conf_password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.conf_password}
                </span>
              )}
            </span>

            {/* BUTTON */}
            <button
              className="uppercase text-white bg-green-700 py-5 px-10 text-[0.8rem] rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading || !isFormValid()}
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
        </div>

        {/* RIGHT COLUMN — STATIC OR WITH SUBTLE FADE */}
        <div
          className="hidden md:flex flex-col justify-center items-center bg-green-700 text-white p-10"
        >
          <h1 className="text-3xl font-bold mb-4 text-center">
            Create your Account
          </h1>
          <p className="text-center text-white opacity-90">
            Secure, fast, and reliable data solutions for your everyday needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;