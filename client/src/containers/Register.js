import React, {Component} from 'react'
import style from '../theme/Register'
import RegisterForm from '../components/Register'
import {withStyles} from '@material-ui/core/styles'


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

    onNameChange = e => this.setState({
        name : e.target.value
    })

    onLoginChange = e => this.setState({
        login : e.target.value
    })

    onPasswordChange = e => this.setState({
        password : e.target.value
    })

    onConfirmPasswordChange = e => this.setState({
        confirmPassword : e.target.value
    })

    onImageChange = e => this.setState({
        image : e.target.files[0]
    })

    handleNext = () => this.setState(state => ({
        activeStep: state.activeStep + 1
    }))

    handleBack = () => this.setState(state => ({
        activeStep: state.activeStep - 1
    }))

    getSteps = () => ['Input your name and login', 'Input password', 'Choose image']

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
