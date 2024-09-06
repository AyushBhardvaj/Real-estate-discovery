import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "features/authentication/authApi";
import userReducer from "features/authentication/authSlice";
import profileReducer from "features/profile/profileSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { profileApi } from "features/profile/profileApi";
import { listingApi } from "features/listing/listingApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = combineReducers({
  user: userReducer,
});

//Combine all reducer
const rootReducer = combineReducers({
  persisted: persistReducer(persistConfig, persistedReducer),
  profile: profileReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [listingApi.reducerPath]: listingApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, profileApi.middleware, listingApi.middleware),
});
setupListeners(store.dispatch);

const persistor = persistStore(store);

export { persistor, store };
