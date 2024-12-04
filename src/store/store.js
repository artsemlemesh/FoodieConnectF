import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import cartReducer from '../features/cartSlice'
import productReducer from '../features/productSlice'
import orderReducer from '../features/orderSlice'

import authMiddleware from "../middleware/authMiddleware";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        orders: orderReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware), 

})


export default store