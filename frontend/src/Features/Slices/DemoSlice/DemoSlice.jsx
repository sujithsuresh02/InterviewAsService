import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Demoapi from "../../../api/LandingPage/Demo";

export const postDemoPage = createAsyncThunk("/demo", async (values) => {
  try {
    const response = await Demoapi.post("/demo", values);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
 DemoTokens:[],
};

 const demoSlice = createSlice({
  name: "Demo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDemoPage.pending, (state, action) => {
        // Handle pending state if needed
        console.log(action);
      })
      .addCase(postDemoPage.fulfilled, (state, action) => {
        const results = action?.payload?.data?.result;
        state.DemoTokens.push(results)
      })
      .addCase(postDemoPage.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default demoSlice.reducer;
