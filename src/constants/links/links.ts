export const authUrl = {
    loginUrl:"/auth/login",
    signupUrl:"/auth/register",
    sendCodeUrl:"/auth/send-verification-code",
    verifyCodeUrl:"/auth/verify-code",
} as const;

console.log("Module Name:", name);
export const walletUrl = {
    fundUrl:"/wallet/fund",
    balanceUrl:"/wallet"
} as const;

export const vtPassUrl = {
    airtimeUrl:"/purchase/airtime/buy",
    dataUrl:"/purchase/data/buy",
    cableUrl:"/purchase/cable/buy",
    electricityUrl:"/purchase/electricity/buy",
    electricityValidateUrl:"/purchase/electricity/validate",
    waecPinUrl:"/purchase/education/waec/buy",
    jambPinUrl:"/purchase/education/jamb/buy",
    jambValidationUrl:"/purchase/education/jamb/validate",
    queryServiceUrl:"/purchase/query-service",
} as const;