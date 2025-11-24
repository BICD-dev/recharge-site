export interface LoginFormTypes {
    email:string,
    password:string
}

export interface RegisterFormTypes {
    first_name:string,
    last_name:string,
    email:string,
    phone:string,
    password:string
}

export interface VerifyCodeFormTypes {
    verify_token:string 
    code:string
}

export interface ResendCodeFormTypes {
    verify_token:string
}

