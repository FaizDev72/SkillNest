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
    GETCOURSE_API: BASE_URL + '/course/getCourseDetails',
    GETINSTRUCTORCOUSES_API: BASE_URL + '/course/getInstructorCourses',
    CREATECOURSE_API: BASE_URL + '/course/createCourse',
    UPDATECOURSE_API: BASE_URL + '/course/updateCourse',
    DELETECOURSE_API: BASE_URL + '/course/deleteCourse',
    CREATESECTION_API: BASE_URL + '/course/createSection',
    CREATESUBSECTION_API: BASE_URL + '/course/createSubSection',
    UPDATESUBSECTION_API: BASE_URL + '/course/updateSubSection',
    UPDATESECTION_API: BASE_URL + '/course/updateSection',
    DELETESUBSECTION_API: BASE_URL + '/course/deleteSubSection',
    DELETESECTION_API: BASE_URL + '/course/deleteSection',
    GETFULLCOURSEDETAILS_API: BASE_URL + '/course/getFullCourseDetails',
    LECTURE_COMPLETED_API: BASE_URL + '/course/updateCourseProgress',
    CREATERATING_API: BASE_URL + '/course/createRating'
}

export const ratingReviewEndpoints = {
    GETRATING_API: BASE_URL + '/course/getAverageRating'
}

// Payment Apis
export const paymentsEndpoints = {
    CAPTUREPAYMENT_API: BASE_URL + '/payment/capturePayment',
    VERIFYSIGNATURE_API: BASE_URL + '/payment/verifySignature',
    PAYMENTSUCCESSEMAIL_API: BASE_URL + '/payment/paymentSuccessEmail',
}

// Profile Apis
export const profileEndpoints = {
    GETENROLLEDCOURSES_API: BASE_URL + '/profile/getEnrolledCourses',
    GETINSTRUCTORDATA_API: BASE_URL + '/profile/instructorDashboard'
}
export const settingEndpoints = {
    UPDATEPROFILEPICTURE_API: BASE_URL + '/profile/updateDisplayPicture',
    UPDATEPROFILIE_API: BASE_URL + '/profile/updateProfile',
    CHANGEPASSWORD_API: BASE_URL + '/auth/changepassword',
    DELETEPROFILE_API: BASE_URL + '/profile/deleteProfile'
}

