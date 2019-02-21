import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import {store} from './store'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import './css/index.css'


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)


serviceWorker.unregister()
