import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import header from "../../components/home/Header/Header";

const initialState = {
    items: [],
    loading: false,
    error: null,
    pageCount: 0,
};
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, size }) => {
        const response = await axios.get(
            `http://localhost:8080/api/products?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtbHVja2NvY2swIiwiaWF0IjoxNzA0MzU1Njc5LCJleHAiOjE3MDQ5NjA0Nzl9.J89XH5R2nCXulQTHYl6mVciTpk4vaag1HVD4QeCWjYHvIH7wsCodVrhfEJXmrJX29xQvyXwl36qTy90bHvo2kQ'
                }
            }
        );

        return response.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.content;
                state.pageCount = action.payload.totalPages;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
