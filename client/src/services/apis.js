const BASE_URL = process.env.REACT_APP_BASE_URL

export const categoriesApi = {
    GETALLCATEGORIES_API: BASE_URL + '/course/showAllCategories',
    GETCATEGORYBYID: BASE_URL + '/course/getCategoryPageDetails'
}


export const authApi = {
    SENDOTP_API: BASE_URL + '/auth/sendotp',
    SIGNUP_API: BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login',
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const coursesEndpoints = {
    GETCOURSE_API: BASE_URL + '/course/getCourseDetails'
}

export const ratingReviewEndpoints = {
    GETRATING_API: BASE_URL + '/course/getAverageRating'
}

// Payment Apis
export const paymentsEndpoints = {
    CAPTUREPAYMENT_API: BASE_URL + '/payment/capturePayment',
    VERIFYSIGNATURE_API: BASE_URL + '/payment/verifySignature',
    PAYMENTSUCCESSEMAIL_API: BASE_URL + '/payment/paymentSuccessEmail'
}

// Profile Apis
export const profileEndpoints = {
}
export const settingEndpoints = {
    UPDATEPROFILEPICTURE_API: BASE_URL + '/profile/updateDisplayPicture',
    UPDATEPROFILIE_API: BASE_URL + '/profile/updateProfile',
    CHANGEPASSWORD_API: BASE_URL + '/auth/changepassword',
    DELETEPROFILE_API: BASE_URL + '/profile/deleteProfile'
}

