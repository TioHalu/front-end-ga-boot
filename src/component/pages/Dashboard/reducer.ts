import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from '@/configs';
import axios from 'axios';
const initialState = {
  nodes: [],
  deployments: [],
  service: [],
  images :[],
  fething: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchNodes(state, action) {
      state.nodes = action.payload;
    },
    fetchDeployments(state, action) {
      state.deployments = action.payload;
    },
    fetchService(state, action) {
      state.service = action.payload;
    },
    fetchImages(state, action) {
      state.images = action.payload;
    }
  },
});

export default dashboardSlice.reducer;
export const { fetchNodes,fetchDeployments,fetchService,fetchImages } = dashboardSlice.actions;

export const getNodes = createAsyncThunk(
  "dashboard/getNodes",
  async (payload: { token: string }, { dispatch }) => {
    try {
      const response = await axios.get(API.overview+"nodes", {
       headers: {
          'auth-token': `${payload.token}`,
        },
      });
      dispatch(fetchNodes(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDeployments = createAsyncThunk(
  "dashboard/getDeployments",
  async (payload: { token: string }, { dispatch }) => {
    try {
      const response = await axios.get(API.overview+"deployment", {
       headers: {
          'auth-token': `${payload.token}`,
        },
      });
      dispatch(fetchDeployments(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);


export const getService = createAsyncThunk(
  "dashboard/getService",
  async (payload: { token: string }, { dispatch }) => {
    try {
      const response = await axios.get(API.overview+"services", {
       headers: {
          'auth-token': `${payload.token}`,
        },
      });
      dispatch(fetchService(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getImages = createAsyncThunk(
  "dashboard/getImages",
  async (payload: { token: string }, { dispatch }) => {
    try {
      const response = await axios.get(API.overview+"images", {
       headers: {
          'auth-token': `${payload.token}`,
        },
      });
      dispatch(fetchImages(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);