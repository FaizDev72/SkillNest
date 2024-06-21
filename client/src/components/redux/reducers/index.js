
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import cartSlice from '../slice/cartSlice';
import profileSlice from '../slice/profileSlice';

const rootReducers = combineReducers({
    auth: authReducer,
    cart: cartSlice,
    profile: profileSlice,
})

export default rootReducers;