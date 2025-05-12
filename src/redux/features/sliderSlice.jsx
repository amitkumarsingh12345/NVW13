// features/sliderSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async API call
export const fetchSlider = createAsyncThunk("slider/fetchSlider", async () => {
  const res = await fetch("https://nvwebsoft.com/php_api/api.php/slider");
  return await res.json();
});

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSlider.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default sliderSlice.reducer;
