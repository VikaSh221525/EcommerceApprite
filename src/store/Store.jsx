import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import productReducer from './reducers/ProductSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        product: productReducer
    }
})