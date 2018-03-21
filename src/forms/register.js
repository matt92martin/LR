import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestRegisterUser, postRegisterUser } from '../actions/actions'


class RegistrationForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event){
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('Form submitted');
        this.props.dispatch(postRegisterUser(this.state.username, this.state.password));

    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input type="email"
                               value={this.state.username}
                               onChange={this.handleInputChange}
                               name="username"/>
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password"
                               value={this.state.password}
                               onChange={this.handleInputChange}
                               name="password"/>
                    </label>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}


export default connect()(RegistrationForm)