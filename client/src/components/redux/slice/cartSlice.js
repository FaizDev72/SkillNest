import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // total items
        setTotalItems(state, value) {
            state.totalItems = value.payload;
        }

        // add to cart
        // update cart
        // delete cart
    }
})

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;