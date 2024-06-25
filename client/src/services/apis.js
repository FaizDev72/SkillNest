const BASE_URL = process.env.REACT_APP_BASE_URL

export const categoriesApi = {
    GETALLCATEGORIES_API: BASE_URL + '/course/showAllCategories',
    GETCATEGORYBYID: BASE_URL + '/course/getCategoryPageDetails' 
}


export const authApi = {
   SENDOTP : BASE_URL + '/auth/sendotp', 
   SIGNUP: BASE_URL + '/auth/signup',
   LOGIN: BASE_URL + '/auth/login'
}