import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import planapi from "../../../api/Admin/admin";
export const postAddPlans = createAsyncThunk(
  "addInterview/Plans",
  async (payload) => {
    try {
      const response = await planapi.post("/add_plans", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);
export const getFullPlans = createAsyncThunk("getPlans", async () => {
  try {
    const response = await planapi.get("/view_plans");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const deletePlans = createAsyncThunk("delete/Plans", async (planId) => {
  try {
    console.log(planId);
    const response = await planapi.delete(`/delete_plan/${planId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const subscribedPlanEdit = createAsyncThunk(
  "edit/Plans",
  async (values) => {
    try {
      const response = await planapi.put("/edit_plans", values);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  addplans: {},
  FullPlanDetails: {},
  deleteplan: {},
  editplans: {},
};

const subscriptionPlanSlice = createSlice({
  name: "planDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postAddPlans.pending, (state, action) => {});

    builder.addCase(postAddPlans.fulfilled, (state, action) => {
      state.addplans = action?.payload?.data;
    });
    builder.addCase(getFullPlans.fulfilled, (state, action) => {
      console.log(action);
      console.log("action from full plans");
      state.FullPlanDetails = action?.payload?.data;
    });
    builder.addCase(deletePlans.fulfilled, (state, action) => {
      console.log(action);
      console.log("delete action");
      const deletedPlanId = action.payload?.data?.id;
      console.log(FullPlanDetails,"Plans");
      const deletedPlanIndex = state.FullPlanDetails.findIndex(
        (plan) => plan.id === deletedPlanId
      );
      if (deletedPlanIndex !== -1) {
        state.FullPlanDetails.splice(deletedPlanIndex, 1);
      }
    });
    builder.addCase(subscribedPlanEdit.fulfilled, (state, action) => {
      console.log(action);
      console.log("action");
      state.editplans = action.payload?.data;
    });
    builder.addCase(postAddPlans.rejected, (state, action) => {});
  },
});

export default subscriptionPlanSlice.reducer;
