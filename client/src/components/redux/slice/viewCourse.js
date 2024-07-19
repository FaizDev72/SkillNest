import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCourseData: [],
    courseSectionData: [],
    completedLectures: [],
    totalNoOfLectures: 0
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setCurrentCourseData: (state, action) => {
            state.currentCourseData = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        },
        updatedCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        }
    }
})

export const { setCourseSectionData, setCurrentCourseData, setCompletedLectures, setTotalNoOfLectures, updatedCompletedLectures } = viewCourseSlice.actions

export default viewCourseSlice.reducer;