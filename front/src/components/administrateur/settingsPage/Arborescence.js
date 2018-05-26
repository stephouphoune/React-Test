import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Tree, Button, Icon, Input, message} from 'antd';
import DropdownMenu from './DropdownMenu'
import { postActivity, modifyActivity, deleteActivity, setVisibilityActivity } from '../../../appState/actions/activity'
import { postProject, modifyProject, deleteProject, setVisibilityProject } from '../../../appState/actions/project'
import { postTask, modifyTask, deleteTask, setVisibilityTask } from '../../../appState/actions/task'
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
        activityInput: '',
        projectInput: '',
        taskInput: '',
        checkedKeys:[]
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
        })
        const activityNode = this.props.nodeTree[this.state.activityIndex]
        const projectNode = activityNode && activityNode.projects[this.state.projectIndex]
        const taskNode = projectNode && projectNode.tasks[this.state.taskIndex]
        if (this.getDeleteTargetEntity() === 'activity'){
            const activity = this.props.activities.find(activity => activity.id === activityNode.id)
            this.props.deleteActivity(activity.id)

            return
        }
        if (this.getDeleteTargetEntity() === 'project'){
            const project = this.props.projects.find(project => project.id === projectNode.id)
            this.props.deleteProject(project.id)
            return
        }
        if (this.getDeleteTargetEntity() === 'task'){
            const task = this.props.tasks.find(task => task.id === taskNode.id)
            this.props.deleteTask(task.id)
            return
        }
    }

    handleNodeModify = () => {
        const {
            nodeTree
        } = this.props
        const {
            activityIndex, 
            projectIndex,
            taskIndex
        } = this.state
        const activity = nodeTree[activityIndex]
        const project = activity && activity.projects[projectIndex]
        const task = project && project.tasks[taskIndex]

        this.setState({
            mode: 'modify',
            activityInput: activity ? activity.name : '',
            projectInput: project ? project.name : '',  
            taskInput: task ? task.name : ''
        })
    }

    handleNodeAdd = () => {
        const {
            nodeTree
        } = this.props
        const {
            activityIndex, 
            projectIndex,
            taskIndex
        } = this.state
        const activity = nodeTree[activityIndex]
        const project = activity && activity.projects[projectIndex]
        const task = project && project.tasks[taskIndex]

        this.setState({
            mode: 'add',
            activityInput: activity ? activity.name : '',
            projectInput: project ? project.name : '',  
            taskInput: task ? task.name : ''
        })
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
            this.props.postActivity({name:this.state.activityInput, isVisible:1})
            this.setState({
                activityInput:'',
            })
            message.success(`'${this.state.activityInput}' a bien été ajouté en tant qu'activité' !`)
            return;
        }
        if (this.state.mode === 'add' || this.state.mode === 'modify')
        {
            const activityNode = this.props.nodeTree[this.state.activityIndex]
            const projectNode = activityNode && activityNode.projects[this.state.projectIndex]
            const taskNode = projectNode && projectNode.tasks[this.state.taskIndex]
        
            if (this.getTargetEntity() === 'project' && this.state.mode === 'add' && this.state.projectInput!==''){
                const activity = this.props.activities.find(activity => activity.id === activityNode.id)
                this.props.postProject({name:this.state.projectInput, activityId:activity.id, isVisible:1})
                this.setState({
                    activityInput:'',
                    mode:'normal'
                })
                message.success(`'${this.state.projectInput}' a bien été ajouté en tant que projet !`)
                return
            }
            if (this.getTargetEntity() === 'task' && this.state.mode === 'add' && this.state.taskInput!==''){
                const project = this.props.projects.find(project => project.id === projectNode.id)
                this.props.postTask({name: this.state.taskInput, projectId: project.id, isVisible:1})
                this.setState({
                    activityInput:'',
                    mode:'normal'
                })
                message.success(`'${this.state.taskInput}' a bien été ajouté en tant que tâche !`)
                return
            }
            if (this.getTargetEntity() === 'activity' && this.state.mode === 'modify' && this.state.activityInput!==''){
                const activity = this.props.activities.find(activity => activity.id === activityNode.id)
                this.props.modifyActivity({name:this.state.activityInput, activityId:activity.id, isVisible:activity.isVisible})
                this.setState({
                    activityInput:'',
                    mode:'normal'
                })
                message.success(`La modification a bien été prise en compte !`)
                return
            }
            if (this.getTargetEntity() === 'project' && this.state.mode === 'modify' && this.state.projectInput!==''){
                const activity = this.props.activities.find(activity => activity.id === activityNode.id)
                const project = this.props.projects.find(project => project.id === projectNode.id)
                this.props.modifyProject({name:this.state.projectInput, projectId:project.id, activityId:activity.id, isVisible:project.isVisible})
                this.setState({
                    activityInput:'',
                    mode:'normal'
                })
                message.success(`La modification a bien été prise en compte !`)
                return
            }
            if (this.getTargetEntity() === 'task' && this.state.mode === 'modify' && this.state.taskInput!==''){
                const project = this.props.projects.find(project => project.id === projectNode.id)
                const task = this.props.tasks.find(task => task.id === taskNode.id)
                this.props.modifyTask({name: this.state.taskInput, taskId: task.id, projectId: project.id, isVisible:task.isVisible})
                this.setState({
                    activityInput:'',
                    mode:'normal'
                })
                message.success(`La modification a bien été prise en compte !`)
                return
            }
        }
    }

    onClickCancel = () => {
        this.setState({
            mode:'normal',
            activityInput:''
        })
    }

    onCheck = (checkedKeys, info) => {
        
        
        console.log(checkedKeys, info)
        const checked = info.checked

        const key = info.node.props.eventKey

        const {
            activityIndex,
            projectIndex,
            taskIndex
        } = this.getInfoFromTreeNodeKey(key)

        const activityNode = this.props.nodeTree[activityIndex]
        const projectNode = activityNode && activityNode.projects[projectIndex]
        const taskNode = projectNode && projectNode.tasks[taskIndex]

        if (!isANumber(projectIndex)){
            this.props.setVisibilityActivity({activityId:activityNode.id, isVisible:checked===true ? 1:0})
        }

        else if (!isANumber(taskIndex)) {
            this.props.setVisibilityProject({projectId:projectNode.id, isVisible:checked===true ? 1:0})
        }

        else {
            this.props.setVisibilityTask({taskId:taskNode.id, isVisible:checked===true ? 1:0})
        }
        this.setState({
            checkedKeys
        })
      }

    checkedKeys = () => {
    }

    disabledProjects = (activityIndex) => {
        if (this.props.nodeTree[activityIndex].isVisible === 0)
            return true
        return false
    }

    disabledTasks = (activityIndex, projectIndex) => {
        if (this.props.nodeTree[activityIndex].projects[projectIndex].isVisible === 0)
            return true
        return false
    }


    

  render(){

    const {
        nodeTree,
        checkedKeys
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
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                onRightClick={this.handleRightClick}
                checkStrictly
                //checkedKeys={this.checkedKeys}
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
                                disableCheckbox={this.disabledProjects(activityIndex)}
                            >
                                {project.tasks.map((task, taskIndex) => (
                                    <TreeNode
                                        title={task.name}
                                        key={`${activityIndex}-${projectIndex}-${taskIndex}`}
                                        disableCheckbox={this.disabledTasks(activityIndex, projectIndex)}
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

const checkedKeysFromStore = (store) => {
    const { activities } = store.activity
    const { projects } = store.project
    const { tasks } = store.task
    
    let checkedKeys = []

    activities.map((activity, activityIndex) => {
        
        if (activity.isVisible === 1)
            checkedKeys.push(`${activityIndex}`)
            projects.filter(project => project.activityId === activity.id)
        .map((project, projectIndex) => {
            
            if (activity.isVisible === 1 && project.isVisible === 1)
                checkedKeys.push(`${activityIndex}-${projectIndex}`)
                tasks.filter(task => task.projectId === project.id)
            .map((task, taskIndex) => {
                
                if (activity.isVisible === 1 && project.isVisible === 1 && task.isVisible === 1)
                    
                    checkedKeys.push(`${activityIndex}-${projectIndex}-${taskIndex}`)
            })


        })
    })
    return checkedKeys
}

const mapStoreToProps = (store) => ({
    nodeTree: createNodeTreeFromStore(store),
    checkedKeys: checkedKeysFromStore(store),
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
    deleteTask: deleteTask(dispatch),
    deleteProject: deleteProject(dispatch),
    deleteActivity: deleteActivity(dispatch), 
    setVisibilityTask: setVisibilityTask(dispatch),
    setVisibilityProject: setVisibilityProject(dispatch),
    setVisibilityActivity: setVisibilityActivity(dispatch)
})

export default connect(mapStoreToProps, mapDispatchToProps)(Arborescence);
