import React, { Component } from 'react';
import { Tree, Button, Icon, Input} from 'antd';
import './Arborescence.css';

const TreeNode = Tree.TreeNode;

class Arborescence extends Component{
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

  render(){
    return(
        <div>
            <Tree
                className="Tree"
                showLine
                defaultExpandedKeys={['0-0']}
                onSelect={this.onSelect}
            >
                <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0">
                    <TreeNode title="leaf" key="0-0-0-0" />
                    <TreeNode title="leaf" key="0-0-0-1" />
                    <TreeNode title="leaf" key="0-0-0-2" />
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title="leaf" key="0-0-1-0" />
                </TreeNode>
                <TreeNode title="parent 1-2" key="0-0-2">
                    <TreeNode title="leaf" key="0-0-2-0" />
                    <TreeNode title="leaf" key="0-0-2-1" />
                </TreeNode>
                </TreeNode>
            </Tree>
            <Button className="plus_button2" shape="circle">
                <Icon type="plus" />
            </Button>
            <Input style={{maxWidth:200}} size="large" placeholder="Ma nouvelle activité" />
        </div>
    );
  }
}
export default Arborescence;
