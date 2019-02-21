import React from 'react'
import propTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Content from '../components/RegisterContent'
import style from '../theme/Register'


const Register = ({
    classes,
    error,
    name,
    login,
    password,
    repeat,
    image,
    fields,
    steps,
    loading,
    disabled,
    activeStep,
    onSubmit,
    handleBack,
    handleNext,
    isDisabled,
    onNameChange,
    onLoginChange,
    onImageChange,
    onPasswordChange,
    onConfirmPasswordChange
}) =>
    <div className={classes.root}>
        <Stepper activeStep={activeStep}
                 orientation="vertical">
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>
                        <h3>
                            {label}
                        </h3>
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            <Content step={index}
                                     error={error}
                                     fields={fields}
                                     name={name}
                                     login={login}
                                     password={password}
                                     repeat={repeat}
                                     image={image}
                                     onNameChange={onNameChange}
                                     onLoginChange={onLoginChange}
                                     onImageChange={onImageChange}
                                     onPasswordChange={onPasswordChange}
                                     onConfirmPasswordChange={onConfirmPasswordChange}/>
                        </Typography>
                        <div className={classes.actionsContainer}>
                            <div>
                                <Button disabled={activeStep === 0}
                                        onClick={() => handleBack()}
                                        className={classes.button}>
                                    Back
                                </Button>
                                <Button variant="contained"
                                        color="primary"
                                        disabled={activeStep === steps.length - 1
                                            ? false
                                            : loading || disabled || fields.length !== 0 || isDisabled(activeStep)}
                                        onClick={activeStep === steps.length - 1 ? () => onSubmit() : () => handleNext()}
                                        className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>)
            )}
        </Stepper>
    </div>


Register.propTypes = {
    error : propTypes.string.isRequired,
    fields : propTypes.array.isRequired,
    steps : propTypes.number.isRequired,
    loading : propTypes.bool.isRequired,
    name : propTypes.string.isRequired,
    login : propTypes.string.isRequired,
    password : propTypes.string.isRequired,
    repeat : propTypes.string.isRequired,
    image : propTypes.object.isRequired,
    disabled : propTypes.bool.isRequired,
    activeStep : propTypes.number.isRequired,
    handleBack : propTypes.func.isRequired,
    handleNext : propTypes.func.isRequired,
    onSubmit : propTypes.func.isRequired,
    onNameChange : propTypes.func.isRequired,
    onLoginChange : propTypes.func.isRequired,
    onImageChange : propTypes.func.isRequired,
    onPasswordChange : propTypes.func.isRequired,
    onConfirmPasswordChange : propTypes.func.isRequired
}


export default withStyles(style)(Register)
