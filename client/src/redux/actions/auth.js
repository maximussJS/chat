import {login as getToken} from '../../utils/requests'
import {authenticate} from '../../utils/auth'
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT} from '../actionTypes/auth'


const AuthRequest = () => ({
    type: AUTH_REQUEST
})


const AuthSuccess = token => ({
    type: AUTH_SUCCESS,
    token: token
})


const AuthFailure = message => ({
    type: AUTH_FAILURE,
    error: message
})


export const Logout = () => ({
    type: LOGOUT
})

export const Login = (login, password) => async dispatch => {
     try {
         dispatch(AuthRequest())
         const response = await getToken({
             login,
             password
         })
         if(response.success) {
             authenticate(response.token)
             dispatch(AuthSuccess(response.token))
         }
         else dispatch(AuthFailure(response.message))
     }
     catch (e) {
         window.location = '/error'
     }
}
