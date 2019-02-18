import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import MainPage from '../components/Main'
import {getMessages} from '../utils/requests'
import {isAuthenticated, getUser} from '../utils/auth'


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

    componentDidMount = () => {
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
                        this.socket.onopen = () => console.log(`Socket Connected to ${process.env.REACT_APP_WS_URL}`)
                        this.socket.onmessage = msg => this.addMessage(JSON.parse(msg.data))
                        this.socket.onclose = () => console.log('Socket closed')
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

    componentWillUnmount = () => this.socket.close()

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

    onClick = () => {
        const {text,user} = this.state
        this.socket.send(JSON.stringify({
            text : text,
            author : {
                login : user.login,
                image : user.image
            }
        }))
        this.addMessage({
            text : this.state.text,
            author : getUser()
        })
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
