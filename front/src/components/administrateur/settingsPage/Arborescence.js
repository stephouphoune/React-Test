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
                <TreeNode title="Enseignement" key="0-0">
                    <TreeNode title="Cours" key="0-0-0">
                        <TreeNode title="Traitement du signal" key="0-0-0-0" />
                        <TreeNode title="Programmation système" key="0-0-0-1" />
                    </TreeNode>
                    <TreeNode title="TD" key="0-0-1">
                        <TreeNode title="Traitement du signal" key="0-0-1-0" />
                    </TreeNode>
                    <TreeNode title="TP" key="0-0-2">
                        <TreeNode title="Traitement du signal" key="0-0-2-0" />
                        <TreeNode title="Programmation système" key="0-0-2-1" />
                    </TreeNode>
                </TreeNode>
                <TreeNode title="Administration" key="0-1">

                </TreeNode>
                <TreeNode title="Recherche" key="0-2">
                    <TreeNode title="Waves" key="0-2-0">
                        <TreeNode title="Encadrement" key="0-2-0-0" />
                        <TreeNode title="Publication" key="0-2-0-1" />
                    </TreeNode>
                    <TreeNode title="Thales" key="0-2-1">

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
