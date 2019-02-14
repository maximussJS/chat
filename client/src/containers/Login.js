import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import LoginForm from '../components/Login'
import {authenticate} from '../utils/auth'
import {login as submit} from '../utils/requests'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login : '',
            password : '',
            error : '',
            disabled : true,
            fields : []
        }
    }

    onLoginChange = e => {
        this.setState({
            login : e.target.value,
            error : '',
            disabled : false,
            fields : []
        }, () => {
            if(this.state.login.trim() === '') this.setState({
                error : 'Invalid login',
                fields : [...this.state.fields, 'login']
            })
            if(this.state.login.length < 8) this.setState({
                error : 'Login length is too small',
                fields : [...this.state.fields, 'login']
            })
            if(this.state.login.length > 20) this.setState({
                error : 'Login length is too big',
                fields : [...this.state.fields, 'login']
            })
        })
    }

    onPasswordChange = e => {
        this.setState({
            password : e.target.value,
            error : '',
            disabled : false,
            fields : []
        }, () => {
            if(this.state.password.trim() === '') this.setState({
                error : 'Invalid password',
                fields : [...this.state.fields, 'password']
            })
            if(this.state.password.length < 8) this.setState({
                error : 'Password length is too small',
                fields : [...this.state.fields, 'password']
            })
            if(this.state.password.length > 20) this.setState({
                error : 'Password length is too big',
                fields : [...this.state.fields, 'password']
            })
        })
    }

    isDisabled = () => {
        const {login,password} = this.state
        return login === '' || password === ''
    }

    onSubmit = async () => {
        try {
            const {login,password} = this.state
            const response = await submit({
                login : login,
                password : password
            })
            if(response.success) {
                authenticate(response.token)
                this.props.history.push('/')
            }
            else this.setState({
                error : response.message,
                fields : [...this.state.fields, 'password']
            })
        }
        catch (e) {
            this.props.history.push('/error')
        }
    }

    render() {
        const {error,fields,disabled} = this.state
        return (
             <LoginForm error={error}
                        fields={fields}
                        disabled={disabled}
                        onSubmit={this.onSubmit}
                        onLoginChange={this.onLoginChange}
                        onPasswordChange={this.onPasswordChange}
                        isDisabled={this.isDisabled}/>
        )
    }
}


export default withRouter(Login)
