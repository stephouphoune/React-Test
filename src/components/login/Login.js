import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestSignIn } from '../../appState/actions/user'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    render() {
        const { email, password } = this.state
        const { isSignIn, signin, emailUser } = this.props

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
                {isSignIn ? 'connection en cours' : 'il se passe rien'}
                {'   '} email: {emailUser}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isSignIn: state.user.isSignIn,
    emailUser: state.user.email
})

const mapDispatchToProps = dispatch => ({
    signin: (email, password) => dispatch(requestSignIn(email, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
