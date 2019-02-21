import {register} from '../../utils/requests'
import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actionTypes/register'


const RegisterRequest = () => ({
    type : REGISTER_REQUEST
})


const RegisterSuccess = () => ({
    type : REGISTER_SUCCESS
})


const RegisterFailure = error => ({
    type : REGISTER_FAILURE,
    error
})


export const Register = (name, login, password, image) => dispatch => {
    dispatch(RegisterRequest())
    register({
        name,
        login,
        password
    }, image)
        .then(response => response.success
            ? dispatch(RegisterSuccess())
            : dispatch(RegisterFailure(response.message)))
        .catch(err => window.location('/error'))
}
