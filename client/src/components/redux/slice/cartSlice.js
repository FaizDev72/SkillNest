import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if (index >= 0) {
                toast.error("Course Already in the Cart")
                return
            }
            state.cart.push(course);
            state.totalAmount += course.price;
            state.totalItems++;

            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount))
            localStorage.setItem('totalItems', JSON.stringify(state.totalItems))

            toast.success("Item Added to Cart")
        },

        // Remove Item from Cart
        removeItemFromCart: (state, action) => {
            const course_id = action.payload;
            const index = state.cart.findIndex((item) => item._id === course_id);

            if (index >= 0) {
                state.cart.splice(index, 1)
                state.totalAmount -= state.cart[index]?.price;
                state.totalItems--;

                localStorage.setItem('cart', JSON.stringify(state.cart))
                localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount))
                localStorage.setItem('totalItems', JSON.stringify(state.totalItems))
                toast.success("Course removed from cart")
            }
        },

        resetCart: (state) => {
            state.cart = []
            state.totalAmount = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("totalAmount")
            localStorage.removeItem("totalItems")
        },

    }
})

export const { setTotalItems, removeItemFromCart, resetCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;