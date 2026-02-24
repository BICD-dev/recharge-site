export const authUrl = {
    loginUrl:"/auth/login",
    signupUrl:"/auth/register",
    sendCodeUrl:"/auth/send-verification-code",
    verifyCodeUrl:"/auth/verify-code",
    verifyPinUrl:"/auth/verify-pin",
    sendResetPasswordUrl:"/auth/send-reset-password",
    resetPasswordUrl:"/auth/reset-password"
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
    electricityValidateUrl:"/purchase/electricity/verify-meter",
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
    changePasswordUrl:"/user/change-password"

} as const;

export const transactionUrl = {
    getTransactions:"/transactions",
    getTransactionById:(id: number) => `/transactions/${id}`,
    getReceiptPreview:(id: number) => `/transactions/${id}/receipt`,
    downloadReceipt:(id: number) => `/transactions/${id}/receipt/download`,
} as const;