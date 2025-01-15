import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload; // Set the filter state to the payload value
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlic .reducer;
