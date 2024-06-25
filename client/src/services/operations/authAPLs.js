import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authApi } from "../apis"
import { setLoading, setToken } from '../../components/redux/slice/authSlice'
import { setUser } from "../../components/redux/slice/profileSlice"

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            console.log(authApi, email)
            const response = await apiConnector("POST", authApi.SENDOTP, { email })
            console.log(response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate('/verify-email')
        } catch (error) {
            console.log("SENDOTP API ERROR...........", error.message)
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
            console.log("Print api ", first_name, last_name, email, password, account_type, otp, confirm_password)
            const response = await apiConnector("POST", authApi.SIGNUP, { first_name, last_name, email, confirm_password, password, account_type, otp, })
            console.log(response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("User Signed in successfully")
            navigate('/login')
        } catch (error) {
            console.log("Signedup Failed...........", error.message)
            toast.error("Failed to signup")
        }
        dispatch(setLoading(false))
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        try {
            console.log(email, password)
            const response = await apiConnector("POST", authApi.LOGIN, { email, password, })
            console.log(response)
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
            console.log("Login Failed...........", error.message)
            toast.error("Failed to signup")
        }
    }
}