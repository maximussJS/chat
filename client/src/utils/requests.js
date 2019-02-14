import {request} from './request'


export const isLoginUnique = async login => await request('GET', `/login/${login}`)

export const login = async data => await request('POST', '/login', data)

export const register = async data => await request('POST', '/register', data)
