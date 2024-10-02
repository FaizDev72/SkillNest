import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authApi } from "../apis"
import { setLoading, setToken } from '../../components/redux/slice/authSlice'
import { setUser } from "../../components/redux/slice/profileSlice"
import { resetCart } from "../../components/redux/slice/cartSlice"
import isProduction from "../../utils/logger"

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", authApi.SENDOTP_API, { email })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate('/verify-email')
        } catch (error) {
            if (!isProduction()) {
            console.log("SENDOTP_API API ERROR...........", error.message)
            }
            if (error.response && error.response.status === 409) {
                toast.error("Email is already registered.")
            } else {
                toast.error("Could Not Send OTP")
            }
        }
        dispatch(setLoading(false))
    }
}

export function signUp(first_name, last_name, email, password, confirm_password, account_type, navigate, otp) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", authApi.SIGNUP_API, { first_name, last_name, email, confirm_password, password, account_type, otp, })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("User Signed in successfully")
            navigate('/login')
        } catch (error) {
            if (!isProduction()) {
            console.log("Signedup Failed...........", error.message)
            }
            toast.error("Failed to signup")
        }
        dispatch(setLoading(false))
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", authApi.LOGIN_API, { email, password, })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("User Loged in successfully")
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/dashboard/my-profile')
        } catch (error) {
            if (!isProduction()) {
            console.log("Login Failed...........", error.message)
            }
            toast.error("Failed to login")
        }
        dispatch(setLoading(false))
    }
}

export function getTokenForPasswordReset(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {

            const response = await apiConnector("POST", authApi.RESETPASSTOKEN_API, { email, })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Reset Password Main Sent")
            setEmailSent(true)
        } catch (error) {
            if (!isProduction()) {
            console.log("Failed to Generate Token...........", error.message)
            }
            toast.error("Failed to Generate Token")
        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(token, password, confirm_password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", authApi.RESETPASSWORD_API, { token, password, confirm_password })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Updated")
            navigate('/login')
        } catch (error) {
            if (!isProduction()) {
            console.log("Failed to update password...........", error.message)
            }
            toast.error("Failed to update password")
        }
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate('/')
    }
}