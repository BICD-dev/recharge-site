
export interface queryVTService {
    request_id:string,
}

export interface Airtime {
    request_id:string,
    serviceID:string, // mtn, glo, airtel, 9mobile
    phone:number,
    amount:number,
    email?:string,
}

export interface Data {
    request_id:string,
    serviceID:string,
    billersCode:string,
    variation_code:string,
    phone:number,
}

export interface CableTv {
    request_id:string,
    serviceID:string,
    billersCode:string,
    variation_code:string,
    amount:number,
    phone:number,
    subscription_type:string,
    quantity?:number,
}

export interface ElectricityMeterValidation {
    billersCode:string,
    serviceID:string,
    type:string,
}

export interface ElectricityPrepaid {
    request_id:string,
    serviceID:string,
    billersCode:string,
    variation_code:string,
    amount:number,
    phone:number,
}

export interface ElectricityPostpaid {
    request_id:string,
    serviceID:string,
    billersCode:string,
    variation_code:string,
    amount:number,
    phone:number,
}

export interface Education_Waec_PinCheck {
    request_id:string,
    serviceID:string,
    variation_code:string, 
    quantity?:number,
    amount?:number, //use amount to validate if the user can pay for the service. done in the backend though
    phone:number,
}

export interface Education_Jamb_Profile_verification {
    billersCode:string,
    serviceID:string,
    type:string,
}

export interface Education_Jamb_Pin_Vending {
    request_id:string,
    serviceID:string,
    variation_code:string,
    billersCode:string,
    amount?:number,
    phone:number,
}