import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { settingEndpoints } from "../apis";
import { logout } from './authAPIs'
import { setUser } from "../../components/redux/slice/profileSlice";
import isProduction from "../../utils/logger";

export function updateDisplayPicture(formData, token) {
    return async (dispatch) => {
        const toast_id = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", settingEndpoints.UPDATEPROFILEPICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        } catch (error) {
            if (!isProduction()) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR.............", error)}
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toast_id);
    }
}

export function updateProfile(token, data) {
    return async (dispatch) => {
        const toast_id = toast.loading();
        try {
            const response = await apiConnector("PUT", settingEndpoints.UPDATEPROFILIE_API, data, {
                Authorization: `Bearer ${token}`,
            });

            if (!response || !response.data) {
                throw new Error("Invalid response from the API");
            }

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile Info Updated Successfully");
            dispatch(setUser(response.data.data));
        } catch (error) {
            if (!isProduction()) {
            console.log("UPDATE_PROFILE_INFO_API API ERROR.............", error.message);}
            toast.error("Could Not Update Profile Info");
        }
        toast.dismiss(toast_id);
    };
}

export async function changePassword(data, token) {
    const toast_id = toast.loading('Loading...')
    try {
        const response = await apiConnector("POST", settingEndpoints.CHANGEPASSWORD_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if (!response || !response.data) {
            throw new Error("Invalid response from the API");
        }

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password Changed Successfully");
    } catch (error) {
        if (!isProduction()) {
        console.log("PASSWORD_CHANGED_API API ERROR.............", error.message);}
        toast.error("Could Not Change Password");
    }
    toast.dismiss(toast_id);

}

export function deleteUserAccount(token, navigate) {
    return async (dispatch) => {
        const toast_id = toast.loading("Loading...");
        try {
            const response = await apiConnector("DELETE", settingEndpoints.DELETEPROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            if (!isProduction()) {
            console.log("DELETE_PROFILE_API API ERROR....................", error)}
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toast_id);
    }
}