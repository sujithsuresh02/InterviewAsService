import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "../../../api/company/addRequestSlice.api";

export const createSubscriptions = createAsyncThunk(
  "createsubscriptio",
  async (packs) => {
    try {
      console.log(packs,"slice first");
      const response = await myAxios.post("/create-paypal-subscription",packs);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const onApproveOrder = createAsyncThunk(
  "onApproveOrder",
  async (orderId) => {
    try {
      const response = await myAxios.get(`/capture-paypal-subscription/${orderId}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

 const initialState={
    orderId:{},
    orderVerfication:{}
 }
const paypalSlice = createSlice({
  name: "Subscription",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(createSubscriptions.pending, (state) => {});
    builder.addCase(createSubscriptions.fulfilled, (state,action) => {
      console.log(action, "action create order packkk");
      state.orderId=action?.payload?.data});
    builder.addCase(onApproveOrder.fulfilled, (state,action) => {
      console.log(action,"second action");
     state.orderVerfication=action?.payload?.data
    });
    builder.addCase(createSubscriptions.rejected, (state) => {});
  },
});

export default paypalSlice.reducer;
