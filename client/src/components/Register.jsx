import React from 'react'
import propTypes from 'prop-types'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Content from '../components/RegisterContent'


const Register = ({
    root,
    error,
    fields,
    button,
    steps,
    activeStep,
    actionsContainer,
    handleBack,
    handleNext,
    onNameChange,
    onLoginChange,
    onImageChange,
    onPasswordChange,
    onConfirmPasswordChange
}) =>
    <div className={root}>
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
                                     onNameChange={onNameChange}
                                     onLoginChange={onLoginChange}
                                     onImageChange={onImageChange}
                                     onPasswordChange={onPasswordChange}
                                     onConfirmPasswordChange={onConfirmPasswordChange}/>
                        </Typography>
                        <div className={actionsContainer}>
                            <div>
                                <Button disabled={activeStep === 0}
                                        onClick={() => handleBack()}
                                        className={button}>
                                    Back
                                </Button>
                                <Button variant="contained"
                                        color="primary"
                                        onClick={() => handleNext()}
                                        className={button}>
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
    activeStep : propTypes.number.isRequired,
    handleBack : propTypes.func.isRequired,
    handleNext : propTypes.func.isRequired,
    onNameChange : propTypes.func.isRequired,
    onLoginChange : propTypes.func.isRequired,
    onImageChange : propTypes.func.isRequired,
    onPasswordChange : propTypes.func.isRequired,
    onConfirmPasswordChange : propTypes.func.isRequired
}


export default Register
