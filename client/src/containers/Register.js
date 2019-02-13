import React, {Component} from 'react'
import style from '../theme/Register'
import RegisterForm from '../components/Register'
import {withStyles} from '@material-ui/core/styles'
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
            fields : [],
            error : ''
        }
    }

    onNameChange = e => {
        this.setState({
            name : e.target.value,
            error : '',
            fields : []
        })
        if(this.state.name.length < 8) this.setState({
            error : 'Name length is too small',
            fields : [...this.state.fields, 'name']
        })
        if(this.state.name.length > 20) this.setState({
            error : 'Name length is too big',
            fields : [...this.state.fields, 'name']
        })
    }

    onLoginChange = async e => {
        try {
            this.setState({
                login : e.target.value,
                error : '',
                fields : []
            })
            if(this.state.login.length < 8) this.setState({
                error : 'Login length is too small',
                fields : [...this.state.fields, 'login']
            })
            if(this.state.login.length > 20) this.setState({
                error : 'Login length is too big',
                fields : [...this.state.fields, 'login']
            })
            const response = await isLoginUnique(this.state.login)
            if(!response.success) this.setState({
                error : 'This login is already exists',
                fields : [...this.state.fields, 'login']
            })
        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

    onPasswordChange = e => {
        this.setState({
            password : e.target.value,
            error : '',
            fields : []
        })
        if(this.state.password.length < 8) this.setState({
            error : 'Password length is too small',
            fields : [...this.state.fields, 'password']
        })
        if(this.state.password.length > 20) this.setState({
            error : 'Password length is too big',
            fields : [...this.state.fields, 'password']
        })
    }

    onConfirmPasswordChange = e => {
        this.setState({
            confirmPassword : e.target.value,
            error : '',
            fields : []
        })
        if(this.state.confirmPassword !== this.state.password) this.setState({
            error : 'Password didn`t match',
            fields : [...this.state.fields, 'repeat']
        })
    }

    onImageChange = e => this.setState({
        image : e.target.files[0]
    })

    handleNext = () => this.setState(state => ({
        activeStep: state.activeStep + 1
    }))

    handleBack = () => this.setState(state => ({
        activeStep: state.activeStep - 1
    }))

    getSteps = () => ['Input your name and login', 'Input password', 'Choose image', 'Congratulations']

    onSubmit = async () => {
        try {
            const {name,login,password} = this.state
            const response = await register({
                name : name,
                login : login,
                password : password
            })
            this.props.history.push(response.success ? '/login' : '/error')
        }
        catch (e) {
            this.setState({
                error : e.message
            })
        }
    }

    render() {
        const {root,actionsContainer,button} = this.props.classes
        const {activeStep,error,fields} = this.state
        return (
            <RegisterForm root={root}
                          error={error}
                          fields={fields}
                          button={button}
                          activeStep={activeStep}
                          actionsContainer={actionsContainer}
                          steps={this.getSteps()}
                          handleBack={this.handleBack}
                          handleNext={this.handleNext}
                          onNameChange={this.onNameChange}
                          onLoginChange={this.onLoginChange}
                          onImageChange={this.onImageChange}
                          onPasswordChange={this.onPasswordChange}
                          onConfirmPasswordChange={this.onConfirmPasswordChange}/>
        )
    }
}


export default withStyles(style)(Register)
