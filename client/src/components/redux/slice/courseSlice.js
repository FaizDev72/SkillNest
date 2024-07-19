import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,
    editCourse: false,
    course: null,
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        resetCourseState: (state) => {
            state.course = null;
            state.editCourse = false;
            state.step = 1;

        }
    }
})

export const { setCourse, setEditCourse, setStep, resetCourseState } = courseSlice.actions;
export default courseSlice.reducer
