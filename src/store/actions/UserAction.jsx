import axios from "axios"
import { loginuser, logoutuser } from "../reducers/UserSlice";
import { account } from "../../lib/appwrite";

export const asyncLoginUser = (email, password) => async (dispatch, getState) =>{
    try{

        // await account.deleteSessions();

        await account.createEmailPasswordSession(email,password);

        const user = await account.get();

        dispatch(loginuser(user));
        localStorage.setItem("currentUser", JSON.stringify(user))
    }catch(error){
        console.log("login failed :", error);
        
    }
}

export const asyncLogoutUser = () => async (dispatch)=>{
    try{
        await account.deleteSession('current');
        dispatch(logoutuser());
        localStorage.removeItem("currentUser");
    }catch(err){
        console.log("logout failed :", err);
    }
}