import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../../api/company/addRequestSlice.api";
import chatapi from "../../../api/Chat/Chat";
export const addRequest = createAsyncThunk(
  "company/addRequest",
  async (values) => {
    try {
      console.log(values, "tokensss");
      const response = await myAxios.post("/add_request", values);
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const initateChat = createAsyncThunk(
  "initateChat",
  async (values) => {
    try {
      console.log(values, "tokensss");
      const response = await chatapi.post("/", values);
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const totalNumberOfCvCount = createAsyncThunk(
  "company/totalNumberOfCvCount",
  async () => {
    try {
      const response = await myAxios.get("/totalcv_uploaded");
      console.log(response);
      console.log("reducer response");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getInterviewfeedback = createAsyncThunk(
  "getinterviewFeedback",
  async () => {
    try {
      const response = await myAxios.get("/feedback");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  response: {},
  totalCvUploaded: {},
  feedback: [],
  initateChat:{}
};

const addRequestlice = createSlice({
  name: "addRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRequest.pending, (state) => {})
      .addCase(addRequest.fulfilled, (state, action) => {
        console.log(action);
        console.log("action job detailss");
        state.response = action.payload;
      })
      .addCase(totalNumberOfCvCount.fulfilled, (state, action) => {
        console.log(action);
        console.log("action totalcvuploads");
        state.totalCvUploaded = action?.payload?.response;
      })
      .addCase(getInterviewfeedback.fulfilled, (state, action) => {
        console.log(action,"dvhbcvnbv")

        state.feedback = action?.payload?.response;
      })
      .addCase(initateChat.fulfilled, (state, action) => {

        state.initateChat = action?.payload;
      })
      .addCase(addRequest.rejected, (state, action) => {});
  },
});

export default addRequestlice.reducer;
