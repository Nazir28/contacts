import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import contatService from "../../services/contact-services";
import { Contact, User } from "../../utils/models";
import { contactState } from "../reducers/contactReducer";
import { userState } from "../reducers/userReducer";





export const fetchContacts = createAsyncThunk('bid/fetchContacts', async (_, { getState }) => {
    try {
        const state: any = getState()
        const user = state.user
        const res = await contatService.getContacts()
        if (res?.response?.status >= 400) {
            return {
                msg: res.response.data,
                status: res?.response?.status
            }
        } else {
            return res.data.filter((el: Contact) => el.user_id === user.user.id).sort((a: Contact, b: Contact) => {
                let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) //сортируем строки по возрастанию
                    return -1
            })
            // return res.data
        }
    } catch (err) {
        console.log(err)
    }
})


export const fetchContactsHandler = (builder: any) => {
    builder.addCase(fetchContacts.pending, (state: contactState, action: PayloadAction<any>) => {
        state.contacstLoading = true

    })
    builder.addCase(fetchContacts.fulfilled, (state: contactState, action: PayloadAction<Contact[]>) => {
        console.log(action.payload)
        state.contacts = action.payload
        state.contacstLoading = false
    })
}




export const fetchContact = createAsyncThunk('bid/fetchContact', async (id: string | number) => {
    try {
        const res = await contatService.getContact(id)
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


export const fetchContactHandler = (builder: any) => {
    builder.addCase(fetchContact.pending, (state: any, action: PayloadAction<any>) => {
        state.contactLoader = true
    })
    builder.addCase(fetchContact.fulfilled, (state: contactState, action: PayloadAction<Contact>) => {
        state.contact = action.payload
        state.contactLoader = false
    })
    builder.addCase(fetchContact.rejected, (state: any, action: PayloadAction<any>) => {
    })

}



export const fetchCreateContact = createAsyncThunk('bid/fetchCreateContact', async (data: Contact) => {
    try {
        const res = await contatService.createContact(data)
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


export const fetchCreateContactHandler = (builder: any) => {
    builder.addCase(fetchCreateContact.pending, (state: any, action: PayloadAction<any>) => {
        state.createContactLoader = true
    })
    builder.addCase(fetchCreateContact.fulfilled, (state: contactState, action: PayloadAction<Contact>) => {
        state.contacts = [action.payload, ...state.contacts]
        state.createContactLoader = false
    })
    builder.addCase(fetchCreateContact.rejected, (state: any, action: PayloadAction<any>) => {
    })

}




export const fetchUpdateContact = createAsyncThunk('bid/fetchUpdateContact', async (data: {
    data: Contact,
    id: number | string
},) => {
    try {
        const res = await contatService.updateContact(data.data, data.id)
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


export const fetchUpdateContactHandler = (builder: any) => {
    builder.addCase(fetchUpdateContact.pending, (state: any, action: PayloadAction<any>) => {
        state.updateContactLoader = true
    })
    builder.addCase(fetchUpdateContact.fulfilled, (state: contactState, action: PayloadAction<Contact>) => {
        state.contact = action.payload
        state.updateContactLoader = false
    })
    builder.addCase(fetchUpdateContact.rejected, (state: any, action: PayloadAction<any>) => {
    })

}





export const fetchDeleteContact = createAsyncThunk('bid/fetchDeleteContact', async (id: number | string) => {
    try {
        const res = await contatService.deleteContact(id)
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


export const fetchDeleteContactHandler = (builder: any) => {
    builder.addCase(fetchDeleteContact.pending, (state: any, action: PayloadAction<any>) => {
    })
    builder.addCase(fetchDeleteContact.fulfilled, (state: contactState, action: PayloadAction<Contact>) => {
        console.log(action.payload)
    })
    builder.addCase(fetchDeleteContact.rejected, (state: any, action: PayloadAction<any>) => {
    })

}   
