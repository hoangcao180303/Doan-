import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewList: [],
};

export const getAllReviews = createAsyncThunk(
  "/reviews/getAllReviews",
  async () => {
    const result = await axios.get(
      "http://localhost:5001/api/admin/reviews/get"
    );

    return result?.data;
  }
);

export const deleteReview = createAsyncThunk(
  "/reviews/deleteReview",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5001/api/admin/reviews/delete/${id}`
    );

    return result?.data;
  }
);

const AdminReviewsSlice = createSlice({
  name: "adminReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload.data;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviewList = [];
      });
  },
});

export default AdminReviewsSlice.reducer;
