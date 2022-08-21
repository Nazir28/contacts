import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Contact } from '../../utils/models'
import { fetchContactHandler, fetchContactsHandler, fetchCreateContactHandler, fetchDeleteContactHandler, fetchUpdateContactHandler } from '../actions/contactActions'

export interface contactState {
    contacts: Contact[],
    contacstLoading: boolean,

    contact: Contact,
    contactLoader: boolean,

    createContactLoader: boolean,
    updateContactLoader: boolean,
}

const initialState: contactState = {
    contacts: [],
    contacstLoading: false,
    
    contact: {
        name: '',
        email: '',
        phones: [],
        user_id: ''
    },
    contactLoader: false,

    createContactLoader: false,
    updateContactLoader: false,
}

export const contactSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        fetchContactsHandler(builder)
        fetchContactHandler(builder)
        fetchCreateContactHandler(builder)
        fetchUpdateContactHandler(builder)
        fetchDeleteContactHandler(builder)
    }
})

export const { } = contactSlice.actions

export default contactSlice.reducer