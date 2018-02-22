import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { createSignIn } from '../../appState/actions/user'
import { Calendar } from 'antd';

import './Login.css'


function onPanelChange(value, mode) {
  console.log(value, mode);
}



class Login extends Component {

    //STATE
    state = {
        email: '',
        password: ''
    }


    render() {
        //Permet d'actualiser le state dans le render
        const { email, password } = this.state
        //permet d'actualiser les props dans le render
        const { signinLoading, signin, signinError} = this.props

        return (
            <div>
                <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar className="customCalendar" fullscreen={false} onPanelChange={onPanelChange} />
                </div>

                email 
                <input
                    type="text"
                    value={email}
                    onChange={event => this.setState({ email: event.target.value })}
                />
                password
                <input
                    type="text"
                    value={password}
                    onChange={event => this.setState({ password: event.target.value })}
                />
                <input
                    type="button"
                    value="OK"
                    onClick={() => signin(email, password)}
                />
                {signinLoading ? 'connexion en cours' : 'il se passe rien'}
                <div>
                    <b>{signinError}</b>
                    <br />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    signinLoading: store.user.signinLoading,
    signinError: store.user.signinError
})

const mapDispatchToProps = dispatch => ({
    signin: (email, password) => createSignIn(dispatch)(email, password)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
