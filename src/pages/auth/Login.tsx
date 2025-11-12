import { useState } from "react";
import type { LoginFormTypes } from "../../constants/types/authTypes";
import { authUrl } from "../../constants/links/links";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  // yup validation
  // handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login function
    try {
        const url = `${import.meta.env.VITE_API_URL}/${authUrl.loginUrl}`
        const data= formData;
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const result = response.json();
        console.log(result)

    } catch (error) {
        console.error(error)
    }
  };
  return (
    <div
      className={` backdrop-blur-lg flex justify-center items-center h-screen text-sm text-gray-700`}
    >
      <div className="rounded-3xl border py-4 px-6 w-[90%] md:w-[40%] bg-white">
        <h1 className="text-2xl my-4 text-center font-bold uppercase">Login</h1>
        <h2 className=" text-center my-4 ">Login to your account</h2>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-6"
        >
            <span className="flex flex-col gap-1">
                <label htmlFor="email">Email or Phone Number</label>
          <input type="email" name="email" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" placeholder="Email or Phone Number" />
            </span>
            <span className="flex flex-col gap-1">
                <label htmlFor="password" className="">Password</label>
          <input type="text" name="password" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" placeholder="Password" />
            </span>
          
          <button className="uppercase text-white bg-green-700 py-5 px-10 text-lg rounded-sm ">
            login
          </button>
          <Link to="/forgot" className="text-right text-green-700 font-semibold">
            Forgot your password?
          </Link>
          <p className="text-gray-600 font-semibold">
            Dont have an account?{" "}
            <Link to="/register" className="text-green-700 ">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
