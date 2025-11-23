export interface LoginFormTypes {
    email:string,
    password:string
}

export interface RegisterFormTypes {
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    password:string,
    conf_password:string
}

export interface VerifyCodeFormTypes {
    verify_token:string 
    code:string
}

export interface ResendCodeFormTypes {
    verify_token:string
}

