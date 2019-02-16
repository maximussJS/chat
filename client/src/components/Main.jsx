import React from 'react'
import propTypes from 'prop-types'
import {withStyles} from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Input from '../components/Input'
import Chat from '../components/Chat'
import style from '../theme/Main'


const Main = ({
    classes,
    onInputChange
}) =>
    <Grid container
          className={classes.root}>
        <Grid container
              className={'chat-grid'}
              alignItems={'center'}
              direction={'column'}
              justify={'center'}>
            <h3>
                Chat
            </h3>
            <Chat className={'chat'}/>
            <Input label={'Text message'}
                   onChange={onInputChange}
                   fullWidth={false}/>
            <Button variant={'contained'}
                    color={'primary'}>
                Send
            </Button>
        </Grid>
    </Grid>


Main.propTypes = {
    classes : propTypes.object.isRequired
}


export default withStyles(style)(Main)
