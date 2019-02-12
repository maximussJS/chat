import React,{Component} from 'react'
import '../css/App.css'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from '../theme/MuiTheme'

import AppBar from '../components/Header'

export default class App extends Component {
 render() {
     return (
         <MuiThemeProvider theme={theme}>
             <AppBar/>
         </MuiThemeProvider>
     )
 }
}
