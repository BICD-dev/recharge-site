import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { sendVerificationCode, verifyCode } from "@/api/auth";
interface MyJwtPayload {
  userId: string;
  email: string;
  exp: number; // Expiration timestamp
}
const VerifyCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(params.get("verify_token") || "");

  const otpSchema = Yup.object().shape({
    otp: Yup.string().matches(
      /^\d{6}$/,
      "OTP must be 6 digits and only numbers"
    ),
  });
  const maskedEmail = useMemo(() => {
    if (!token) return "";
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.email.replace(/(.{2}).+(@.+)/, "$1***$2");
    } catch {
      return "";
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await otpSchema.validate({ otp });
      if (token) {
        const formData = {
          verify_token: token,
          code: otp,
        };
        //   verify the code
        const result = await verifyCode(formData);
          toast.success(result.data.message);
          navigate("/login");
      } else{
        toast.error("Invalid or missing verification token.");
      }
      setLoading(false);
    } catch (err) {
      toast.error(
        err instanceof Yup.ValidationError ? err.message : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    try {
      setLoading(true);
      if (token) {
        const verify_token = token;
        const result = await sendVerificationCode({ verify_token });
          toast.success(result.data.message);
          setToken(result.data.data?.verify_token || token); 
        } else{
            toast.error("Invalid or missing verification token.");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      if ((err as any)?.response) {
        // const status = (err as any).response.status;
        const message =
          (err as any).response.data?.message || "Something went wrong";

        toast.error(message);
      } else {
        // fallback for network errors
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 border shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-4">
          Verify OTP
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="text-green-700 font-semibold">{maskedEmail}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div>
            <p>
              Didn't get the code.{" "}
              <button
                onClick={handleResend}
                disabled={loading}
                className={`text-green-700 underline ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Resend
              </button>
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
};

export default VerifyCode;
