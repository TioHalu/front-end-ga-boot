import { createSlice, PayloadAction,createAsyncThunk  } from '@reduxjs/toolkit';
import { API } from '@/configs';
import axios from 'axios';

interface Member {
  name: string;
  email: string;
  username: string;
  roleId: string;
  namespaces: string;
  password: string;
}

interface MemberState {
  member: Member | null;
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  member: null,
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    memberRequest(state) {
      state.loading = true;
    },
    memberSuccess(state, action: PayloadAction<Member>) {
      state.loading = false;
      state.error = null;
      state.member = action.payload;
    },
    memberFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { memberRequest, memberSuccess, memberFailed } = memberSlice.actions;

export default memberSlice.reducer;

export const member = createAsyncThunk(
  'member/member',
  async (payload: { name: string; email: string; username: string; roleId: string; namespaces: string; password: string }, { dispatch }) => {
    dispatch(memberRequest());
    try {
      const response = await axios.post(API.register, payload);
      dispatch(memberSuccess(response.data));
    } catch (error : any) {
      dispatch(memberFailed(error.message));
    }
  }
);

export const requestMember = createAsyncThunk(
  'member/requestMember',
  async (payload: { token: string },{ dispatch }) => {
    dispatch(memberRequest());
    try {
      const response = await axios.get(API.getMember, {
        headers: {
          'auth-token': `${payload.token}`,
        },
      });
      dispatch(memberSuccess(response.data));
    } catch (error : any) {
      dispatch(memberFailed(error.message));
    }
  }
)