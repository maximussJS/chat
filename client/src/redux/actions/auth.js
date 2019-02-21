import {authenticate} from '../../utils/auth'
import {login as getToken} from '../../utils/requests'
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


const logout = () => ({
    type: LOGOUT,
})


export const Login = (login, password) => dispatch => {
        dispatch(AuthRequest())
        getToken({
            login,
            password
        })
        .then(response => {
            if(response.success) {
                dispatch(AuthSuccess(response.token))
                authenticate(response.token)
            }
            else dispatch(AuthFailure(response.message))
        })
        .catch(err => window.location = '/error')
}
