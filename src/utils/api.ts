import axios from 'axios'

const baseURL = 'https://630007ed34344b643104526b.mockapi.io'

export const api = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})