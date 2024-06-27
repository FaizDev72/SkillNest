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