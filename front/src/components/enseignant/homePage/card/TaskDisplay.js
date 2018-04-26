import React, { Component } from 'react';
import { List, message, Avatar, Spin, Icon } from 'antd';
import './TaskDisplay.css';

const data =[
  {
   title: 'Enseignement - Cours - Programmation système',
   description:'Cours de Programmation système pour la promotion M1',
   time: '1h30min',
 },
 {
   title: 'Enseignement - TD - Traitement de signal',
   description:'Cours de Traitement de Signal pour la promotion CSI3',
   time: '1h00min',
 },
 {
  title: 'Enseignement - TD - Traitement de signal',
  description:'Cours de Traitement de Signal pour la promotion CSI3',
  time: '1h00min',
},
{
  title: 'Enseignement - TD - Traitement de signal',
  description:'Cours de Traitement de Signal pour la promotion CSI3',
  time: '1h00min',
},
{
  title: 'Enseignement - TD - Traitement de signal',
  description:'Cours de Traitement de Signal pour la promotion CSI3',
  time: '1h00min',
},
{
  title: 'Enseignement - TD - Traitement de signal',
  description:'Cours de Traitement de Signal pour la promotion CSI3',
  time: '1h00min',
},
{
  title: 'Enseignement - TD - Traitement de signal',
  description:'Cours de Traitement de Signal pour la promotion CSI3',
  time: '1h00min',
},
]
//differentes taches presentes dans la liste et modifiables

class TaskDisplay extends Component{
  state = {
    loading: true,
    loadingMore: false,
    data: [],
  }

  render(){
    return(
      <List
        className="TaskList"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item actions={[
                  <a>Modifier</a>,
                  <a>Supprimer</a>
                ]}>
                Durée : {item.time}
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
            </List.Item>
      )}/>
    );
  }
}
export default TaskDisplay;
