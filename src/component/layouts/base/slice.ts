import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BaseState {
  list: any;
}

const initialState: BaseState = {
  list: [],
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<any>) => {
      if(state.list.includes(action.payload)) {
        state.list.splice(state.list.indexOf(action.payload), 1);
      } else {
        state.list.push(action.payload);
      }
    }
  },
});

export const { setList } = baseSlice.actions;

export default baseSlice.reducer;