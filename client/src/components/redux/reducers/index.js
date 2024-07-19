
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import cartSlice from '../slice/cartSlice';
import profileSlice from '../slice/profileSlice';
import courseSlice from '../slice/courseSlice';
import viewCourseSlice from '../slice/viewCourse';

const rootReducers = combineReducers({
    auth: authReducer,
    cart: cartSlice,
    profile: profileSlice,
    course: courseSlice,
    viewCourse: viewCourseSlice
})

export default rootReducers;