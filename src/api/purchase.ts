import { authUrl, vtPassUrl } from "../constants/links/links";
import type { 
  Airtime, CableTv, Data, Education_Jamb_Pin_Vending, 
  Education_Jamb_Profile_verification, Education_Waec_PinCheck, 
  ElectricityMeterValidation, ElectricityPostpaid, ElectricityPrepaid
} from "../constants/types/vtPassTypes";
import axiosClient from "./AxiosClient";
import axios from "axios";

interface CableTvRequest {
  serviceID: string;
  billersCode: string; //smartcard number for dstv
  amount: number;
  variation_code: string;
  phone?: string;
  subscription_type?: "change" | "renew";
  quantity?: number;
  pin: string;
}
interface AirtimeResponse {
  data: {
    status: string;
    code: number;
    message: string;
    data?: {
        reference: string;
        purchaseStatus: string;
    };
    error?: undefined;
}
}
interface PinResponse {
  data: {
    status: string;
    code: number;
    message: string;
    error?: undefined;
  };
}
export interface VerifyResponseContent {
  Customer_Name?: string;
  Status?: string;
  Due_Date?: string;
  Smartcard_Number?: string;
  Customer_Type?: string;
  // ... other fields depending on service (DSTV, GOTV, Startimes)
  [key: string]: any;
}

interface VerifyResponse {
  code: number;
  content: VerifyResponseContent;
}
export const validatePin = async (pin: string) => {
  const response:PinResponse = await axiosClient.post(authUrl.verifyPinUrl, { pin });
  return response;
}
// Airtime
export const buyAirtime = async (data: Airtime) => {
  const response:AirtimeResponse = await axiosClient.post(vtPassUrl.airtimeUrl, data);
  return response;
};

// Data
export const buyData = async (data: Data) => {
  const response = await axiosClient.post(vtPassUrl.dataUrl, data);
  return response;
};
export const getVariations = async (serviceID: string) => {
  const response = await axios.get(`${import.meta.env.VITE_TEST_VT_API_URL}service-variations?`, {
    params: { serviceID },
    headers: {
      "api-key": import.meta.env.VITE_VT_API_KEY,
      "public-key": import.meta.env.VITE_VT_PUBLIC_KEY,
      "Content-Type": "application/json",
    },
  });
  return response;
};
// Cable TV
export const buyCableTv = async (data:CableTvRequest) => {
  const response = await axiosClient.post(vtPassUrl.cableUrl, data);
  return response;
};

export const verifySmartCardApi = async (data: { billersCode: string; serviceID: "dstv" | "gotv" | "startimes",}):Promise<VerifyResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_TEST_VT_API_URL}merchant-verify`, data, {
    auth: {
      username: import.meta.env.VITE_APP_VTPASS_EMAIL,
      password: import.meta.env.VITE_APP_VTPASS_PASSWORD,
    },
  headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data.code !== "000") {
      // non-success (e.g. invalid smartcard)
      throw new Error(`VTpass verify failed with code ${response.data.code}`);
    }

    return response.data;
  
};

// Electricity
export const buyElectricityPostpaid = async (data: ElectricityPostpaid) => {
  const response = await axiosClient.post(vtPassUrl.electricityUrl, data);
  return response;
};

export const buyElectricityPrepaid = async (data: ElectricityPrepaid) => {
  const response = await axiosClient.post(vtPassUrl.electricityUrl, data);
  return response;
};

export const validateElectricityMeter = async (data: ElectricityMeterValidation) => {
  const response = await axiosClient.post(vtPassUrl.electricityValidateUrl, data);
  return response;
};

// Education
export const buyWaecPin = async (data: Education_Waec_PinCheck) => {
  const response = await axiosClient.post(vtPassUrl.waecPinUrl, data);
  return response;
};

export const validateJambPin = async (data: Education_Jamb_Profile_verification) => {
  const response = await axiosClient.post(vtPassUrl.jambValidationUrl, data);
  return response;
};

export const buyJambPin = async (data: Education_Jamb_Pin_Vending) => {
  const response = await axiosClient.post(vtPassUrl.jambPinUrl, data);
  return response;
};

