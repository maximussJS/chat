import reducer from './redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'


export const store = createStore(reducer, applyMiddleware(thunk, logger))
