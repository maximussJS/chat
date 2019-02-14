import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import style from '../theme/LoginIcon'


const LoginIcon =({
    classes
}) =>
    <SvgIcon className={classes.iconHover}
             color="error"
             style={{
                 fontSize: 30
             }}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>


LoginIcon.propTypes = {
    classes: PropTypes.object.isRequired,
}


export default withStyles(style)(LoginIcon)
