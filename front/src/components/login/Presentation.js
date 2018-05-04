import React, { Component } from 'react';
import {Form, Card} from 'antd';
import './Presentation.css';

class Presentation extends Component {

    render() {
        return (
            <div className="Presentation">
                {/*Voir comment faire la route pour revenir sur l'écran d'accueil en cliquant sur image*/}<img src="./task-eat.png" className="TaskEat"/>
                <a href="http://isen-brest.fr"><img src="./isen.png" className="Isen"/></a>
                <div className="Texte">
                <Card style={{ width: 900 }}>
                    <p><h2>Task-eat est une application web de gestion d'activités enseignantes développé dans le cadre d'un projet de fin d'année 
                        de Master 1 au sein de l'école d'ingénieur <a href="http://isen-brest.fr">ISEN Brest</a> par deux étudiants de Master 1 : <a href="https://www.linkedin.com/in/thomas-orvain/">Thomas Orvain</a> et <a href="https://www.linkedin.com/in/stephane-perreaux/">Stéphane PERREAUX</a>.
                        <br/>
                        Leur encadrant de projet, Pierre-Jean Bouvet, enseignant chercheur utilisait un logiciel de gestion de tâches (Laboxy) depuis quelque temps, 
                        mais n'en était pas totalement satisfait. L'encadrant proposa donc aux étudiants de réaliser un logiciel
                        possédant de nouvelles fonctionnalités permettant de faire gagner du temps aux utilisateurs.
                        <br/>Le site se devait d'être plus ergonomique et d'intégrer une fonction d'analyse d'agenda.
                    </h2></p>
                </Card>
                </div>
            </div>
        );
    }
}

export default Presentation;
