export const authUrl = {
    loginUrl:"/auth/login",
    signupUrl:"/auth/register",
    sendCodeUrl:"/auth/send-verification-code",
    verifyCodeUrl:"/auth/verify-code",
    verifyPinUrl:"/auth/verify-pin",
} as const;

export const walletUrl = {
    fundUrl:"/wallet/fund",
    balanceUrl:"/wallet"
} as const;

export const vtPassUrl = {
    airtimeUrl:"/purchase/airtime",
    dataUrl:"/purchase/data",
    cableUrl:"/purchase/cable-tv",
    electricityUrl:"/purchase/electricity",
    electricityValidateUrl:"/purchase/electricity/validate",
    waecPinUrl:"/purchase/education/waec-reg",
    jambPinUrl:"/purchase/education/jamb/buy",
    jambValidationUrl:"/purchase/education/jamb/validate",
    queryServiceUrl:"/purchase/query-service",
    cableValidateUrl:"/purchase/cable-tv/validate",
    variationsUrl:"/purchase/variations",
} as const;

export const userUrl = {
    getUser:"/user/me",
    setPinUrl:"/user/set-pin",
    onboardUrl:"/user/onboard",
} as const;