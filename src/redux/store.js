import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";

export default configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
