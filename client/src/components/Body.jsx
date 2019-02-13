import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import style from '../theme/Body'


const Body = ({
    classes,
    children
}) =>
    <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <Grid container>
            <Grid container
                  md={2}/>
            <Grid container
                  xs={12}
                  md={8}
                  justify={'center'}
                  alignItems={'center'}>
                {children}
            </Grid>
            <Grid container md={2}/>
        </Grid>
        <div className={classes.drawerHeader} />
    </main>


Body.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    body: PropTypes.element
}


export default withStyles(style, {
    withTheme: true
})(Body)
