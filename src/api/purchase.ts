import { vtPassUrl } from "../constants/links/links";
import type { 
  Airtime, CableTv, Data, Education_Jamb_Pin_Vending, 
  Education_Jamb_Profile_verification, Education_Waec_PinCheck, 
  ElectricityMeterValidation, ElectricityPostpaid, ElectricityPrepaid, 
  queryVTService 
} from "../constants/types/vtPassTypes";
import axiosClient from "./AxiosClient";

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
export const getDataPlans = async (serviceID: string) => {
  const response = await axiosClient.get(`${import.meta.env.VITE_TEST_VT_API_URL}service-variations?`, {
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
export const buyCableTv = async (data: CableTv) => {
  const response = await axiosClient.post(vtPassUrl.cableUrl, data);
  return response;
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

