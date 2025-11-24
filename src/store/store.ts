import { configureStore } from "@reduxjs/toolkit";
import bountyReducer from "./bountySlice";

export const store = configureStore({
  reducer: {
    bounty: bountyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
