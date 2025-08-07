import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginuser: (state, action) => {
            state.currentUser = action.payload
        },
        logoutuser: (state, action) => {
            state.currentUser = null;
        }
    }
})

export default userSlice.reducer;
export const {loginuser, logoutuser} = userSlice.actions; 