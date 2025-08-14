import { databases } from "../../lib/appwrite"
import { loadproduct } from "../reducers/ProductSlice";
import { Query } from "appwrite";
import { removeFromWishlist } from "../reducers/WishlistSlice";


const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PRODUCTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
const WISHLIST_COLLECTION_ID = import.meta.env.VITE_APPWRITE_WISHLIST_COLLECTION_ID

export const asyncloadproducts = ()=> async (dispatch)=>{
    try{
        const response = await databases.listDocuments(
            DB_ID,
            PRODUCTS_COLLECTION_ID
        )
        // console.log('fetched documents :', response.documents);
        dispatch(loadproduct(response.documents))
        
    }catch(err){
        console.log('asyncLoadProduct error :', err);
        
    }
}

export const asyncupdateproduct = (id, data) => async (dispatch, getState) => {
    try{
        await databases.updateDocument(
            DB_ID,
            PRODUCTS_COLLECTION_ID,
            id,
            data
        )

        const updateProduct = getState().product.products.map(product => product.$id === id ? {...product, ...data} : product)
        dispatch(loadproduct(updateProduct))

    }catch(err) {
        console.log('updateProduct error :', err);
    }
}

export const asyncdeleteproduct = (productId) => async (dispatch, getState) =>{
    try{
        await databases.deleteDocument(
            DB_ID,
            PRODUCTS_COLLECTION_ID,
            productId,
        )

        const wishlistEntries = await databases.listDocuments(
            DB_ID,
            WISHLIST_COLLECTION_ID,
            [
                Query.equal("productId", productId)
            ]
        );

        for(const entry of wishlistEntries.documents){
            await databases.deleteDocument(DB_ID, WISHLIST_COLLECTION_ID, entry.$id)
        }

        const deletedProduct = getState().product.products.filter(p => p.$id !== productId);
        dispatch(loadproduct(deletedProduct))
        dispatch(removeFromWishlist(productId))

    }catch(err){
        console.log("AsyncDeleteProductError: ", err);
        
    }
}