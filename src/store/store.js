import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Auth/authslice" // In this case we use { } because we not do export default only do export
import singledetails from "../ProductPages/productapi"

export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer, // Reducer for Auth 
        Single: singledetails // Reducer For Single Product for to show single product image
    },
});