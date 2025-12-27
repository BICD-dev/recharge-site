import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lock } from 'lucide-react';
import { validatePin } from '@/api/purchase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

interface TransactionPinInputProps {
  onSuccess: (pin: string) => void;
  onCancel?: () => void;
  transactionDetails: {
    amount: number;
    service: string;
    phone: string;
  };
}

const TransactionPinInput: React.FC<TransactionPinInputProps> = ({
  onSuccess,
  onCancel,
  transactionDetails
}) => {

  const navigate = useNavigate();

  // ---- USER HOOK ----
  const { data: user, isLoading, isError } = useUser();

  // ---- PIN STATE ----
  const [pin, setPin] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input when loaded
  useEffect(() => {
    if (!isLoading) {
      inputRefs.current[0]?.focus();
    }
  }, [isLoading]);

  // ---- HANDLE USER + PIN STATUS ----
  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      toast.info("Login expired. Please login again.");
      navigate("/login");
      return;
    }

    if (!user.transaction_pin_set) {
      toast.error("Please set your transaction PIN before proceeding.");
      navigate("/dashboard/settings");
    }

  }, [isLoading, isError, user, navigate]);


  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');
    setSuccess(false);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();

    if (index === 3 && value) {
      handleSubmit([...newPin.slice(0, 3), value].join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);

    if (/^\d{4}$/.test(pastedData)) {
      const arr = pastedData.split('');
      setPin(arr);
      inputRefs.current[3]?.focus();
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (pinValue: string) => {
    setIsVerifying(true);
    setError('');

    try {
      const res = await validatePin(pinValue);
      toast.success(res.data?.message ?? "PIN verified successfully");
      setSuccess(true);
      onSuccess(pinValue);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to verify PIN. Please try again.");
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setPin(['', '', '', '']);
    setError('');
    setSuccess(false);
    inputRefs.current[0]?.focus();
  };

  // ---- LOADING STATE ----
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading user details...
      </div>
    );
  }

  // If user not loaded OR redirected, don't render PIN fields
  if (!user?.transaction_pin_set) return null;


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Enter Transaction PIN</CardTitle>
          <CardDescription className="text-center">
            Please enter your 4-digit PIN to authorize this transaction
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="space-y-2">
            <Label>Transaction PIN</Label>

            <div className="flex gap-3 justify-center">
              {pin.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="password"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isVerifying || success}
                  className="w-14 h-14 text-center text-2xl"
                />
              ))}
            </div>
          </div>

          {isVerifying && (
            <Alert>
              <AlertDescription>Verifying PIN...</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>PIN verified successfully!</AlertDescription>
            </Alert>
          )}

          <p className="text-xs text-center text-green-600 cursor-pointer" onClick={handleReset}>
            Clear PIN
          </p>

          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span>Amount:</span>
              <span>{transactionDetails.amount}</span>
            </div>
            <div className="flex justify-between">
              <span>Service:</span>
              <span>{transactionDetails.service}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <span>{transactionDetails.phone}</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPinInput;
