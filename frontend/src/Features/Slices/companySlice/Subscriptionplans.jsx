import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import plansapi from "../../../api/company/addRequestSlice.api"

export const FullPlans = createAsyncThunk("getallPlans", async () => {
  try {
    const response = await plansapi.get("/plans");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  plans:{}
};

const gePlanSlice = createSlice({
  name: "planDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FullPlans.pending, (state, action) => {});


    builder.addCase(FullPlans.fulfilled, (state, action) => {
      console.log(action);
      console.log('action');
      state.plans = action.payload?.data?.fullPlans
    });
    builder.addCase(FullPlans.rejected, (state, action) => {});
  },
});

export default gePlanSlice.reducer;
