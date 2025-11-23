import { authUrl } from "../constants/links/links";
import type { LoginFormTypes, RegisterFormTypes } from "../constants/types/authTypes";
import axiosClient from "./AxiosClient";
interface registerResponse {
    status: string;
    code: number;
    message: string;
    data?: {
        user: object;
        verification: string;
        verify_token:string;
    } | undefined
}

interface loginResponse {
    status: string;
    code: number;
    message: string;
    data: {
        verfication: string;
        token?: undefined;
        verify_token?:string; // only shows if the account is not verified
    } | undefined
}
export const login = async (data:LoginFormTypes)=>{
    const response:loginResponse = await axiosClient.post(authUrl.loginUrl,data);

    return response;
}

export const register= async (data:RegisterFormTypes)=>{
    const response:registerResponse = await axiosClient.post(authUrl.signupUrl,data)

    return response;
}