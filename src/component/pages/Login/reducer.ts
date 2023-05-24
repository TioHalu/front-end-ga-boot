import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '@/configs'
import axios from 'axios'

interface User {
	userId: string
	name: string
	email: string
	username: string
	token: string
}

interface LoginState {
	user: User | null
	loading: boolean
	error: string | null
}

const initialState: LoginState = {
	user: null,
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest(state) {
			state.loading = true
		},
		loginSuccess(state, action: PayloadAction<User>) {
			state.user = action.payload
			state.loading = false
			state.error = null
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		},
		logout(state) {
			localStorage.removeItem('persist:root')
			state.user = null
		},
	},
})

export const { loginRequest, loginSuccess, loginFailed, logout } = authSlice.actions

export default authSlice.reducer

export const login = createAsyncThunk('auth/login', async (payload: { username: string; password: string }, { dispatch }) => {
	dispatch(loginRequest())
	try {
		const response = await axios.post(API.login, payload)
		dispatch(loginSuccess(response.data))
	} catch (error: any) {
		alert(error.response.data)
		dispatch(loginFailed(error.response.data))
	}
})
