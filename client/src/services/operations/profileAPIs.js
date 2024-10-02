import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import isProduction from "../../utils/logger"

export async function getEnrolledCourses(token) {
    try {
        const response = await apiConnector("GET", profileEndpoints.GETENROLLEDCOURSES_API, null, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Enrolled Courses Fetched Successfully")
        return response
    } catch (error) {
        if (!isProduction()) {
        console.log("ENROLLED COURSES  API ERROR....................", error)}
        toast.error("Could Not fetch enrolled courses")
    }
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", profileEndpoints.GETINSTRUCTORDATA_API, null, {
            Authorization: `Bearer ${token}`
        })
        result = response?.data?.courses
    } catch (error) {
        if (!isProduction()) {
        console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)}
        toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
}