import { userUrl } from "@/constants/links/links";
import axiosClient from "./AxiosClient";

interface SetPinResponse {
  data: {
    status: string;
    code: number;
    message: string;
    error?: undefined;
    data?: {
      token?: string;
    };
  };
}
interface UserResponse {
  data: {
    status: string;
    code: number;
    message: string;
    error?: undefined;
    data?: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      is_active: boolean;
      transaction_pin_set: boolean;
    };
  };
}
interface OnboardData {
  username:string,
  avatar_url:string
}
interface OnboardingResponse {
  data: { status: string; code: number; message: string };
}
export const setPin = async (pin: string) => {
  const response: SetPinResponse = await axiosClient.put(userUrl.setPinUrl, {
    pin,
  });
  return response;
};

export const fetchUser = async () => {
  const response: UserResponse = await axiosClient.get(userUrl.getUser);
  return response;
};

export const onboardUser = async (data:OnboardData) => {
  const {username, avatar_url} = data;
  const response: OnboardingResponse = await axiosClient.post(
    userUrl.onboardUrl,
    {
      username,
      avatar_url,
    }
  );
  return response;
};
