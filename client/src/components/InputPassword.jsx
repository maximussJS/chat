import React,{Component} from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'


class InputPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword : false
        }
    }

    showPasswordChange = () => this.setState(state => ({
        showPassword : !state.showPassword
    }))

    render() {
        const {value,onChange,label,fullWidth = true, helper = false, helperText, margin = 'normal',
               error = ''} = this.props
        const {showPassword} = this.state
        return (
            <FormControl fullWidth={fullWidth} margin={margin}>
                <InputLabel error={error}>{label}</InputLabel>
                <Input type={showPassword ? 'text' : 'password'}
                       value={value}
                       onChange={onChange}
                       error={error}
                       endAdornment={
                        <InputAdornment position="end">
                            <IconButton error={error}
                                        className={error ? 'error' : null}
                                        onClick={this.showPasswordChange}
                                        color={'primary'}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {helper && <FormHelperText error={error}>{helperText}</FormHelperText>}
            </FormControl>
        )
    }
}


InputPassword.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
    helper: PropTypes.bool,
    helperText: PropTypes.string,
    margin: PropTypes.string,
    error: PropTypes.bool,
}


export default InputPassword
