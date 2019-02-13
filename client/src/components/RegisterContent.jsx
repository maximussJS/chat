import React from 'react'
import propTypes from 'prop-types'
import Input from '../components/Input'
import InputPassword from '../components/InputPassword'
import Grid from '@material-ui/core/Grid'


const RegisterContent = ({
    step,
    error,
    fields,
    onNameChange,
    onLoginChange,
    onImageChange,
    onPasswordChange,
    onConfirmPasswordChange
}) => {
    switch (step) {
        case 0:
            return (
                <Grid container direction='column'>
                    <Grid container md={6}>
                        <Input label='Input name'
                               onChange={onNameChange}/>
                    </Grid>
                    <Grid container md={6}>
                        <Input label='Input login'
                               onChange={onLoginChange}/>
                    </Grid>
                    {error && <span> {error} </span> }
                </Grid>
            )
        case 1:
            return (
                <Grid container direction='column'>
                    <Grid container md={6}>
                        <InputPassword label='Input password'
                                       onChange={onPasswordChange}/>
                    </Grid>
                    <Grid container md={6}>
                        <InputPassword label='Repeat password'
                                       onChange={onConfirmPasswordChange}/>
                    </Grid>
                    {error && <span> {error} </span> }
                </Grid>
            )
        case 2:
            return (
                <div>
                    <Input type={'file'}
                           onChange={onImageChange}
                           label={'Choose image'}/>
                    {error && <span> {error} </span>}
                </div>
            )
        default:
            return(
                <div>
                    <h4>Press Finish to end Registration</h4>
                    <h4>OR Press BACK if you didn`t agree with your settings</h4>
                </div>
            )
    }
}


RegisterContent.propTypes = {
    step : propTypes.number.isRequired,
    fields : propTypes.array.isRequired,
    error : propTypes.string.isRequired,
    onNameChange : propTypes.func.isRequired,
    onLoginChange : propTypes.func.isRequired,
    onImageChange : propTypes.func.isRequired,
    onPasswordChange : propTypes.func.isRequired,
    onConfirmPasswordChange : propTypes.func.isRequired
}


export default RegisterContent
