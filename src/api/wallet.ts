import { walletUrl } from "@/constants/links/links";
import axiosClient from "./AxiosClient";

interface fundData {
  amount?: number | string,
  email:string
}
interface fundResponse{
    data : {
        status: string;
        code: number;
        message: string;
        data?: {
            authorization_url: any;
            access_code: any;
            reference: string;
        };
        error?: undefined;
    }
  }

  interface walletBalanceType{
    data:{
        status: string;
        code: number;
        message: string;
        data?: {
            amount: any;
        } | undefined
  }
}
interface verifyPayment{
    data : {
        status: string;
        code: number;
        message: string;
        detail?: any | undefined;
    } 
}
export const fundWallet = async (data:fundData) => {
  const response:fundResponse = await axiosClient.post(walletUrl.fundUrl, data);
  return response;
};

export const walletBalance = async ()=>{
    const response:walletBalanceType = await axiosClient.get(walletUrl.balanceUrl);
    return response;
}

export const verifyFunds = async (reference:string)=>{
    const response:verifyPayment = await axiosClient.post("/wallet/verify", { reference });
    return response;

}