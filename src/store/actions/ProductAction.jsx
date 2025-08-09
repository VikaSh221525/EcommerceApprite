import { data } from "react-router-dom";
import { databases } from "../../lib/appwrite"
import { loadproduct } from "../reducers/ProductSlice";
import { Query } from "appwrite";
import { removeFromWishlist } from "../reducers/WishlistSlice";


export const asyncloadproducts = ()=> async (dispatch)=>{
    try{
        const response = await databases.listDocuments(
            '6894936d0026edd36555',
            '6895ecfa002da8cd9fd6'
        )
        console.log('fetched documents :', response.documents);
        dispatch(loadproduct(response.documents))
        
    }catch(err){
        console.log('asyncLoadProduct error :', err);
        
    }
}

export const asyncupdateproduct = (id, data) => async (dispatch, getState) => {
    try{
        await databases.updateDocument(
            '6894936d0026edd36555',
            '6895ecfa002da8cd9fd6',
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
            '6894936d0026edd36555',
            '6895ecfa002da8cd9fd6',
            productId,
        )

        const wishlistEntries = await databases.listDocuments(
            '6894936d0026edd36555',
            '689654eb002235267487',
            [
                Query.equal("productId", productId)
            ]
        );

        for(const entry of wishlistEntries.documents){
            await databases.deleteDocument('6894936d0026edd36555', '689654eb002235267487', entry.$id)
        }

        const deletedProduct = getState().product.products.filter(p => p.$id !== productId);
        dispatch(loadproduct(deletedProduct))
        dispatch(removeFromWishlist(productId))

    }catch(err){
        console.log("AsyncDeleteProductError: ", err);
        
    }
}