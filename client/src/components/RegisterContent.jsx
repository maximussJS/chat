import React from 'react'
import propTypes from 'prop-types'
import Input from '../components/Input'
import InputPassword from '../components/InputPassword'
import Grid from '@material-ui/core/Grid'


const RegisterContent = ({
    step,
    error,
    fields,
    name,
    login,
    password,
    repeat,
    image,
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
                               value={name}
                               onChange={onNameChange}
                               error={error && fields[0] === 'name'}
                               helper={error && fields[0] === 'name'}
                               helperText={error}/>
                    </Grid>
                    <Grid container md={6}>
                        <Input label='Input login'
                               value={login}
                               onChange={onLoginChange}
                               error={error && fields[0] === 'login'}
                               helper={error && fields[0] === 'login'}
                               helperText={error}/>
                    </Grid>
                </Grid>
            )
        case 1:
            return (
                <Grid container direction='column'>
                    <Grid container md={6}>
                        <InputPassword label='Input password'
                                       value={password}
                                       onChange={onPasswordChange}
                                       error={error && fields[0] === 'password'}
                                       helper={error && fields[0] === 'password'}
                                       helperText={error}/>
                    </Grid>
                    <Grid container md={6}>
                        <InputPassword label='Repeat password'
                                       value={repeat}
                                       onChange={onConfirmPasswordChange}
                                       error={error && fields[0] === 'repeat'}
                                       helper={error && fields[0] === 'repeat'}
                                       helperText={error}/>
                    </Grid>
                </Grid>
            )
        case 2:
            return (
                <div>
                    <Input type={'file'}
                           onChange={onImageChange}
                           label={'Choose image'}
                           value={image.filename}
                           error={error && fields[0] === 'image'}
                           helper={error && fields[0] === 'image'}
                           helperText={error}/>
                </div>
            )
        default:
            return(
                <div>
                    <h4>
                        Press Finish to end Registration
                    </h4>
                    <h4>
                        Or Press BACK if you did not agree with your settings
                    </h4>
                </div>
            )
    }
}


RegisterContent.propTypes = {
    step : propTypes.number.isRequired,
    fields : propTypes.array.isRequired,
    error : propTypes.string.isRequired,
    name : propTypes.string.isRequired,
    login : propTypes.string.isRequired,
    password : propTypes.string.isRequired,
    repeat : propTypes.string.isRequired,
    image : propTypes.object.isRequired,
    onNameChange : propTypes.func.isRequired,
    onLoginChange : propTypes.func.isRequired,
    onImageChange : propTypes.func.isRequired,
    onPasswordChange : propTypes.func.isRequired,
    onConfirmPasswordChange : propTypes.func.isRequired
}


export default RegisterContent
