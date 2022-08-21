import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../../services/user-service";
import { User } from "../../utils/models";
import { userState } from "../reducers/userReducer";




export const fetchUsers = createAsyncThunk('bid/fetchUsers', async () => {
    try {
        const res = await userService.getUsers()
        if (res?.response?.status >= 400) {
            return {
                msg: res.response.data,
                status: res?.response?.status
            }
        } else {
            return res.data
        }
    } catch (err) {
        console.log(err)
    }
})


export const fetchUsersHandler = (builder: any) => {
    
    builder.addCase(fetchUsers.fulfilled, (state: userState, action: PayloadAction<User[]>) => {
        console.log(action.payload)
        state.users = action.payload
    })
}




export const fetchUser = createAsyncThunk('bid/fetchUser', async (id: string | number) => {
    try {
        const res = await userService.getUser(id)
        if (res?.response?.status >= 400) {
            return {
                msg: res.response.data,
                status: res?.response?.status
            }
        } else {
            return res.data
        }
    } catch (err) {
        console.log(err)
    }
})


export const fetchUserHandler = (builder: any) => {
    builder.addCase(fetchUser.pending, (state: any, action: PayloadAction<any>) => {

    })
    builder.addCase(fetchUser.fulfilled, (state: userState, action: PayloadAction<any>) => {
        
    })
    builder.addCase(fetchUser.rejected, (state: any, action: PayloadAction<any>) => {
    })

}   



export const fetchCreateUser = createAsyncThunk('bid/fetchCreateUser', async (data: User) => {
    try {
        const res = await userService.createUser(data)
        if (res?.response?.status >= 400) {
            return {
                msg: res.response.data,
                status: res?.response?.status
            }
        } else {
            return res.data
        }
    } catch (err) {
        console.log(err)
    }
})


export const fetchCreateUserHandler = (builder: any) => {
    builder.addCase(fetchCreateUser.pending, (state: any, action: PayloadAction<any>) => {

    })
    builder.addCase(fetchCreateUser.fulfilled, (state: userState, action: PayloadAction<any>) => {
        state.users = [...state.users, action.payload]
    })
    builder.addCase(fetchCreateUser.rejected, (state: any, action: PayloadAction<any>) => {
    })

}   

