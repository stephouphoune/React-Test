import React, { Component } from 'react';
import {AutoComplete} from 'antd';
import './TaskEdit.css';

class TaskEdit extends Component{

  state = {
    dataSource: [],
    searchDataSource: [],
    isSearching: false
  }

  componentDidMount() {
    this.loadDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data === this.props.data) return;

    this.loadDataSource(nextProps)
  }

  loadDataSource = props => {
    const {
      data,
      dataNameKey
    } = props;

    this.setState({
      dataSource: data.map(item => item[dataNameKey])
    })
  }

  handleSearch = (query) => {
    this.props.onSelect();

    if (!query) {
      return this.setState({
        isSearching: false
      })
    }

    const searchDataSource = this.state.dataSource.filter(name =>
      name.toLowerCase().indexOf(query.toLowerCase()) === 0
    );

    this.setState({
      searchDataSource,
      isSearching: true
    })
  
  }

  handleSelect = (name) => {
    const {
      onSelect,
      data,
      dataNameKey
    } = this.props

    const selectedItem = data.find(item => item[dataNameKey] === name)

    onSelect(selectedItem)
  }

  render(){
    const {
      selectedData,
      dataNameKey
    } = this.props
    const value = selectedData
      ? selectedData[dataNameKey]
      : null
    console.log(this.props)
    return(
      <AutoComplete
        style={{ marginRight: 5 }}
        size="large"
        allowClear
        value={value}
        dataSource={this.state.isSearching
          ? this.state.searchDataSource
          : this.state.dataSource
        }
        onSelect={this.handleSelect}
        onSearch={this.handleSearch}
        placeholder={this.props.placeholder}
      />
    )
  }
}
export default TaskEdit;
