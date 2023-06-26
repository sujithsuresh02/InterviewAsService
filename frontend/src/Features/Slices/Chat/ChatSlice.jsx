import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Chat/Chat";

export const getchats = createAsyncThunk("get/chats", async ({Id,role}) => {
  try {
    const response = await myAxios.get(`/${Id}/${role}`);
    console.log(response);
    console.log("reducer response");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  getChats: {},
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getchats.pending, (state) => {})
      .addCase(getchats.fulfilled, (state, action) => {
        console.log(action);
        console.log("action job detailss");
        state.getChats = action?.payload;
      })

      .addCase(getchats.rejected, (state, action) => {});
  },
});

export default chatSlice.reducer;
