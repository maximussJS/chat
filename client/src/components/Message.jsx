import React,{Fragment} from 'react'
import propTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


const Message = ({
    msg,
    inline
}) =>
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt={msg.author}
                    src={msg.author.image}/>
        </ListItemAvatar>
        <ListItemText primary="Summer BBQ"
                      secondary={
                <Fragment>
                    <Typography component="span"
                                className={inline}
                                color="textPrimary">
                        {msg.author}
                    </Typography>
                    {msg.text}
                </Fragment>}/>
    </ListItem>


Message.propTypes ={
    msg : propTypes.object.isRequired
}


export default Message
