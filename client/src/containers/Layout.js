import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {deauthenticate} from '../utils/auth'
import {Logout} from '../redux/actions/auth'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body from '../components/Body'


const mapStateToProps = state => {}


const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onSubmit: Logout
    }, dispatch)


const Layout = props => {
    const {onSubmit, children, history} = props
    return (
        <div>
            <Header onLogout={() => {
                onSubmit()
                deauthenticate()
                history.push('/login')}
            }/>
                <Body>
                    {children}
                </Body>
            <Footer/>
        </div>
    )
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
