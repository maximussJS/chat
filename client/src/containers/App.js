import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Register from '../containers/Register'
import theme from '../theme/MuiTheme'
import Layout from '../components/Layout'
import '../css/App.css'


export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Layout>
                    <Switch>
                        <Route exact component={Register} path='/register'/>
                    </Switch>
                </Layout>
            </MuiThemeProvider>
        )
    }
}
