import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { settingEndpoints } from "../apis";
import { logout } from './authAPIs'
import { setUser } from "../../components/redux/slice/profileSlice";

export function updateDisplayPicture(formData, token) {
    return async (dispatch) => {
        const toast_id = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", settingEndpoints.UPDATEPROFILEPICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_DISPLAY_PICTURE_API  RESPONSE....", response.data.data)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR.............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toast_id);
    }
}

export function updateProfile(token, data) {
    console.log("Token->>>>> ", token);
    console.log("Data->>>>> ", data);
    return async (dispatch) => {
        const toast_id = toast.loading();
        try {
            const response = await apiConnector("PUT", settingEndpoints.UPDATEPROFILIE_API, data, {
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_PROFILE_INFO_API RESPONSE....", response);

            if (!response || !response.data) {
                throw new Error("Invalid response from the API");
            }

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile Info Updated Successfully");
            dispatch(setUser(response.data.data));
        } catch (error) {
            console.log("UPDATE_PROFILE_INFO_API API ERROR.............", error.message);
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
        console.log("CHANGE_PASSWORD RESPONSE....", response);

        if (!response || !response.data) {
            throw new Error("Invalid response from the API");
        }

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password Changed Successfully");
    } catch (error) {
        console.log("PASSWORD_CHANGED_API API ERROR.............", error.message);
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
            console.log("DELETE_PROFILE_API RESPONSE................", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR....................", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toast_id);
    }
}