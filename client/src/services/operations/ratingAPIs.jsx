import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { ratingReviewEndpoints } from "../apis"
import isProduction from "../../utils/logger"

export const getAverageRating = async (course_id) => {
    try {
        const response = await apiConnector("POST", ratingReviewEndpoints.GETRATING_API, { course_id, })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password Updated")
        return response.data.averageRating;
    } catch (error) {
        if (!isProduction()) {
        console.log("Error while fetching Ratings...........", error.message)}
        toast.error("Error while fetching Ratings")
    }
}