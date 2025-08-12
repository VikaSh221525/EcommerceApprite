import axios from "axios"
import { loginuser, logoutuser } from "../reducers/UserSlice";
import { account, databases } from "../../lib/appwrite";
import { Query } from "appwrite";
import { clearCart } from "../reducers/CartSlice";
import { clearWishlist } from "../reducers/WishlistSlice";

const DB_ID = "6894936d0026edd36555";
const COLLECTION_ID = "689495a2000eefa9b1ea";

export const asyncLoginUser = (email, password) => async (dispatch, getState) =>{
    try{

        // await account.deleteSessions();

        await account.createEmailPasswordSession(email,password);

        const user = await account.get();

        const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal("userId", user.$id)
        ])

        const userDoc = response.documents[0];

        const fulluser = {
            ...user,
            ...userDoc
        }

        dispatch(loginuser(fulluser));
        localStorage.setItem("currentUser", JSON.stringify(fulluser))

    }catch(error){
        console.log("login failed :", error);
        
    }
}

export const asyncLogoutUser = () => async (dispatch)=>{
    try{
        await account.deleteSession('current');
        dispatch(logoutuser());
        dispatch(clearCart());
        dispatch(clearWishlist());
        localStorage.removeItem("currentUser");
    }catch(err){
        console.log("logout failed :", err);
    }
}