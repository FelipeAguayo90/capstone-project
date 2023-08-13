import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'api/v1/courses/carousel';

const initialState = {
  carouselItems: [],
  index: 0,
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
  reducers: {
    nextSlide: (state) => {
      console.log(state.carouselItems);
      if (state.index === state.carouselItems.length - 1) {
        state.index = 0;
        return;
      }
      state.index = state.index + 1;
    },
    prevSlide: (state) => {
      if (state.index === 0) {
        state.index = state.carouselItems.length - 1;
        return;
      }
      state.index = state.index - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarouselItms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarouselItms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carouselItems = action.payload;
        console.log(state.carouselItems);
      })
      .addCase(getCarouselItms.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { nextSlide, prevSlide } = carouselSlice.actions;

export default carouselSlice.reducer;
