
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 2,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
    },
})

const Body = ({ classes, children }) => {
    return (
        <main className={classes.content}>
            <div className={classes.drawerHeader} />
            <Grid container>
                <Grid container md={2} />
                <Grid container xs={12} md={8} justify={'center'} alignItems={'center'}>
                    {children}
                </Grid>
                <Grid container md={2} />
            </Grid>
            <div className={classes.drawerHeader} />
        </main>
    )
}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    body: PropTypes.element,
}

export default withStyles(styles, { withTheme: true })(Body)
