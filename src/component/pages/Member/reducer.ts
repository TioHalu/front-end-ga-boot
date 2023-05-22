import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '@/configs'
import axios from 'axios'

interface Member {
	name: string
	email: string
	username: string
	roleId: string
	namespaces: string
	password: string
	userId: string
}

interface MemberState {
	member: Member | null
	memberId: Member | null
	loading: boolean
	fetching: boolean
	error: string | null
	success: boolean | null
}

const initialState: MemberState = {
	member: null,
	memberId: null,
	loading: false,
	error: null,
	success: null,
	fetching: false,
}

const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		memberRequest(state) {
			state.loading = true
		},
		memberSuccess(state, action: PayloadAction<Member>) {
			state.loading = false
			state.error = null
			state.member = action.payload
		},
		memberFailed(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		},
		submitRequest(state) {
			state.fetching = true
			state.success = null
		},
		submitSuccess(state) {
			state.success = true
			state.fetching = false
		},
		submitFailed(state) {
			state.success = false
			state.fetching = false
		},
		memberRequestById(state) {
			state.fetching = true
			state.memberId = null
		},
		memberRequestByIdSuccess(state, action: PayloadAction<Member>) {
			state.fetching = false
			state.error = null
			state.memberId = action.payload
		},
		memberRequestByIdFailed(state, action: PayloadAction<string>) {
			state.fetching = false
			state.error = action.payload
		},
		resetForm(state) {
			state.memberId = null
			state.loading = false
			state.error = null
			state.success = null
			state.fetching = false
		},
	},
})

export const {
	memberRequest,
	memberSuccess,
	memberFailed,
	submitSuccess,
	submitRequest,
	submitFailed,
	memberRequestById,
	memberRequestByIdSuccess,
	memberRequestByIdFailed,
	resetForm,
} = memberSlice.actions

export default memberSlice.reducer

export const member = createAsyncThunk(
	'member/member',
	async (
		payload: { name: string; email: string; username: string; roleId: string; namespaces: string; password: string; token: string },
		{ dispatch }
	) => {
		dispatch(submitRequest())
		try {
			await axios.post(
				API.register,
				{
					name: payload.name,
					email: payload.email,
					username: payload.username,
					roleId: payload.roleId,
					namespaces: payload.namespaces,
					password: payload.password,
				},
				{
					headers: {
						'auth-token': `${payload.token}`,
					},
				}
			)
			dispatch(submitSuccess())
		} catch (error: any) {
			console.log(error)
			alert(error.response.data)
			dispatch(submitFailed())
		}
	}
)

export const requestMember = createAsyncThunk('member/requestMember', async (payload: { token: string }, { dispatch }) => {
	dispatch(memberRequest())
	try {
		const response = await axios.get(API.getMember, {
			headers: {
				'auth-token': `${payload.token}`,
			},
		})
		dispatch(memberSuccess(response.data))
	} catch (error: any) {
		alert(error.response.data)
		dispatch(memberFailed(error.response.data))
	}
})
export const requestMemberById = createAsyncThunk('member/requestMemberById', async (payload: { token: string; id: string }, { dispatch }) => {
	dispatch(memberRequestById())
	try {
		const response = await axios.get(API.getMember + payload.id, {
			headers: {
				'auth-token': `${payload.token}`,
			},
		})
		dispatch(memberRequestByIdSuccess(response.data))
	} catch (error: any) {
		alert(error.response.data)
		dispatch(memberRequestByIdFailed(error.response.data))
	}
})

export const requestEditMember = createAsyncThunk(
	'member/requestEditMember',
	async (
		payload: { token: string; id: string; name: string; email: string; username: string; roleId: string; namespaces: string; password: string },
		{ dispatch }
	) => {
		dispatch(submitRequest())
		try {
			await axios.put(
				API.getMember + payload.id,
				{
					name: payload.name,
					email: payload.email,
					username: payload.username,
					roleId: payload.roleId,
					namespaces: payload.namespaces,
					password: payload.password,
				},
				{
					headers: {
						'auth-token': `${payload.token}`,
					},
				}
			)
			dispatch(submitSuccess())
		} catch (error: any) {
			alert(error.response.data)
			dispatch(submitFailed())
		}
	}
)

export const requestDeleteMember = createAsyncThunk('member/requestDeleteMember', async (payload: { token: string; id: string }, { dispatch }) => {
	dispatch(submitRequest())
	try {
		await axios.delete(API.getMember + payload.id, {
			headers: {
				'auth-token': `${payload.token}`,
			},
		})
		dispatch(submitSuccess())
	} catch (error: any) {
		alert(error.response.data)
		dispatch(submitFailed())
	}
})
