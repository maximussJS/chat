import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import '../css/App.css'
import theme from '../theme/MuiTheme'
import Main from '../containers/Main'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Layout from '../components/Layout'
import Error from '../components/Error'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'


export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Layout>
                    <Switch>
                        <Route exact component={Main} path='/'/>
                        <Route exact component={Login} path='/login'/>
                        <Route exact component={Register} path='/register'/>
                        <Route exact component={Error}/>
                    </Switch>
                </Layout>
            </MuiThemeProvider>
        )
    }
}
