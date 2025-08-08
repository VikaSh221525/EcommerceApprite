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