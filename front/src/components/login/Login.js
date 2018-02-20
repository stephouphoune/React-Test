import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createSignIn } from '../../appState/actions/user'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    render() {
        const { email, password } = this.state
        const { signinLoading, signin, signinError } = this.props

        return (
            <div>
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
                {signinLoading ? 'connection en cours' : 'il se passe rien'}
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
