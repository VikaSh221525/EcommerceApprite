import { Databases, ID, Query } from "appwrite";
import { addToCart, loadcart } from "../reducers/CartSlice";
import client from "../../lib/appwrite";


const databases = new Databases(client);

const DB_ID = '6894936d0026edd36555';
const CART_COLLECTION_ID = '68949fed0004e146bfcd'

export const asyncgetcart = () => async (dispatch, getState) =>{
    try{
        const userId = getState().user.userData?.$id;
        if(!userId) return;

        const res = await databases.listDocuments(
            DB_ID,
            CART_COLLECTION_ID,
            [Query.equal("userId", userId)]
        )
        dispatch(loadcart(res.documents));
    }catch(err) {
        console.log("GetCart error: ", err);
        
    }
}

export const asyncaddtocart = (product) => async (dispatch, getState) =>{
    try{
        const userId = getState().user.currentUser?.$id;
        if(!userId) return;
        
        await databases.createDocument(
            DB_ID,
            CART_COLLECTION_ID,
            ID.unique(),
            {
                productId: product.$id,
                userId,
                price: product.price,
                quantity: 1
            }
        );

        dispatch(asyncgetcart());
    }catch(err){
        console.log('AddTocart error: ', err);
    }
}

export const asyncremovefromcart = (cartItemId) => async (dispatch, getState) => {
    try{
        await databases.deleteDocument(DB_ID, CART_COLLECTION_ID, cartItemId);
        dispatch(asyncgetcart());
    }catch(err) {
        console.log('RemoveFromCartError: ', err);
        
    }
}

export const asyncUpdateQuantity = (cartItemId, quantity) => async (dispatch, getState) =>{
    try{
        await databases.updateDocument(DB_ID, CART_COLLECTION_ID, cartItemId,
            {
                quantity
            }
        );
        dispatch(asyncgetcart());
    }catch(err){
        console.log('updateQuantity error: ', err);
        
    }
}