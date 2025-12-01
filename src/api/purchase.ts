import { vtPassUrl } from "../constants/links/links";
import type { 
  Airtime, CableTv, Data, Education_Jamb_Pin_Vending, 
  Education_Jamb_Profile_verification, Education_Waec_PinCheck, 
  ElectricityMeterValidation, ElectricityPostpaid, ElectricityPrepaid, 
  queryVTService 
} from "../constants/types/vtPassTypes";
import axiosClient from "./AxiosClient";
import axios, { AxiosError } from "axios";

const requestWrapper = async <T>(url: string, payload: T) => {
  try {
    const response = await axiosClient.post(url, payload);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error is now typed as AxiosError
      return { success: false, error: error.response?.data?.message || error.message };
    }

    // fallback for non-Axios errors
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unknown error occurred" };
  }
};

// Airtime
export const buyAirtime = (data: Airtime) => requestWrapper(vtPassUrl.airtimeUrl, data);

// Data
export const buyData = (data: Data) => requestWrapper(vtPassUrl.dataUrl, data);

// Cable TV
export const buyCableTv = (data: CableTv) => requestWrapper(vtPassUrl.cableUrl, data);

// Electricity
export const buyElectricityPostpaid = (data: ElectricityPostpaid) =>
  requestWrapper(vtPassUrl.electricityUrl, data);

export const buyElectricityPrepaid = (data: ElectricityPrepaid) =>
  requestWrapper(vtPassUrl.electricityUrl, data);

export const validateElectricityMeter = (data: ElectricityMeterValidation) =>
  requestWrapper(vtPassUrl.electricityValidateUrl, data);

// Education
export const buyWaecPin = (data: Education_Waec_PinCheck) =>
  requestWrapper(vtPassUrl.waecPinUrl, data);

export const validateJambPin = (data: Education_Jamb_Profile_verification) =>
  requestWrapper(vtPassUrl.jambValidationUrl, data);

export const buyJambPin = (data: Education_Jamb_Pin_Vending) =>
  requestWrapper(vtPassUrl.jambPinUrl, data);

// Query VTPass service
export const queryVTPass = (request_id: queryVTService) =>
  requestWrapper(vtPassUrl.queryServiceUrl, request_id);
