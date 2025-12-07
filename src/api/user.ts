import { userUrl } from "@/constants/links/links";
import axiosClient from "./AxiosClient";

interface SetPinResponse {
    data: {
        status: string;
        code: number;
        message: string;
        error?: undefined;
        data?:{
            token?:string;
        }
    };
}
export const setPin = async (pin: string) => {
  const response: SetPinResponse = await axiosClient.put(userUrl.setPinUrl, { pin });
  return response;
};