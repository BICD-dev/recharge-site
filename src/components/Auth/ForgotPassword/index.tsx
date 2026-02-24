import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner'; // Swapping to sonner as per your previous code
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useSendResetPassword } from '@/hooks/useAuth';

// Validation Schema
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const { mutateAsync: sendResetPassword, isPending } = useSendResetPassword();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate email before sending
      await forgotPasswordSchema.validate({ email });
      const response = await sendResetPassword(email.toLowerCase());
      toast.success(response.data?.message || "Sending reset link...");
      setEmail('');
    //   navigate to verify otp page

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        toast.error(err.errors[0]);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section className='bg-[#F4F7FF] py-14 lg:py-20 min-h-screen flex items-center'>
      <div className='container px-4 mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div
              className='relative mx-auto max-w-[525px] overflow-hidden rounded-xl bg-white px-8 py-14 text-center sm:px-12 md:px-[60px] shadow-sm'
            >
              
              {/* Logo Section */}
              <div className='mb-10 text-center'>
                <Link to='/' className='mx-auto inline-block max-w-[160px]'>
                  <img
                    src='/images/logo/logo.svg'
                    alt='logo'
                    className='w-[140px] h-[30px]'
                  />
                </Link>
              </div>

              {/* Header Text */}
              <div className='mb-8 text-center'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  Forgot Password?
                </h2>
                <p className='text-sm text-gray-600'>
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                  <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className='w-full rounded-lg border-2 border-gray-200 bg-transparent px-5 py-3 text-base text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100'
                  />
                </div>
                
                <div>
                  <button
                    type='submit'
                    disabled={isPending}
                    className='flex w-full cursor-pointer items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-green-700 shadow-lg shadow-green-600/20 disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        Sending...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>

              {/* Back to Login */}
              <p className='mt-8 text-sm text-gray-600'>
                Remember your password?{' '}
                <Link to='/login' className='text-green-600 font-medium hover:underline'>
                  Sign In
                </Link>
              </p>

              {/* Decorative Background Circles */}
              <span className='absolute right-[-10px] top-[-10px] z-[-1]'>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#16a34a" fillOpacity="0.05" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;