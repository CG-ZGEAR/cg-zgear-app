import {
    createProduct,
    deleteProduct,
    findProduct,
    findProducts,
    updateProduct,
} from "../../api/productAPI";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("product/list", async ({page, size}) => {
    const response = await findProducts(page, size);
    return response.data;
});

export const getProduct = createAsyncThunk("product/detail", async (productId) => {
    const response = await findProduct(productId);
    return response.data;
});

export const addProduct = createAsyncThunk("product/create", async (product) => {
    const response = await createProduct(product);
    return response.data;
});

export const editProduct = createAsyncThunk("product/edit", async (product) => {
    const response = await updateProduct(product);
    return response.data;
});

export const removeProduct = createAsyncThunk("product/remove", async (productId) => {
    const response = await deleteProduct(productId);
    return response.data;
});
