import React, { Component } from 'react';
import {Row, Col, Select, Button} from 'antd';
import './Administration.css';


function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

class Administration extends Component{

    state = {
        loading: false,
        iconLoading: false,
    }

    enterLoading = () => {
        this.setState({ loading: true });
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
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
                    style={{ width: 220 }}
                    placeholder="Sélectionnez un enseignant"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Select.Option value="pbouve19">Pierre-Jean Bouvet</Select.Option>
                    <Select.Option value="mcabon19">Mickaël Cabon</Select.Option>
                    <Select.Option value="tnapol19">Thibault Napoléon</Select.Option>
                </Select>
            </Row>
            <Row type="flex" justify="center" className="Connexion">
                <Button 
                    type="primary" 
                    icon="key" 
                    loading={this.state.iconLoading} 
                    onClick={this.enterIconLoading}
                >
                    Connexion
                </Button>
            </Row>
        </div>
    );
  }
}

export default Administration;