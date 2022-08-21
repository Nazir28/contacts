export interface Contact {
    name: string,
    email: string,
    phones: string[],
    id?: number | string,
    user_id?: number | string
}

export interface User {
    password: string,
    token: string,
    email: string,
    name: string,
    id?: number | string
}

export interface UserAuth {
    email: string,
    password: string,
    name?: string,
}