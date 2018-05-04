import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Tree, Button, Icon, Input} from 'antd';
import DropdownMenu from './DropdownMenu'
import './Arborescence.css';

const TreeNode = Tree.TreeNode;

const isANumber = value => {
    return typeof value === 'number' && !isNaN(value)
}

class Arborescence extends Component{

    state = {
        menuVisible: false,
        menuLeft: 0,
        menuTop: 0,
        activityIndex: null,
        projectIndex: null,
        taskIndex: null,
        mode: 'normal', 
        activityInput:'',
        projectInput:'',
        taskInput:''
    }

    componentDidMount() {
        window.addEventListener('scroll', this.hideDropdownMenu)
        window.addEventListener('click', this.hideDropdownMenu)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hideDropdownMenu)
        window.removeEventListener('click', this.hideDropdownMenu)
    }

    hideDropdownMenu = () => {
        this.setState({
            menuVisible: false
        })
    }

    handleRightClick = ({ event, node }) => {
        const clickedElement = event.target
        const { pageX } = event
        const key = node.props.eventKey
        const {
            activityIndex,
            projectIndex,
            taskIndex
        } = this.getInfoFromTreeNodeKey(key)
        const { y, height } = clickedElement.getBoundingClientRect()

        this.setState({
            menuVisible: true,
            menuLeft: pageX,
            menuTop: y + height,
            activityIndex,
            projectIndex,
            taskIndex,
            mode:'normal'
        })
    }

    handleOptionSelect = (optionLabel) => {

        const actionMap = {
            ajouter: this.handleNodeAdd,
            supprimer: this.handleNodeDelete,
            modifier: this.handleNodeModify
        }

        actionMap[optionLabel]()
    }

    handleNodeDelete = () => {
        this.setState({
            mode: 'delete'
        })
        if (this.getDeleteTargetEntity() === 'activity'){
            console.log("activity delete")
        }
        if (this.getDeleteTargetEntity() === 'project'){
            console.log("project delete")
        }
        if (this.getDeleteTargetEntity() === 'task'){
            console.log("task delete")
        }
    }

    handleNodeModify = () => {
        this.setState({ mode: 'modify' })

    }

    handleNodeAdd = () => {
        this.setState({
            mode: 'add'
        })
        console.log('add')
    }

    getInfoFromTreeNodeKey = key => {
        const elementsIndex = key.split('-')
        const activityIndex = parseInt(elementsIndex[0], 10)
        const projectIndex = parseInt(elementsIndex[1], 10)
        const taskIndex = parseInt(elementsIndex[2], 10)
        return {
            activityIndex,
            projectIndex,
            taskIndex
        }
    }

    getMenuOptionsFromState = () => {
        const {
            activityIndex,
            projectIndex,
            taskIndex
        } = this.state;

        // une tache a été clicke
        if (!isNaN(taskIndex)) {
            return [
                'modifier',
                'supprimer'
            ]
        }

        return [
            'ajouter',
            'modifier',
            'supprimer'
        ]
    }

    getAddTargetEntity = () => {
        
        const {
            activityIndex,
            projectIndex,
            taskIndex
        } = this.state

        if (!isANumber(activityIndex)) {
            return 'activity';
        }

        if (!isANumber(projectIndex)){
            return 'project'
        }

        if (!isANumber(taskIndex)) {
            return 'task'
        }

        return 'activity';
    }

    getModifyTargetEntity = () => {
        const {
            activityIndex, 
            projectIndex, 
            taskIndex
        } = this.state

        if (!isANumber(activityIndex)) {
            return;
        }

        if (!isANumber(projectIndex)){
            return 'activity'
        }

        if (!isANumber(taskIndex)) {
            return 'project'
        }

        return 'task'
    }

    getDeleteTargetEntity = () => {
        const {
            activityIndex, 
            projectIndex, 
            taskIndex
        } = this.state

        if (!isANumber(activityIndex)) {
            return;
        }

        if (!isANumber(projectIndex)){
            return 'activity'
        }

        if (!isANumber(taskIndex)) {
            return 'project'
        }

        return 'task'
    }



    getTargetEntity = () => {
        const {
            mode
        } = this.state

        if (mode === 'add') {
            return this.getAddTargetEntity()
        }
        if (mode === 'modify') {
            return this.getModifyTargetEntity()
        }
    }

    handleChangeActivity = (event) =>
    {
        this.setState({
            activityInput:event.target.value
        })
    }

    handleChangeProject = (event) =>
    {
        this.setState({
            projectInput:event.target.value
        })
    }

    handleChangeTask = (event) =>
    {
        this.setState({
            taskInput:event.target.value
        })
    }

    onClickButton = () => {
        if (this.state.mode==='normal'){
            console.log("post activity")
        }
        if (this.getTargetEntity() === 'project' && this.state.mode === 'add'){
            console.log("post project")
        }
        if (this.getTargetEntity() === 'task' && this.state.mode === 'add'){
            console.log("post task")
        }
        if (this.getTargetEntity() === 'activity' && this.state.mode === 'modify'){
            console.log("modify activity")
        }
        if (this.getTargetEntity() === 'project' && this.state.mode === 'modify'){
            console.log("modify project")
        }
        if (this.getTargetEntity() === 'task' && this.state.mode === 'modify'){
            console.log("modify task")
        }
        
    }

    onClickCancel = () => {
        this.setState({
            mode:'normal'
        })
    }

  render(){

    const {
        nodeTree
    } = this.props

    const menuOptions = this.getMenuOptionsFromState()
    const targetEntity = this.getTargetEntity()

    return(
        <div
            style={{
                position: 'relative'
            }}
        >
            <Tree
                className="Tree"
                showLine
                onRightClick={this.handleRightClick}
                defaultExpandedKeys={['0-0']}
            >
                {nodeTree.map((activity, activityIndex) => (
                    <TreeNode
                        title={activity.name}
                        key={activityIndex}
                    >
                        {activity.projects.map((project, projectIndex) => (
                            <TreeNode
                                title={project.name}
                                key={`${activityIndex}-${projectIndex}`}
                            >
                                {project.tasks.map((task, taskIndex) => (
                                    <TreeNode
                                        title={task.name}
                                        key={`${activityIndex}-${projectIndex}-${taskIndex}`}
                                    />
                                ))}
                            </TreeNode>
                        ))}
                    </TreeNode>
                ))}
            </Tree>
            <DropdownMenu
                visible={this.state.menuVisible}
                style={{
                    left: `${this.state.menuLeft}px`,
                    top: `${this.state.menuTop}px`
                }}
                onSelect={this.handleOptionSelect}
                options={menuOptions}
            />
        
            <Input value={this.state.activityInput} onChange={this.handleChangeActivity} style={{maxWidth:200}} size="large" placeholder="Ma nouvelle activité" />
            {((targetEntity === 'project' || targetEntity === 'task') && this.state.mode!=='delete') &&
                <Input value={this.state.projectInput} onChange={this.handleChangeProject} style={{maxWidth:200}} size="large" placeholder="Mon nouveau projet" />
            }
            {targetEntity === 'task' && this.state.mode!=='delete' &&
                <Input value={this.state.taskInput} onChange={this.handleChangeTask} style={{maxWidth:200}} size="large" placeholder="Ma nouvelle tâche" />
            }
            
            <Button onClick={this.onClickButton} className="plus_button2" shape="circle">
                <Icon type="plus" />
            </Button>
            {this.state.mode!=='normal' && this.state.mode!=='delete' &&
                <Button onClick={this.onClickCancel}>
                    Annuler
                </Button>
            }
            
        </div>
    );
  }
}

const createNodeTreeFromStore = (store) => {
    const { activities } = store.activity
    const { projects } = store.project
    const { tasks } = store.task

    const nodeTree = activities.map(activity => {

        const activityProjects = projects
            .filter(project => project.activityId === activity.id)
            .map(project => {

                const projectTasks = tasks.filter(task => task.projectId === project.id)

                return {
                    ...project,
                    tasks: projectTasks
                }

            })

        return {
            ...activity,
            projects: activityProjects
        }

    })
    return nodeTree
}

const mapStoreToProps = (store) => ({
    nodeTree: createNodeTreeFromStore(store)
})

export default connect(mapStoreToProps)(Arborescence);
