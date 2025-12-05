import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lock } from 'lucide-react';
import { validatePin } from '@/api/purchase';
import { toast } from 'sonner';

// 1. Make it accept props
interface TransactionPinInputProps {
  onSuccess: (pin: string) => void;
  onCancel?: () => void;
  transactionDetails: {
    amount: number;
    service: string;
    phone: string;
  };
}



const TransactionPinInput: React.FC<TransactionPinInputProps> = ({ onSuccess, onCancel, transactionDetails }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');
    setSuccess(false);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (index === 3 && value) {
      const fullPin = [...newPin.slice(0, 3), value].join('');
      handleSubmit(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    
    // Only allow if it's 4 digits
    if (/^\d{4}$/.test(pastedData)) {
      const newPin = pastedData.split('');
      setPin(newPin);
      inputRefs.current[3]?.focus();
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (pinValue: string) => {
    setIsVerifying(true);
    setError('');

    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      const response = await validatePin(pinValue);
      toast.success(response.data.message || "PIN verified successfully!");
      setIsVerifying(false);
      setSuccess(true);
      onSuccess(pinValue);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to verify PIN. Please try again.");
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    setIsVerifying(false);

    }

  };


  const handleReset = () => {
    setPin(['', '', '', '']);
    setError('');
    setSuccess(false);
    inputRefs.current[0]?.focus();
  };

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
          {/* PIN Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Transaction PIN</Label>
            <div className="flex gap-3 justify-center">
              {pin.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isVerifying || success}
                  className={`w-14 h-14 text-center text-2xl font-semibold transition-all
                    ${success ? 'border-green-500 bg-green-50' : ''}
                    ${error ? 'border-red-500 bg-red-50' : ''}
                    ${!success && !error ? 'border-gray-300 focus:border-green-500' : ''}
                  `}
                />
              ))}
            </div>
          </div>

          {/* Status Messages */}
          {isVerifying && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-center text-blue-800">
                Verifying PIN...
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </div>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  PIN verified successfully!
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Helper Text */}
          <div className="space-y-2">
            <p className="text-xs text-center text-gray-500">
              Your PIN is encrypted and secure
            </p>
            {!success && (
              <p 
                className="text-xs text-center text-green-600 hover:underline cursor-pointer"
                onClick={handleReset}
              >
                Clear PIN
              </p>
            )}
          </div>

          {/* Transaction Details */}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">{transactionDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold">{transactionDetails.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold">{transactionDetails.phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPinInput;