import React from 'react'
import PropTypes from 'prop-types'
import MuiInput from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'


const Input = props => {
    const {label,type = 'text',value,onChange,helper = false,helperText,fullWidth = true,margin = 'normal',
           multiline = false, error = false} = props
    return (
        <FormControl fullWidth={fullWidth}
                     margin={margin}>
            <InputLabel error={error}>
                {label}
            </InputLabel>
            <MuiInput error={error}
                      multiline={multiline}
                      rows="8"
                      type={type}
                      value={value}
                      onChange={onChange}/>
            {helper &&
            <FormHelperText error={error}>
                {helperText}
            </FormHelperText>}
        </FormControl>
    )
}


Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    helper: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool,
    margin: PropTypes.string,
    multiline: PropTypes.bool,
}


export default Input
