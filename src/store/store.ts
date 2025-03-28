import { configureStore } from "@reduxjs/toolkit";
import wpApi from "../api/wpApi";

const store = configureStore({
  reducer: {
    [wpApi.reducerPath]: wpApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wpApi.middleware),
});

export default store; 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
