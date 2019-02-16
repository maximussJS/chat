import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import MainPage from '../components/Main'
import {getMessages} from '../utils/requests'
import {isAuthenticated} from '../utils/auth'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages : [],
            text : '',
            disabled : true,
            error : ''
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

    onInputChange = e => {
        this.setState({
            text : e.target.value,
            disabled : false
        })
        if(this.state.text.trim().length === 0) this.setState({
            error : 'Text field is empty'
        })
    }

    addMessage = msg => this.setState(state => ({
        messages : [msg, ...state.messages]
    }))

    onClick = () => {
        this.addMessage({
            text : this.state.text
        })
    }

    render() {
        return (
            <MainPage onInputChange={this.onInputChange}/>
        )
    }
}


export default withRouter(Main)
