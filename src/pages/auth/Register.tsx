import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import type { RegisterFormTypes } from "../../constants/types/authTypes";
import { authUrl } from "../../constants/links/links";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

    try {
      await schema.validate(formData, { abortEarly: false });

      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/${authUrl.signupUrl}`;
      const response = await axios.post(url, formData);

      toast.success("Registration successful!");
      console.log("Register response:", response.data);

      navigate("/login");
    } catch (err: any) {
      if (err.name === "ValidationError") {
        err.inner.forEach((e: any) => toast.error(e.message));
      } else if (err.response) {
        toast.error(err.response.data.message || "Registration failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-lg flex justify-center items-center mb-4 mt-26 text-sm text-gray-700">
      <div className="rounded-3xl border py-4 px-6 w-[90%] md:w-fit bg-white h-fit">
        <h1 className="text-2xl my-4 text-center font-bold uppercase">Register</h1>
        <h2 className="text-center my-4">Join Datafy Community today!!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-4 md:flex-row flex-col">
            <span className="flex flex-col gap-1">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                name="firstname"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-500 rounded-sm"
                placeholder="Enter your first name"
              />
            </span>
            <span className="flex flex-col gap-1">
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

          <div className="flex gap-4 md:flex-row flex-col">
            <span className="flex flex-col gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-500 rounded-sm"
                placeholder="Enter Email Address"
              />
            </span>
            <span className="flex flex-col gap-1">
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

          <span className="flex flex-col gap-1 relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </span>

          <span className="flex flex-col gap-1 relative">
            <label htmlFor="conf_password">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="conf_password"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-500 rounded-sm"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </span>

          <button
            className="uppercase text-white bg-green-700 py-5 px-10 text-[0.8rem] rounded-sm cursor-pointer disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <p className="text-gray-600 font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 capitalize">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
