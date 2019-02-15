import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {getUsers} from '../utils/requests'
import {isAuthenticated} from '../utils/auth'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users : []
        }
    }

    componentDidMount = async () => {
        try {
            if(isAuthenticated()) {
                const response = await getUsers()
                alert(JSON.stringify(response))
                response.success ? alert('Done') : this.props.history.push('/error')
            }
            else this.props.history.push('/login')
        }
        catch (e) {
            this.props.history.push('/error')
        }
    }

    render() {
        return (
            <div>hi</div>
        )
    }
}


export default withRouter(Main)
