import { useState } from "react";
import type { RegisterFormTypes } from "../../constants/types/authTypes";
import { authUrl } from "../../constants/links/links";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
      const [formData, setFormData] = useState<RegisterFormTypes>({
        firstname:"",
        lastname:"",
        phone:0o0,
        email: "",
        password: "",
        conf_password:"",
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
            const url = `${import.meta.env.VITE_API_URL}/${authUrl.signupUrl}`
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
            // toast the result message

            // navigate to the login page
            navigate('/login')
    
        } catch (error) {
            console.error(error)
        }
      };
  return (
    <div
      className={` backdrop-blur-lg flex justify-center items-center mb-4 mt-26 text-sm text-gray-700`}
    >
      <div className="rounded-3xl border py-4 px-6 w-[90%] md:w-fit bg-white h-fit ">
        <h1 className="text-2xl my-4 text-center font-bold uppercase">Register</h1>
        <h2 className=" text-center my-4 ">Join Datafy Community today!!</h2>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-6 "
        >   
        <div className="flex gap-4 md:flex-row flex-col">
            <span className="flex flex-col gap-1">
                <label htmlFor="email">First name</label>
          <input type="email" name="firstname" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" placeholder="Enter your first name" />
            </span>
            <span className="flex flex-col gap-1">
                <label htmlFor="email">Last name</label>
          <input type="email" name="lastname" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" placeholder="Enter your last name" />
            </span>

        </div>
        <div className="flex gap-4 md:flex-row flex-col">
            <span className="flex flex-col gap-1">
                <label htmlFor="email">Email Address</label>
          <input type="email" name="email" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" placeholder="Enter Email Address " />
            </span>
            <span className="flex flex-col gap-1">
                <label htmlFor="phone" className="">Phone Number</label>
          <input type="text" name="phone" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" placeholder="Enter phone number" />
            </span>

        </div>
            <span className="flex flex-col gap-1">
                <label htmlFor="password" className="">Password</label>
          <input type="text" name="password" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" />
            </span>
          <span className="flex flex-col gap-1">
                <label htmlFor="password" className="">Confirm Password</label>
          <input type="text" name="conf_password" onChange={handleChange} className="px-12 py-2 border border-gray-500 rounded-sm" />
            </span>
          <button className="uppercase text-white bg-green-700 py-5 px-10 text-[0.8rem] rounded-sm ">
            sign up
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
}
 
export default Register;