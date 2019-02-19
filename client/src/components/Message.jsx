import React,{Fragment} from 'react'
import propTypes from 'prop-types'
import GridListTile from '@material-ui/core/GridListTile'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


const Message = ({
    tile,
    msg,
    inline,
}) =>
    <GridListTile className={inline}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={msg.login}
                        src={msg.image}/>
            </ListItemAvatar>
            <ListItemText primary={msg.text}
                          secondary={
                              <Fragment>
                                  <Typography component="span"
                                              className={inline}
                                              color="textPrimary">
                                      {msg.login}
                                  </Typography>
                              </Fragment>}/>
        </ListItem>
    </GridListTile>


Message.propTypes ={
    msg : propTypes.object.isRequired
}


export default Message
