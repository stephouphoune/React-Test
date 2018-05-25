import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Calendar, message } from 'antd';
import { createSignIn } from '../../appState/actions/user'
import './Login.css'

class Login extends Component {

    //----------------STATE
    state = {
        username: '',
        password: ''
    }

    connexion = () => {
        this.props.signin(this.state.username, this.state.password)
    }

    render() {
        //Permet d'actualiser le state dans le render
        const { username, password } = this.state
        //permet d'actualiser les props dans le render
        const { signinLoading, signin, signinError} = this.props

        return (
            <div className="Login">
                    <Form.Item className="LoginForm">
                            <img src="./isen.png" className="Isen"/>
                            <img src="./task-eat.png" className="TaskEat"/>
                        <Input 
                            className="InputUsername"
                            value={username}
                            onChange={event => this.setState({ username: event.target.value })} 
                            prefix={<Icon 
                                        type="user" 
                                        style={{ 
                                            color: 'rgba(0,0,0,.25)' 
                                        }} 
                                    />} 
                            placeholder="Username" />
                        <Input 
                            className="InputPassword"
                            value={password}
                            onChange={event => this.setState({ password: event.target.value })} 
                            prefix={<Icon 
                                        type="lock" 
                                        style={{ 
                                            color: 'rgba(0,0,0,.25)'
                                        }} 
                                    />} 
                            type="password"
                            placeholder="Password" />
                        <Button 
                            className="ButtonLogin"
                            onClick={this.connexion}
                            loading={signinLoading ? true : false}
                            type="primary" 
                            htmlType="submit"
                            icon="key">
                        Connexion
                        </Button>
                    </Form.Item> 
            </div>
        );
    }
}

const mapStateToProps = store => ({
    signinLoading: store.user.signinLoading,
    signinError: store.user.signinError
})

const mapDispatchToProps = dispatch => ({
    signin: (username, password) => createSignIn(dispatch)(username, password)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps, 
)(Login)
