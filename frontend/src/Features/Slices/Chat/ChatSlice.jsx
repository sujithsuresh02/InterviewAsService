import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/Chat/Chat";
import messageApi from "../../../api/Chat/Message";
export const getChats = createAsyncThunk("get/chats", async ({ Id, role }) => {
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

export const getMessage = createAsyncThunk(
  "getMessage",
  async (chatId) => {
    try {
      const response = await messageApi.get(`/${chatId}`);
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const createMessage = createAsyncThunk(
  "createMessage",
  async (message) => {
    try {
      const response = await messageApi.post("/", message);
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  getchats: {},
  getMessage: {},
  postMessage: {},
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {})

      .addCase(getChats.fulfilled, (state, action) => {
        console.log(action);
        console.log("action job detailss");
        state.getchats = action?.payload?.chatDetails;
      })

      .addCase(getMessage.fulfilled, (state, action) => {
        console.log(action, "action");

        state.getMessage = action?.payload;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        console.log(action, "action");

        state.postMessage = action?.payload;
      })
      .addCase(getChats.rejected, (state, action) => {});
  },
});

export default chatSlice.reducer;
