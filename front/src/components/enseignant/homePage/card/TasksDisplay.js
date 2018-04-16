import React, { Component } from 'react';
import { List, message, Avatar, Spin, Icon } from 'antd';
import './TasksDisplay.css';

const data =[
  {
   title: 'Enseignement - Cours - Programmation système',
   time: '1h30min',
 },
 {
   title: 'Enseignement - TD - Traitement de signal',
   time: '1h00min',
 },
 {
   title: 'Recherche - Thales Waves - Encadrement',
   time: '2h00min',
 },
 {
  title: 'Enseignement - Cours - Programmation système',
  time: '1h30min',
},
{
  title: 'Enseignement - TD - Traitement de signal',
  time: '1h30min',
},
{
  title: 'Recherche - Thales Waves - Encadrement',
  time: '3h00min',
},
{
 title: 'Enseignement - Cours - Programmation système',
 time: '1h00min',
},
{
 title: 'Enseignement - TD - Traitement de signal',
 time: '1h30min',
},
{
 title: 'Recherche - Thales Waves - Encadrement',
 time: '2h00min',
},
]
//differentes taches presentes dans la liste et modifiables

class TasksDisplay extends Component{
  state = {
    loading: true,
    loadingMore: false,
    data: [],
  }


  render(){
    return(
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item actions={[<a>edit</a>,<a>delete</a>]}>
                durée : {item.time}
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
      )}/>
    );
  }
}
export default TasksDisplay;
