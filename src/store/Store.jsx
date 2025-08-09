import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import productReducer from './reducers/ProductSlice'
import wishlistReducer from './reducers/WishlistSlice'
import cartReducer from './reducers/CartSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        product: productReducer,
        wishlist : wishlistReducer,
        cart : cartReducer
    }
})