import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefault) => getDefault().concat([authAPI.middleware]),
});
setupListeners(store.dispatch);

export default store;
