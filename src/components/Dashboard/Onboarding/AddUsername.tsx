import { useState } from "react";

const AddUsername = () => {
    const [username,setUsername] = useState("");
    const handleSubmit = (e:React.FormEvent)=>{
        try {
            
        } catch (error:any) {
            
        }
    }
    return ( 
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 border shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-4">
          Verify OTP
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to{" "}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <input type="text"
            name="username"
            value={username}
             />
          </div>
          <div>
            <p>
              Didn't get the code.{" "}
              <a
                onClick={handleResend}
                className={`text-green-700 underline ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Resend
              </a>
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={loading ? "bg-gray-300 w-full py-3 rounded-lg text-white font-semibold" : "bg-green-700 hover:bg-green-800 w-full py-3 rounded-lg text-white font-semibold cursor-pointer"}
          >
            {loading ? "Sending code..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
     );
}
 
export default AddUsername;