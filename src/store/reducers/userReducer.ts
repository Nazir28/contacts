import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, UserAuth } from '../../utils/models'
import { fetchCreateUserHandler, fetchUserHandler, fetchUsersHandler } from '../actions/userActions'

export interface userState {
    users: User[],
    auth: boolean,
    user: User
}

const initialState: userState = {
    users: [],
    auth: false,
    user: {
        password: '',
        token: '',
        email: '',
        name: '',
        id: '',
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state, action: PayloadAction<UserAuth>) {
            const findeUser = state.users?.find(user => (user.email === action.payload.email && user.password === action.payload.password) && user)
            localStorage.setItem('token', findeUser?.token || '')
            if (findeUser) {

                state.auth = true
                state.user = findeUser;
            }
        },
        userLoginWithToken(state, action: PayloadAction<string>) {
            const findeUser = state.users?.find(user => (user.token === action.payload) && user)
            if (findeUser) {
                state.auth = true
                state.user = findeUser;
            } else {
                state.auth = false
            }
        },
        userLogout(state) {
            localStorage.removeItem('token')
            state.user = initialState.user
            state.auth = false
        }
    },
    extraReducers: builder => {
        fetchCreateUserHandler(builder)
        fetchUserHandler(builder)
        fetchUsersHandler(builder)
    }
})

export const { userLogin, userLoginWithToken, userLogout } = userSlice.actions

export default userSlice.reducer