import { authUrl } from "../constants/links/links";
import type {
  LoginFormTypes,
  RegisterFormTypes,
  ResendCodeFormTypes,
  VerifyCodeFormTypes,
} from "../constants/types/authTypes";
import axiosClient from "./AxiosClient";
interface registerResponse {
  data: {
    status: string;
    code: number;
    message: string;
    data?:
      | {
          user: object;
          verification: string;
          verify_token: string;
        }
      | undefined;
  };
}

interface loginResponse {
  data: {
    status: string;
    code: number;
    message: string;
    data:
      | {
          verfication?: string;
          token?: string;
          verify_token?: string; // only shows if the account is not verified
        }
      | undefined;
  };
}

interface sendCodeResponse {
  data: {
    status: string;
    code: number;
    message: string;
    data:
      | {
          verfication: string;
          verify_token?: string; // new token with a reset exp time
        }
      | undefined;
  };
}

interface verifyCodeResponse {
  data: { status: string; code: number; message: string; data:{token:string}};
}
export const login = async (data: LoginFormTypes) => {
  const response: loginResponse = await axiosClient.post(
    authUrl.loginUrl,
    data
  );

  return response;
};

export const register = async (data: RegisterFormTypes) => {
  const response: registerResponse = await axiosClient.post(
    authUrl.signupUrl,
    data
  );

  return response;
};

export const sendVerificationCode = async (data: ResendCodeFormTypes) => {
  const response: sendCodeResponse = await axiosClient.post(
    authUrl.sendCodeUrl,
    data
  );

  return response;
};

export const verifyCode = async (data: VerifyCodeFormTypes) => {
  const response: verifyCodeResponse = await axiosClient.post(
    authUrl.verifyCodeUrl,
    data
  );

  return response;
};


