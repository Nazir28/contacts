import { configureStore } from '@reduxjs/toolkit'
import contactSlice from './reducers/contactReducer'
import mainSlice from './reducers/mainReducer'
import userSlice from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        main: mainSlice,
        user: userSlice,
        contact: contactSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch