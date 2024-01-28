import {createSlice} from '@reduxjs/toolkit';
import {getBestSellers, getCart} from "./productReducerService";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
        success:false,
        total:0,
    },reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(
                (item) => item._id === action.payload._id
            );
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.products.find(
                (item) => item._id === action.payload._id
            );
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.products.find(
                (item) => item._id === action.payload._id
            );
            if (item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
            }
        },
        deleteItem: (state, action) => {
            state.products = state.products.filter(
                (item) => item._id !== action.payload
            );
        },
        resetCart: (state) => {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
    }
});

export const selectCartItems = state => state.cart.items;
export const {
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
    resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;