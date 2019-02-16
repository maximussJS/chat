import React from 'react'
import propTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import style from '../theme/Loader'


const Loader = ({
    classes
}) =>
    <div>
        <h2 className={'responsive'}>
            Loading...
        </h2>
        <CircularProgress className={classes.progress}/>
    </div>


Loader.propTypes = {
    classes: propTypes.object.isRequired
}


export default withStyles(style)(Loader)
