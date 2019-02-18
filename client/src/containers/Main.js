import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import MainPage from '../components/Main'
import {isAuthenticated, getUser} from '../utils/auth'
import {getMessages, createMessage} from '../utils/requests'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            text: '',
            disabled: true,
            error: '',
        }
    }

    socket = new WebSocket(process.env.REACT_APP_WS_URL)

    componentDidMount() {
        if(isAuthenticated()) {
            this.setState({
                user: getUser()
            }, async () => {
                try {
                    const response = await getMessages()
                    if(response.success) {
                        this.setState({
                            messages : response.data
                        })
                    }
                    else this.props.history.push('/error')
                }
                catch (e) {
                    this.props.history.push('/error')
                }
            })
        }
        else this.props.history.push('/login')
    }

    componentWillMount() {
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({
                type : 'online',
                login : this.state.user.login
            }))
            this.socket.send(JSON.stringify({
                type : 'all'
            }))
        }
        this.socket.onmessage = msg => this.addMessage(JSON.parse(msg.data))
        this.socket.onclose = () => {
            this.socket.send(JSON.stringify({
                type : 'offline',
                login : this.state.user.login
            }))
            console.log('Socket Error')
        }
    }

    onInputChange = e => {
        this.setState({
            text : e.target.value,
            disabled : false,
            error : ''
        })
        if(this.state.text.trim().length === 0) this.setState({
            error : 'Text field is empty',
            disabled : true
        })
    }

    addMessage = msg => this.setState(state => ({
        messages : [...state.messages, msg]
    }))

    onClick = async () => {
        const msg = {
            type : 'message',
            text : this.state.text,
            author : {
                login : this.state.user.login,
                image : this.state.user.image
            }
        }
        this.socket.send(JSON.stringify(msg))
        this.addMessage(msg)
        const response = await createMessage(msg)
        if(!response.success) this.props.history.push('/error')
    }

    render() {
        const {messages,error,disabled} = this.state
        return (
            <MainPage items={messages}
                      error={error}
                      disabled={disabled}
                      onInputChange={this.onInputChange}
                      onClick={this.onClick}/>
        )
    }
}


export default withRouter(Main)
