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
                    </Grid>
            )
        case 1:
            return (
                <div>
                    <Grid container direction='column'>
                        <Grid container md={6}>
                            <InputPassword label='Input password'
                                           onChange={onNameChange}/>
                        </Grid>
                        <Grid container md={6}>
                            <InputPassword label='Repeat password'
                                           onChange={onLoginChange}/>
                        </Grid>
                    </Grid>
                </div>
            )
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
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
