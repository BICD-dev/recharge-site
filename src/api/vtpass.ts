import axiosClient from "./AxiosClient";

export const buyAirtime = (data)=>{
    axiosClient.post('link',data)
}