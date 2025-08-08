import { databases } from "../../lib/appwrite"
import { loadproduct } from "../reducers/ProductSlice";


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