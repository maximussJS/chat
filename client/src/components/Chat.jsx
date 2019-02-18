import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Message from '../components/Message'
import style from '../theme/Chat'


const Chat = ({
    classes,
    items
}) =>
    <div>
        <h3>
            Chat
        </h3>
        <GridList cellHeight={100}
                  cols={1}
                  spacing={1}
                  className={classes.gridList}>
            {items ?
                items.map(key => <Message msg={key}
                                          inline={classes.inline}/>)
                : 'No messages'
            }
        </GridList>
    </div>


Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    items : PropTypes.arrayOf(PropTypes.object).isRequired
}


export default withStyles(style)(Chat)
