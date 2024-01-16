import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import zgearReducer from "./zgearSlice";
import userReducer from "../features/user/userSlice"
import productReducer from "../features/product/productReducer";
import adminReducer from "../features/user/adminSilce"
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, zgearReducer);

export const store = configureStore({
  reducer: {
    zgearReducer: persistedReducer,
    products: productReducer,
    user: userReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export let persistor = persistStore(store);
