import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'api/v1/courses';

const initialState = {
  carouselItems: [],
  isLoading: true,
};

export const getCarouselItms = createAsyncThunk(
  'carousel/getCarouselItms',
  () => {
    return fetch(url)
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
);

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarouselItms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarouselItms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carouselItems = action.payload;
      })
      .addCase(getCarouselItms.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = carouselSlice.actions;

export default carouselSlice.reducer;
