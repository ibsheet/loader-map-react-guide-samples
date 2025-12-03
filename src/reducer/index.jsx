import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  title: '',
  subTitle: '',
  name: '',
  createOptions: null,
  map: [],
  menuIndex: null
};

// Slice
const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    createSample: (state, action) => {
      const { name, title, subTitle, createOptions, menuIndex } = action.payload;
      state.name = name;
      state.title = title;
      state.subTitle = subTitle;
      state.createOptions = createOptions;
      state.menuIndex = menuIndex;
    },
    removeSample: (state) => {
      state.name = '';
      state.title = '';
      state.subTitle = '';
      state.createOptions = null;
      state.map = [];
      state.menuIndex = null;
    },
    createMap: (state, action) => {
      state.map.push(action.payload);
    }
  }
});

// Export actions
export const { createSample, removeSample, createMap } = sampleSlice.actions;

// Store
const store = configureStore({
  reducer: sampleSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
