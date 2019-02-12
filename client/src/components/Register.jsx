import React from 'react'
import propTypes from 'prop-types'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const Register = ({
    steps,
    activeStep,
    classes,
    completed,
    handleStep,
    handleSkip,
    handleBack,
    handleNext,
    handleReset,
    totalSteps,
    isStepComplete,
    completedSteps,
    allStepsCompleted,
    isStepOptional,
    isStepSkipped,
    getStepContent
}) =>
    <div className={classes.root}>
        <Stepper alternativeLabel
                 nonLinear
                 activeStep={activeStep}>
            {/*{steps.map( (label,index) => {*/}
                {/*const props = {}*/}
                {/*if (isStepSkipped(index)) props.completed = false*/}
                {/*return (*/}
                    {/*<Step key={label}>*/}
                        {/*<StepButton*/}
                            {/*onClick={() => handleStep(index)}*/}
                            {/*completed={() => isStepComplete(index)}>*/}
                            {/*{label}*/}
                        {/*</StepButton>*/}
                    {/*</Step>*/}
                {/*)*/}
            {/*})}*/}
        </Stepper>
        <div>
            {allStepsCompleted() ? (
                <div>
                    <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
            ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}>
                            Next
                        </Button>
                        {isStepOptional(activeStep) &&
                        !completed.has(activeStep) && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSkip}
                                className={classes.button}>
                                Skip
                            </Button>
                        )}
                        {activeStep !== steps.length &&
                        (completed.has(activeStep) ? (
                            <Typography variant="caption" className={classes.completed}>
                                Step {activeStep + 1} already completed
                            </Typography>
                        ) : (
                            <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>


Register.propTypes = {
    steps : propTypes.array.isRequired,
    activeStep : propTypes.number.isRequired,
    classes : propTypes.object.isRequired,
    completed : propTypes.object.isRequired,
    handleStep : propTypes.func.isRequired,
    handleSkip : propTypes.func.isRequired,
    handleBack : propTypes.func.isRequired,
    handleNext : propTypes.func.isRequired,
    handleReset : propTypes.func.isRequired,
    totalSteps : propTypes.func.isRequired,
    isStepComplete : propTypes.func.isRequired,
    completedSteps : propTypes.func.isRequired,
    allStepsCompleted : propTypes.func.isRequired,
    isStepOptional : propTypes.func.isRequired,
    isStepSkipped : propTypes.func.isRequired,
    getStepContent : propTypes.func.isRequired,
}

export default Register
