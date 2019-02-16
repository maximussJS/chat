import {request,requestWithFile} from './request'


export const isLoginUnique = async login => await request('GET', `/login/${login}`)

export const login = async data => await request('POST', '/login', data)

export const register = async (data, file) => await requestWithFile('POST', '/register', data, file)

export const getUsers = async () => await request('GET', '/users')

export const deleteUser = async () => await request('DELETE', '/users')

export const getMessages = async () => await request('GET', '/messages')
