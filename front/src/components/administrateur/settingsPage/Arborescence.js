import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Tree, Button, Icon, Input, message} from 'antd';
import DropdownMenu from './DropdownMenu'
import { postActivity, modifyActivity } from '../../../appState/actions/activity'
import { postProject, modifyProject } from '../../../appState/actions/project'
import { postTask, modifyTask } from '../../../appState/actions/task'
import './Arborescence.css';

const TreeNode = Tree.TreeNode;

const isANumber = value => {
    return typeof value === 'number' && !isNaN(value)
}

class Arborescence extends Component{

    state = {
        selectedName:'',
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
        const selectedName = node.props.title
        const key = node.props.eventKey
        const {
            activityIndex,
            projectIndex,
            taskIndex
        } = this.getInfoFromTreeNodeKey(key)
        const { y, height } = clickedElement.getBoundingClientRect()

        this.setState({
            selectedName,
            menuVisible: true,
            menuLeft: pageX,
            menuTop: y + height,
            activityIndex,
            projectIndex,
            taskIndex,
            mode: 'normal',
            activityInput: '', 
            projectInput: '',
            taskInput: ''
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
            /*const activity = this.props.activities.find(activity => activity.name === this.state.selectedName)
            this.props.deleteActivity(activity.id)
            message.success(`"${this.state.selectedName}" a bien été supprimé !`);*/
        }
        if (this.getDeleteTargetEntity() === 'project'){
            /*const project = this.props.projects.find(project => project.name === this.state.selectedName)
            this.props.deleteProject(project.id)
            message.success(`"${this.state.selectedName}" a bien été supprimé !`)*/
        }
        if (this.getDeleteTargetEntity() === 'task'){
            /*const task = this.props.tasks.find(task => task.name === this.state.selectedName)
            this.props.deleteTask(task.id)
            message.success(`"${this.state.selectedName}" a bien été supprimé !`)*/
        }
    }

    handleNodeModify = () => {
        this.setState({
            mode: 'modify',
            activityInput: this.props.nodeTree[this.state.activityIndex].name,
        })
        if (isANumber(this.state.projectIndex))
        {
            const projectInput = this.props.nodeTree[this.state.activityIndex].projects[this.state.projectIndex].name
            this.setState({
                projectInput
            })
        }
        if (isANumber(this.state.taskIndex))
        {
            const taskInput = this.props.nodeTree[this.state.activityIndex].projects[this.state.projectIndex].tasks[this.state.taskIndex].name
            this.setState({
                taskInput
            })
        }
    }

    handleNodeAdd = () => {
        this.setState({
            mode: 'add',
            activityInput: this.props.nodeTree[this.state.activityIndex].name,
            
        })
        if (isANumber(this.state.projectIndex))
        {
            const projectInput = this.props.nodeTree[this.state.activityIndex].projects[this.state.projectIndex].name
            this.setState({
                projectInput
            })
        }
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
        if (this.state.mode==='normal' && this.state.activityInput!==''){
            this.props.postActivity({name:this.state.activityInput})
            this.setState({
                activityInput:'',
                mode:'normal'
            })
            message.success(`'${this.state.activityInput}' a bien été ajouté en tant qu'activité' !`)
        }
        if (this.getTargetEntity() === 'project' && this.state.mode === 'add' && this.state.projectInput!==''){
            const activity = this.props.activities.find(activity => activity.id === this.props.nodeTree[this.state.activityIndex].id)
            this.props.postProject({name:this.state.projectInput, activityId:activity.id})
            this.setState({
                activityInput:'',
                projectInput:'',
                mode:'normal'
            })
            message.success(`'${this.state.projectInput}' a bien été ajouté en tant que projet !`)
        }
        if (this.getTargetEntity() === 'task' && this.state.mode === 'add' && this.state.taskInput!==''){
            const project = this.props.projects.find(project => project.id === this.props.nodeTree[this.state.activityIndex].projects[this.state.projectIndex].id)
            this.props.postTask({name: this.state.taskInput, projectId: project.id})
            this.setState({
                activityInput:'',
                projectInput:'',
                taskInput:'',
                mode:'normal'
            })
            message.success(`'${this.state.taskInput}' a bien été ajouté en tant que tâche !`)
        }
        if (this.getTargetEntity() === 'activity' && this.state.mode === 'modify' && this.state.activityInput!==''){
            const activity = this.props.activities.find(activity => activity.id === this.props.nodeTree[this.state.activityIndex].id)
            this.props.modifyActivity({name:this.state.activityInput, activityId:activity.id})
            this.setState({
                activityInput:'',
                mode:'normal'
            })
            message.success(`La modification a bien été prise en compte !`)
        }
        if (this.getTargetEntity() === 'project' && this.state.mode === 'modify' && this.state.projectInput!==''){
            const project = this.props.projects.find(project => project.id === this.props.nodeTree[this.state.activityIndex].projects[this.state.projectIndex].id)
            this.props.modifyProject({name:this.state.projectInput, projectId:project.id})
            this.setState({
                activityInput:'',
                projectInput:'',
                mode:'normal'
            })
            message.success(`La modification a bien été prise en compte !`)
        }
        /*if (this.getTargetEntity() === 'task' && this.state.mode === 'modify' && this.state.taskInput!==''){
            const task = this.props.tasks.find(task => task.id === this.props.nodeTree[this.state.activityIndex].projects[this.state.projectIndex].tasks[this.state.taskIndex].id)
            this.props.modifyTask({name: this.state.taskInput, taskId: task.id})
            this.setState({
                activityInput:'',
                projectInput:'',
                taskInput:'',
                mode:'normal'
            })
            message.success(`La modification a bien été prise en compte !`)
        }*/
        
    }

    onClickCancel = () => {
        this.setState({
            mode:'normal',
            activityInput:''
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
                checkable
                className="Tree"
                showLine
                onRightClick={this.handleRightClick}
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
    nodeTree: createNodeTreeFromStore(store),
    activities: store.activity.activities,
    tasks: store.task.tasks,
    projects: store.project.projects
})

const mapDispatchToProps = (dispatch) => ({
    postActivity: postActivity(dispatch),
    postProject: postProject(dispatch),
    postTask: postTask(dispatch),
    modifyActivity: modifyActivity(dispatch),
    modifyProject: modifyProject(dispatch),
    modifyTask: modifyTask(dispatch),
})

export default connect(mapStoreToProps, mapDispatchToProps)(Arborescence);
