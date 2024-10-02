import toast from 'react-hot-toast'
import { categoriesApi, coursesEndpoints } from '../apis'
import { apiConnector } from '../apiConnector'
import isProduction from '../../utils/logger'

export const fetchCourseDetails = async (course_id) => {
    try {
        const response = await apiConnector("POST", coursesEndpoints.GETCOURSE_API, { course_id, })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        if (!isProduction()) {
        console.log("Failed to Fetch Course Details...........", error.data.message)
        }
        toast.error("Failed to Fetch Details")
    }
}

export const fetchInstructorCourses = async (token) => {
    const toast_id = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", coursesEndpoints.GETINSTRUCTORCOUSES_API, null, {
            Authorization: `Bearer ${token}`
        });
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // toast.success("Instructor Courses Fetched Successfully")
        toast.dismiss(toast_id)
        return response?.data?.data;
    } catch (error) {
        if (!isProduction()) {
        console.log("Failed to Fetch Instructor Course ...........", error.message)}
        toast.error("Failed to Instructor Course")
    }

}

export async function fetchCourseCategories() {
    try {
        const response = await apiConnector("GET", categoriesApi.GETALLCATEGORIES_API);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response;
    } catch (error) {
        if (!isProduction()) {
        console.log("Failed to Fetch Course Categories...........", error.message)}
    }
}

// Create Course
export const addCourseDetails = async (formData, token) => {
    let toast_id = toast.loading("Loading...")
    try {
        let response = await apiConnector("POST", coursesEndpoints.CREATECOURSE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.dismiss(toast_id);
        toast.success('Successfully Created Course')
        return response;
    } catch (error) {
        toast.error("Failed to Create Course")
        if (!isProduction()) {
        console.log("Failed to Create Course...........", error.message)}
    }
    toast.dismiss(toast_id);
}

// Create Section
export async function createSection(data, token) {
    let toast_id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", coursesEndpoints.CREATESECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.dismiss(toast_id);
        toast.success('Successfully Created Section')
        return response?.data?.data
    } catch (error) {
        toast.error("Failed to Create Section")
        if (!isProduction()) {
        console.log("Failed to Create Section...........", error.message)}
    }
    toast.dismiss(toast_id)
}

// create sub section
export async function createSubSection(data, token) {
    let toast_id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", coursesEndpoints.CREATESUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.dismiss(toast_id)
        toast.success("Lecture Added")
        return response?.data?.data
    } catch (error) {
        if (!isProduction()) {
        console.log("CREATE SUB-SECTION API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id)
}

export async function updateSubSection(data, token) {
    let toast_id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", coursesEndpoints.UPDATESUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not update Lecture")
        }
        toast.dismiss(toast_id)
        toast.success("Lecture Updated")
        return response?.data?.data
    } catch (error) {
        if (!isProduction()) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id)
}

export async function deleteSubSection(data, token) {
    let toast_id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", coursesEndpoints.DELETESUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture")
        }
        toast.dismiss(toast_id)
        toast.success("Lecture Deleted")
        return response?.data?.data
    } catch (error) {
        if (!isProduction()) {
        console.log("DELETE SUB-SECTION API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id)
}

export async function updateSection(data, token) {
    let toast_id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", coursesEndpoints.UPDATESECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not update Lecture")
        }
        toast.dismiss(toast_id)
        toast.success("Lecture Updated")
        return response?.data?.data
    } catch (error) {
        if (!isProduction()) {
        console.log("UPDATE SECTION API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id)
}

export async function deleteSection(data, token) {
    let toast_id = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", coursesEndpoints.DELETESECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section")
        }
        toast.dismiss(toast_id)
        toast.success("Section Deleted")
        return response?.data?.data
    } catch (error) {
        if (!isProduction()) {
        console.log("DELETE SECTION API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id)
}

export async function updateCourse(data, token) {
    let toast_id = toast.loading("Loading...");
    let result;
    try {
        const response = await apiConnector("POST", coursesEndpoints.UPDATECOURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        if (!isProduction()) {
        console.log("UPDATE SECTION API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id)
    return result;
}

export async function getFullCourseDetails(course_id, token) {
    const toast_id = toast.loading(true);
    let result;
    try {
        let response = await apiConnector("POST", coursesEndpoints.GETFULLCOURSEDETAILS_API, { course_id, }, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toast_id)
    return result;
}

export async function deleteCourse(course_id, token) {
    let toast_id = toast.loading("Loading...")
    try {
        let response = await apiConnector("DElETE", coursesEndpoints.DELETECOURSE_API, { course_id }, {
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }
        toast.success("Course Deleted")
    } catch (error) {
        if (!isProduction()) {
        console.log("DELETE COURSE API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id);
}

export async function makeLectureAsCompleted(data, token) {
    let toast_id = toast.loading('Loading...');
    let result;
    try {
        const response = await apiConnector('POST', coursesEndpoints.LECTURE_COMPLETED_API, data, {
            Authorization: `Bearer ${token}`
        })


        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = true
    } catch (error) {
        if (!isProduction()) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)}
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toast_id)
    return result
}

export async function createRating(data, token) {
    const toast_id = toast.loading('Loading...')
    let success = false
    try {
        const response = await apiConnector("POST", coursesEndpoints.CREATERATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        if (!isProduction()) {
        console.log("CREATE RATING API ERROR............", error)}
        toast.error(error.message)
    }
    toast.dismiss(toast_id);
    return success;
}