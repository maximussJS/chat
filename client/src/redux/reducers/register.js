import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actionTypes/register'


const initialState = () => ({
    fetching : false,
    error : ''
})


export const register = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            })
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                fetching: false
            })
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                error: action.error
            })
        default:
            return state
    }
}
