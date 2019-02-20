import React from 'react'
import propTypes, {object} from 'prop-types'
import {withStyles} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import Input from '../components/Input'
import Chat from '../components/Chat'
import style from '../theme/Main'


const Main = ({
    classes,
    items,
    error,
    text,
    online,
    disabled,
    onInputChange,
    onClick
}) =>
    <div>
        <h2>
            Online : {online}
        </h2>
        <Chat items={items}/>
        <Input label={'Text message'}
               onChange={onInputChange}
               fullWidth={true}
               value={text}
               error={error}
               helper={error}
               helperText={error}/>
        <Button variant={'contained'}
                color={'primary'}
                disabled={disabled}
                className={'center'}
                onClick={onClick}>
    Send
</Button>
    </div>


Main.propTypes = {
    classes : propTypes.object.isRequired,
    items : propTypes.arrayOf(object).isRequired,
    text : propTypes.string.isRequired,
    error : propTypes.string.isRequired,
    online : propTypes.number.isRequired,
    disabled : propTypes.bool.isRequired,
    onClick : propTypes.func.isRequired,
    onInputChange : propTypes.func.isRequired,
}


export default withStyles(style)(Main)
