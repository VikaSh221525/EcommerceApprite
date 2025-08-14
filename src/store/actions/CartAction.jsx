import { Databases, ID, Query } from "appwrite";
import { addToCart, loadcart } from "../reducers/CartSlice";
import client from "../../lib/appwrite";

const databases = new Databases(client);

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const CART_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID

export const asyncgetcart = () => async (dispatch, getState) => {
    try {
        const userId = getState().user.currentUser?.$id;
        if (!userId) return;

        const allProducts = getState().product.products;
        if(!allProducts || allProducts.length === 0){
            console.log("Product list is not loaded yet.");
            return;
        }

        const res = await databases.listDocuments(
            DB_ID,
            CART_COLLECTION_ID,
            [Query.equal("userId", userId)]
        )

        const combinedCartItems = res.documents.map(cartItem => {
            const productDetails = allProducts.find(p => p.$id === cartItem.productId);

            return {
                ...productDetails,
                ...cartItem
            }
        }).filter(item => item.title);

        dispatch(loadcart(combinedCartItems));
    } catch (err) {
        console.log("GetCart error: ", err);

    }
}

export const asyncaddtocart = (product) => async (dispatch, getState) => {
    console.log(product);
    
    try {
        const userId = getState().user.currentUser?.$id;
        if (!userId) return;

        const { documents } = await databases.listDocuments(
            DB_ID,
            CART_COLLECTION_ID,
            [
                Query.equal("userId", userId),
                Query.equal("productId", product.$id)
            ]
        );

        if (documents.length > 0) {
            const existingItem = documents[0];
            const newQuantity = existingItem.quantity + 1;
            await databases.updateDocument(
                DB_ID,
                CART_COLLECTION_ID,
                existingItem.$id,
                { quantity: newQuantity }
            );
        } else {
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
        }
        dispatch(asyncgetcart());
    } catch (err) {
        console.log('AddTocart error: ', err);
    }
}

export const asyncremovefromcart = (cartItemId) => async (dispatch, getState) => {
    try {
        await databases.deleteDocument(DB_ID, CART_COLLECTION_ID, cartItemId);
        dispatch(asyncgetcart());
    } catch (err) {
        console.log('RemoveFromCartError: ', err);

    }
}

export const asyncUpdateQuantity = (cartItemId, quantity) => async (dispatch, getState) => {
    try {
        await databases.updateDocument(DB_ID, CART_COLLECTION_ID, cartItemId,
            {
                quantity
            }
        );
        dispatch(asyncgetcart());
    } catch (err) {
        console.log('updateQuantity error: ', err);

    }
}