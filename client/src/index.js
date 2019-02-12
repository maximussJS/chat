import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import {BrowserRouter as Router} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import './css/index.css'


ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
)


serviceWorker.unregister()
