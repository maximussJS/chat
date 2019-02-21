import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT} from '../actionTypes/auth'


const initialState = {
    fetching: false,
    token: '',
    error: null,
}


export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            })
        case AUTH_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                token: action.token
            })
        case AUTH_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                error: action.error
            })
        case LOGOUT:
            return Object.assign({}, initialState)
        default:
            return state
    }
}
