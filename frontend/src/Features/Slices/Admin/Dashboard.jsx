import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Admin/admin";

export const daywiseSubscriptionCount = createAsyncThunk(
  "subscriptionCount",
  async () => {
    try {
      const response = await myAxios.get("/subscriptioncount");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const monthlySubscriptionCount = createAsyncThunk(
  "monthsubscriptionCount",
  async () => {
    try {
      const response = await myAxios.get("/monthly_subscriptioncount");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const totalClientsAndInterviewsCount = createAsyncThunk(
  "totalClientsCount",
  async () => {
    try {
      const response = await myAxios.get("/total_clientcount");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const fullSubscriptionHistory = createAsyncThunk(
  "fullSubscriptionHistory",
  async (comapanyId) => {
    try {
      const response = await myAxios.get(`/full_subscriptionhistory/${comapanyId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  subscriptionCount: {},
  monthlySubscriptionCount: {},
  totalClientCount: {},
  fullSubscriptionHistory: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(daywiseSubscriptionCount.pending, (state) => {})
      .addCase(daywiseSubscriptionCount.fulfilled, (state, action) => {
        state.subscriptionCount = action?.payload?.data;
      })
      .addCase(monthlySubscriptionCount.fulfilled, (state, action) => {
        state.monthlySubscriptionCount = action?.payload?.data;
      })
      .addCase(totalClientsAndInterviewsCount.fulfilled, (state, action) => {
        state.totalClientCount = action?.payload?.data;
      })
      .addCase(fullSubscriptionHistory.fulfilled, (state, action) => {
        console.log(action);
        console.log("action");
        state.fullSubscriptionHistory = action?.payload?.data;
      })
      .addCase(daywiseSubscriptionCount.rejected, (state, action) => {});
  },
});

export default dashboardSlice.reducer;
