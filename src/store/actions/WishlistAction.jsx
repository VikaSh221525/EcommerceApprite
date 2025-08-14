import { ID, Query } from "appwrite";
import { databases } from "../../lib/appwrite";
import { addToWishlist, removeFromWishlist } from "../reducers/WishlistSlice";

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const WISHLIST_COLLECTION_ID = import.meta.env.VITE_APPWRITE_WISHLIST_COLLECTION_ID;

export const asyncAddToWishlist = (product, userId) => async (dispatch, getState) =>{
    try{
        const res = await databases.listDocuments(DB_ID, WISHLIST_COLLECTION_ID, [
            Query.equal("userId", userId),
            Query.equal("productId", product.$id)
        ])

        if(res.total === 0){
            await databases.createDocument(DB_ID, WISHLIST_COLLECTION_ID, ID.unique(), {
                userId,
                productId: product.$id,
            })
            dispatch(addToWishlist(product))
        }

    }catch(err){
        console.log("AddToWishList error: ", err);
        
    }
}

export const asyncGetWishlist = (userId) => async (dispatch, getState) =>{
    try{
        const res = await databases.listDocuments(DB_ID, WISHLIST_COLLECTION_ID, [
            Query.equal('userId', userId)
        ])
        const products = res.documents.map(doc => doc.product);
        products.forEach((product)=> dispatch(addToWishlist(product)))

    }catch(err){
        console.log('GetWishlist Error: ', err);
        
    }
}

export const asyncRemoveFromWishlist = (productId, userId) => async (dispatch, getState)=>{
    try{
        const res = await databases.listDocuments(DB_ID, WISHLIST_COLLECTION_ID,[
            Query.equal("userId", userId),
            Query.equal("productId", productId)
        ]);
        if(res.total > 0){
            const docId = res.documents[0].$id;
            await databases.deleteDocument(DB_ID, WISHLIST_COLLECTION_ID, docId);
        }
        dispatch(removeFromWishlist(productId))

    }catch(err){
        console.log('RemoveWishlist Error: ', err);
        
    }
}