import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Login as submit} from '../redux/actions/auth'
import LoginForm from '../components/Login'


const mapStateToProps = state => ({
    loading: state.auth.fetching,
    error: state.auth.error
})


const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onSubmit: submit
    }, dispatch)


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            error: '',
            disabled: true,
            fields: []
        }
    }

    onLoginChange = e => {
        this.setState({
            login: e.target.value,
            error: '',
            disabled: false,
            fields: []
        }, () => {
            if (this.state.login.trim().length < 8) this.setState({
                error: 'Login length is too small',
                fields: [...this.state.fields, 'login']
            })
            if (this.state.login.trim().length > 20) this.setState({
                error: 'Login length is too big',
                fields: [...this.state.fields, 'login']
            })
        })
    }

    onPasswordChange = e => {
        this.setState({
            password: e.target.value,
            error: '',
            disabled: false,
            fields: []
        }, () => {
            if (this.state.password.trim().length < 8) this.setState({
                error: 'Password length is too small',
                fields: [...this.state.fields, 'password']
            })
            if (this.state.password.trim().length > 20) this.setState({
                error: 'Password length is too big',
                fields: [...this.state.fields, 'password']
            })
        })
    }

    isDisabled = () => {
        const {login, password} = this.state
        return login === '' || password === ''
    }

    render() {
        const {error, fields, disabled, login, password} = this.state
        const {loading, onSubmit, history} = this.props
        return (
            <LoginForm  error={error}
                        fields={fields}
                        disabled={disabled}
                        loading={loading}
                        onSubmit={() => {
                            onSubmit(login, password)
                                .then(res => history.push('/'))
                                .catch(err => history.push('/error'))
                        }
                        }
                        onLoginChange={this.onLoginChange}
                        onPasswordChange={this.onPasswordChange}
                        isDisabled={this.isDisabled}/>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
