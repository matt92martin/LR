import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegistrationForm from './forms/register'
import { withRouter } from 'react-router'


class App extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return (
            <div>
                <RegistrationForm />
            </div>
        );

    }
}



export default connect()(App)