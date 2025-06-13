import { configureStore } from "@reduxjs/toolkit";
import wpApi from "../api/wpApi";
import boockingReducer from "./slices/boocking";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    [wpApi.reducerPath]: wpApi.reducer,
    boocking: boockingReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wpApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
