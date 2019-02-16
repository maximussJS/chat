import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Message from '../components/Message'
import style from '../theme/Chat'


const Chat = ({
    classes,
    items
}) =>
    <List className={classes.root}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://res.cloudinary.com/maximuss/image/upload/v1549458036/p9ecrlyim4lgernt0hjy.png" />
            </ListItemAvatar>
            <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
            />
        </ListItem>
        {items ?
            items.map(key => <Message msg={key}
                                      inline={classes.inline}/>)
        : 'No messages'
        }
    </List>


Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    items : PropTypes.arrayOf(PropTypes.object).isRequired
}


export default withStyles(style)(Chat)
