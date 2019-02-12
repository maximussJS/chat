import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import style from '../theme/Footer'


const Footer = ({
    classes
}) => {
    const {appBar,toolbar} = classes
    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="fixed"
                    color="primary"
                    className={appBar}>
                <Toolbar className={toolbar}>
                    <IconButton color="inherit"
                                aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <IconButton color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
}


export default withStyles(style)(Footer)
