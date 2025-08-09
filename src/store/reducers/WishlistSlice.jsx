import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("wishlistItems")

const initialState = {
    wishlistItems : saved ? JSON.parse(saved) : [],
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const exists = state.wishlistItems.find(item => item.$id === action.payload.$id);
            if(!exists){
                state.wishlistItems.push(action.payload);
                localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
            }
        },
        removeFromWishlist: (state, action)=>{
            state.wishlistItems = state.wishlistItems.filter(item => item.$id !== action.payload)
            localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
        },
        clearWishlist: (state, action) => {
            state.wishlistItems = [];
            localStorage.removeItem('wishlistItems')
        }
    }
})

export default wishlistSlice.reducer;
export const {addToWishlist, removeFromWishlist, clearWishlist} = wishlistSlice.actions;