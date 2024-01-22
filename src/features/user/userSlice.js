import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  getActiveUsers,
  getDeletedUsers,
  getRegisterUser,
  lockUserAccount,
  unlockUserAccount,
} from "../../api/userAPI";

const initialState = {
  users: null,
  deletedUsers: null,
  loading: false,
  error: null,
  success: false,
  loginSuccess: false,
  activeUsersList: null,
};

export const activeUsers = createAsyncThunk(
    "activeUsers",
    async ({ currentPage }) => {
      const users = await getActiveUsers(currentPage);
       return users;
    }
);

export const fetchDeletedUsers = createAsyncThunk(
    "fetchDeletedUsers",
    async({ currentPage }) => {
      try {
        const deletedUsers = await getDeletedUsers(currentPage);
        return deletedUsers;
      } catch (error) {
        console.error("Get deleted users error:", error);
        throw error;
      }
    }
);

export const lockUser = createAsyncThunk("user/lockUser", async (userId) => {
  try {
    const response = await lockUserAccount(userId);
    return response;
  } catch (error) {
    console.error("Lock user account error:", error);
    throw error;
  }
});

export const unlockUser = createAsyncThunk(
    "user/unlockUser",
    async (userId) => {
      try {
        const response = await unlockUserAccount(userId);
        return response;
      } catch (error) {
        console.error("Unlock user account error:", error);
        throw error;
      }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId) => {
      try {
        const response = await getDeletedUsers(userId);
        return response;
      } catch (error) {
        console.error("Delete user error:", error);
        throw error;
      }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userDTO) => {
      try {
        const response = await getRegisterUser(userDTO);
        return response;
      } catch (error) {
        console.error("Register user error:", error);
        throw error;
      }
    }
);



const userSlice = createSlice({
  name: "user",
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
        .addCase(activeUsers.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = null;
        })
        .addCase(activeUsers.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(activeUsers.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.activeUsersList = action.payload;
          state.error = null;
        })

        .addCase(fetchDeletedUsers.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDeletedUsers.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(fetchDeletedUsers.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.fetchDeletedUsers = action.payload;
          state.error = null;
        })

        .addCase(lockUser.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = null;
        })
        .addCase(lockUser.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(lockUser.fulfilled, (state) => {
          state.success = true;
          state.loading = false;
          state.error = null;
        })

        .addCase(unlockUser.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = null;
        })
        .addCase(unlockUser.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(unlockUser.fulfilled, (state) => {
          state.success = true;
          state.loading = false;
          state.error = null;
        })

        .addCase(deleteUser.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.value = action.payload;
          state.error = false;
        })

        .addCase(registerUser.pending, (state) => {
          state.success = false;
          state.loading = true;
          state.error = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.success = false;
          state.loading = false;
          state.error = action.error;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.success = true;
          state.loading = false;
          state.value = action.payload;
          state.error = false;
        })
  },
});

export const { setLoading, setError, setSuccess } = userSlice.actions;

export const selectUsersList = (state) => state.user.activeUsersList;
export const selectDeletedUsersList = (state) => state.user.fetchDeletedUsers;
export const selectLoginSuccess = (state) => state.user.loginSuccess;
export default userSlice.reducer;
