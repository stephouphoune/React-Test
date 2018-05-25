import React, { Component } from 'react';
import {Row, Col, Select, Button} from 'antd';
import { connect } from 'react-redux'
import { requestGetUsers } from '../../../appState/actions/users'
import { connectionAdmin } from '../../../appState/actions/admin'
import './Administration.css';



class Administration extends Component{

    componentDidMount = () => {
        this.props.requestGetUsers()
    }

    state = {
        loading: false,
        iconLoading: false,
        username:null,
        userSelected:false
    }

    connection = () => {
        if (this.state.userSelected)
            this.props.connectionAdmin(this.state.username)
    }

    handleChange = (username) => {
        this.setState({
            username,
            userSelected:true
        })
    }

  render() {
    return (

        <div className="Administration">
            <Row type="flex" justify="center" className="Titre">
                <h1>Choix du compte Enseignant</h1>
            </Row>
            <Row type="flex" justify="center">
                <Select
                    showSearch
                    onChange={this.handleChange}
                    style={{ width: 220 }}
                    placeholder="Sélectionnez un enseignant"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.props.users.map(user => 
                        <Select.Option value={user.username}>{user.firstName+" "+user.lastName}</Select.Option>
                    )}
                </Select>
            </Row>
            <Row type="flex" justify="center" className="Connexion">
                <Button 
                    onClick={this.connection}
                    type="primary" 
                    icon="key" 
                >
                    Connexion
                </Button>
            </Row>
        </div>
    );
  }
}


const mapStateToProps = store => ({
    users: store.users.users,
  });
  
  const mapDispatchtoProps = dispatch => ({
    requestGetUsers: requestGetUsers(dispatch),
    connectionAdmin: connectionAdmin(dispatch)
  })
  
  export default connect(
    mapStateToProps, 
    mapDispatchtoProps
  )(Administration);