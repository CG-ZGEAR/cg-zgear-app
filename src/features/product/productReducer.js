import { createSlice } from '@reduxjs/toolkit';
import {
    addProduct,
    editProduct,
    getProduct,
    getProducts,
    removeProduct,
    getProductByName,
    getProductsByCategory
} from "./productReducerService";

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.success = true;
                state.values = action.payload;
                state.error = false;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.success = true;
                state.values = action.payload;
                state.error = false;
            })
            .addCase(getProductByName.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getProductByName.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = false;
            })

            .addCase(addProduct.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = false;
            })

            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = false;

            })

            .addCase(editProduct.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = false;
            })

            .addCase(removeProduct.rejected, (state, action) => {
                state.success = false;
                state.error = action.error;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.success = true;
                state.value = action.payload;
                state.error = false;
            });
    },
});


export const productListSelector = (state) => state.products.values;
export const isLoadingSelector = (state) => state.products.loading;
export const productSelector = (state) => state.products.value;
export const productAddedSelector = (state) => state.products.value;
export const productEditedSelector = (state) => state.products.value;
export const productRemovedSelector = (state) => state.products.value;

export default productSlice.reducer;
