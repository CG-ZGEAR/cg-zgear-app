import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from  "../../api/adminAPI"
import {setLoading} from "./userSlice";

const initialState = {
    userDetail: null,
    loading: false,
    error: null,
    success: false,
};
export const userDetails = createAsyncThunk(
    "admin/userDetails",
    async (userId) => {
            const details = await getUserDetails(userId);
            return details;
    }
);


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userDetails.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.userDetail = action.payload;
                state.error = null;
            });

    },
});

export const selectSuccess = (state) => state.admin.success;
export const selectLoading = (state) => state.admin.loading;
export const selectUserDetails = (state) => state.admin.userDetail;


export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoading(getState());
    if (currentValue === isCalled) {
        dispatch(setLoading(true));
    }
};

export default adminSlice.reducer;