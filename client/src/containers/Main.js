import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import Chat from '../components/Chat'
import {getMessages} from '../utils/requests'
import {isAuthenticated} from '../utils/auth'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages : []
        }
    }

    socket = new WebSocket(process.env.REACT_APP_WS_URL)

    componentDidMount = async () => {
        try {
            if(isAuthenticated()) {
                this.socket.onopen = () => console.log(`Socket Connected to ${process.env.REACT_APP_WS_URL}`)
                this.socket.onmessage = msg => this.addMessage(msg)
                this.socket.onclose = () => console.log('Socket closed')
            }
            else this.props.history.push('/login')
        }
        catch (e) {
            this.props.history.push('/error')
        }
    }

    componentWillUnmount = () => this.socket.close()

    addMessage = msg => this.setState(state => ({
        messages : [msg, ...state.messages]
    }))

    render() {
        return (
            <Chat/>
        )
    }
}


export default withRouter(Main)
