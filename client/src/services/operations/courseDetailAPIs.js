import toast from 'react-hot-toast'
import { coursesEndpoints } from '../apis'
import { apiConnector } from '../apiConnector'

export const fetchCourseDetails = async (course_id) => {
    try {
        console.log(course_id, coursesEndpoints.GETCOURSE_API)
        const response = await apiConnector("POST", coursesEndpoints.GETCOURSE_API, { course_id, })
        console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        console.log("Failed to Fetch Course Details...........", error.data.message)
        toast.error("Failed to Fetch Details")
    }
}