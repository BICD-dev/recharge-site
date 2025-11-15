import { authUrl } from "../constants/links/links";
import type { LoginFormTypes, RegisterFormTypes } from "../constants/types/authTypes";
import axiosClient from "./AxiosClient";

export const login =(data:LoginFormTypes)=>{
    return axiosClient.post(authUrl.loginUrl,data)
}

export const register=(data:RegisterFormTypes)=>{
    return axiosClient.post(authUrl.signupUrl,data)
}