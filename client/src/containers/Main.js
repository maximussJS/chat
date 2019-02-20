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
            online: '',
            user: {},
            text: '',
            disabled: true,
            error: '',
        }
        this.socket = new WebSocket(process.env.REACT_APP_WS_URL)
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({
                type : 'online',
                login : this.state.user.login
            }))
            this.socket.send(JSON.stringify({
                type : 'all'
            }))
        }
        this.socket.onmessage = msg => {
            msg = JSON.parse(msg.data)
            switch (msg.type) {
                case 'all' :
                    this.setState({
                        online : msg.data
                    })
                    break
                case 'message' :
                    this.addMessage(msg)
                    break
                default :
                    break
            }
        }
        this.socket.onclose = () => {
            this.socket.send(JSON.stringify({
                type : 'offline',
                login : this.state.user.login
            }))
        }
    }

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

    componentWillUnmount() {
        console.log('close socket')
        this.socket.close()
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
        messages : [...state.messages, msg],
        text : ''
    }))

    onClick = async () => {
        const msg = {
            type : 'message',
            text : this.state.text,
            login : this.state.user.login,
            image : this.state.user.image
        }
        this.socket.send(JSON.stringify(msg))
        this.addMessage(msg)
        const response = await createMessage(msg)
        if(!response.success) this.props.history.push('/error')
    }

    render() {
        const {messages,error,disabled,online,text} = this.state
        return (
            <MainPage items={messages}
                      error={error}
                      text={text}
                      online={online}
                      disabled={disabled}
                      onInputChange={this.onInputChange}
                      onClick={this.onClick}/>
        )
    }
}


export default withRouter(Main)
