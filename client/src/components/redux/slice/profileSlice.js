import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser(state, action) {
            const userData = action.payload;
            state.user = userData;
            if (userData) {
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                localStorage.removeItem('user');
            }
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const { setUser, setLoading } = profileSlice.actions
export default profileSlice.reducer;