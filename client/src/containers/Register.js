import React,{Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import RegisterForm from '../components/Register'
import style from '../theme/Register'

const getSteps = ()  => ['Select campaign settings', 'Create an ad group', 'Create an ad']

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Step 1: Select campaign settings...';
        case 1:
            return 'Step 2: What is an ad group anyways?';
        case 2:
            return 'Step 3: This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            completed: {},
            skipped: {},
        }
    }

    totalSteps = () => getSteps().length;

    isStepOptional = step => step === 1;

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) throw new Error("You can't skip a step that isn't optional.")
        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            }
        })
    }

    handleNext = () => {
        let activeStep;
        if (this.isLastStep() && !this.allStepsCompleted()) {
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
        }
        else activeStep = this.state.activeStep + 1;
        this.setState({
            activeStep : activeStep
        })
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }))
    }

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        })
    }

    handleComplete = () => {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const completed = new Set(this.state.completed);
        completed.add(this.state.activeStep);
        this.setState({
            completed,
        })
        if (completed.size !== this.totalSteps() - this.skippedSteps()) {
            this.handleNext();
        }
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: new Set(),
            skipped: new Set(),
        })
    }

    skippedSteps() {
        return this.state.skipped.size;
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    isStepComplete(step) {
        return this.state.completed.has(step);
    }

    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps()
        return (
            <RegisterForm classes={classes}
                          activeStep={this.state.activeStep}
                          completed={this.state.completed}
                          steps={steps}
                          handleStep={this.handleStep}
                          handleSkip={this.handleSkip}
                          handleBack={this.handleBack}
                          handleNext={this.handleNext}
                          handleReset={this.handleReset}
                          totalSteps={this.totalSteps}
                          isStepComplete={this.isStepComplete}
                          completedSteps={this.completedSteps}
                          allStepsCompleted={this.allStepsCompleted}
                          isStepOptional={this.isStepOptional}
                          isStepSkipped={this.isStepSkipped}
                          getStepContent={getStepContent()}/>
        )
    }
}

export default withStyles(style)(Register)
