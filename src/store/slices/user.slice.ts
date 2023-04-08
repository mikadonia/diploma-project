import { registration } from "./user.actionCreator";
import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BankType, CoinFilterType, Offer } from "../types";
import { useAppSelector } from "src/hooks/useRedux";

type UserState = {
  email: string;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  email: "",
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state, action) => {
        //Loading
        state.loading = true;
      })
      .addCase(
        registration.fulfilled,
        (
          state,
          action: PayloadAction<{
            email: string;
          }>
        ) => {
          //Success
          state.email = action.payload.email;
          state.loading = false;
          state.error = "";
        }
      )
      .addCase(
        registration.rejected,
        (
          state,
          action: PayloadAction<{
            error: string;
          }>
        ) => {
          //Failure
          state.loading = false;
        }
      );
  },
});

export default userSlice.reducer;
