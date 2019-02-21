import {combineReducers} from 'redux'
import {register} from './reducers/register'
import {auth} from './reducers/auth'


export default combineReducers({
    auth,
    register
})
