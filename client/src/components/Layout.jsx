import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body from '../components/Body'


const Layout = props => {
    return (
        <div>
            <Header/>
            <Body>
                 {props.children}
            </Body>
            <Footer/>
        </div>
    )
}


export default Layout
