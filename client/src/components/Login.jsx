import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Input from '../components/Input'
import InputPassword from '../components/InputPassword'
import Loader from '../components/Loader'
import Icon from '../components/LoginIcon'
import style from '../theme/Login'


const Login = ({
    classes,
    error,
    fields,
    loading,
    disabled,
    onSubmit,
    isDisabled,
    onLoginChange,
    onPasswordChange,
}) =>
    <div>
        {loading ?
            <Loader/>
            :
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Icon/>
                    </Avatar>
                    <Typography component="h1"
                                variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <Input label='Input Login'
                               onChange={onLoginChange}
                               error={error && fields[0] === 'login'}
                               helper={error && fields[0] === 'login'}
                               helperText={error}/>
                        <InputPassword onChange={onPasswordChange}
                                       label='Input Password'
                                       error={error && fields[0] === 'password'}
                                       helper={error && fields[0] === 'password'}
                                       helperText={error}/>
                        <FormControlLabel control={<Checkbox value="remember"
                                                             color="primary"/>}
                                          label="Remember me"/>
                        <Button type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                                disabled={loading || disabled || isDisabled() || fields.length !== 0}
                                className={classes.submit}>
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        }
    </div>


Login.propTypes = {
    classes : PropTypes.object.isRequired,
    error : PropTypes.string.isRequired,
    fields : PropTypes.array.isRequired,
    loading : PropTypes.bool.isRequired,
    disabled : PropTypes.bool.isRequired,
    onSubmit : PropTypes.func.isRequired,
    isDisabled : PropTypes.func.isRequired,
    onLoginChange : PropTypes.func.isRequired,
    onPasswordChange : PropTypes.func.isRequired
}


export default withStyles(style)(Login)
