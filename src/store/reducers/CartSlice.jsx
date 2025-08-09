import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || []
};

const saveToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadcart: (state, action) => {
            state.cartItems = action.payload
            saveToLocalStorage(state.cartItems);
        },
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i.id === item.id);

            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.cartItems.push({...item, quantity:1});
            }
            saveToLocalStorage(state.cartItems);
        },
        removeFromCart: (state, action)=>{
            state.cartItems =  state.cartItems.filter(i => i.id !== action.payload);
            saveToLocalStorage(state.cartItems)
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if(item){
                item.quantity += 1;
            }
            saveToLocalStorage(state.cartItems);
        },
        decreaseQty : (state, action)=>{
            const item = state.cartItems.find(i => i.id === action.payload);
            if(item && item.quantity > 1){
                item.quantity -= 1;
            }
            saveToLocalStorage(state.cartItems)
        },
        clearCart : (state, action) => {
            state.cartItems = [];
            saveToLocalStorage([])
        }

    }
})

export default cartSlice.reducer;
export const {loadcart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart} = cartSlice.actions;