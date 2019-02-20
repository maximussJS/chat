import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import RegisterForm from '../components/Register'
import {isLoginUnique,register} from '../utils/requests'


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            login : '',
            password : '',
            confirmPassword : '',
            image : '',
            activeStep : 0,
            loading : false,
            disabled : true,
            fields : [],
            error : ''
        }
    }

    onNameChange = e => {
        this.setState({
            name : e.target.value,
            error : '',
            disabled : false,
            fields : []
        }, () => {
            if(this.state.name.trim().length < 8) this.setState({
                error : 'Name length is too small',
                fields : [...this.state.fields, 'name']
            })
            if(this.state.name.trim().length > 20) this.setState({
                error : 'Name length is too big',
                fields : [...this.state.fields, 'name']
            })
        })
    }

    onLoginChange = async e => {
        this.setState({
            login : e.target.value,
            error : '',
            disabled : false,
            fields : []
        }, async () => {
            try {
                if(this.state.login.trim().length < 8) this.setState({
                    error : 'Login length is too small',
                    fields : [...this.state.fields, 'login']
                })
                if(this.state.login.trim().length > 20) this.setState({
                    error : 'Login length is too big',
                    fields : [...this.state.fields, 'login']
                })
                if(this.state.error === '') {
                    const response = await isLoginUnique(this.state.login)
                    if(!response.success) this.setState({
                        error : 'This login is already exists',
                        fields : [...this.state.fields, 'login']
                    })
                }
            }
            catch (e) {
                this.props.history.push('/error')
            }
        })
    }

    onPasswordChange = e => {
        this.setState({
            password : e.target.value,
            error : '',
            disabled : false,
            fields : []
        }, () => {
            if(this.state.password.trim().length < 8) this.setState({
                error : 'Password length is too small',
                fields : [...this.state.fields, 'password']
            })
            if(this.state.password.trim().length > 20) this.setState({
                error : 'Password length is too big',
                fields : [...this.state.fields, 'password']
            })
        })
    }

    onConfirmPasswordChange = e => {
        this.setState({
            confirmPassword : e.target.value,
            error : '',
            disabled : false,
            fields : []
        }, () => {
            if(this.state.confirmPassword !== this.state.password) this.setState({
                error : 'Passwords did not match',
                fields : [...this.state.fields, 'repeat']
            })
        })
    }

    onImageChange = e => {
        e.target.files[0] === undefined ? this.setState({
            error : 'No such file',
            fields : [...this.state.fields, 'image']
        }) : this.setState({
            image : e.target.files[0],
            disabled : false
        })
    }

    handleNext = () => this.setState(state => ({
        activeStep: state.activeStep + 1,
        disabled : state.activeStep + 1 !== this.getSteps() - 1
    }))

    handleBack = () => this.setState(state => ({
        activeStep: state.activeStep - 1,
        disabled : true
    }))

    isDisabled = step => {
        switch (step) {
            case (0) : {
                const {name, login} = this.state
                return (name === '' || login === '')
            }
            case (1) : {
                const {password, confirmPassword} = this.state
                return password === '' || confirmPassword === ''
            }
            default : return false
        }
    }

    getSteps = () => ['Input your name and login', 'Input password', 'Choose image', 'Congratulations']

    onSubmit = () => {
        this.setState({
            loading : true
        }, async () => {
            try {
                const {name,login,password,image} = this.state
                const response = await register({
                    name : name,
                    login : login,
                    password : password,
                },image)
                this.props.history.push(response.success ? '/login' : '/error')
            }
            catch (e) {
                this.props.history.push('/error')
            }
        })
    }

    render() {
        const {activeStep,error,fields,disabled,loading,name,login,password,confirmPassword,image} = this.state
        return (
            <RegisterForm error={error}
                          name={name}
                          login={login}
                          password={password}
                          repeat={confirmPassword}
                          image={image}
                          fields={fields}
                          loading={loading}
                          disabled={disabled}
                          activeStep={activeStep}
                          steps={this.getSteps()}
                          onSubmit={this.onSubmit}
                          handleBack={this.handleBack}
                          handleNext={this.handleNext}
                          isDisabled={this.isDisabled}
                          onNameChange={this.onNameChange}
                          onLoginChange={this.onLoginChange}
                          onImageChange={this.onImageChange}
                          onPasswordChange={this.onPasswordChange}
                          onConfirmPasswordChange={this.onConfirmPasswordChange}/>
        )
    }
}


export default withRouter(Register)
