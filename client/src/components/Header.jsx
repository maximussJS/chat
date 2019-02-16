import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import style from '../theme/Header'


const Header = ({
    classes
}) => {
    const {root,menuButton,grow} = classes
    return (
        <div className={root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={menuButton}
                                color="inherit"
                                aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6"
                                color="inherit"
                                className={grow}>
                        Chat
                    </Typography>
                    <Button color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}


Header.propTypes = {
    classes : PropTypes.object.isRequired
}


export default withStyles(style)(Header)
