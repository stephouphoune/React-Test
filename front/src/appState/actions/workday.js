import * as types from '../types/workday'

const requestWorkdays = () => ({
    type: types.REQUEST_GET_WORKDAYS
})

const receiveWorkdays = (workdays = []) => ({
    type: types.RECEIVE_GET_WORKDAYS,
    workdays
})

export const requestGetWorkdays = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestWorkdays())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/workdays`, {
        method: 'GET',
    })
    
    //Résultats du fetch
    .then(response => {
        //Résultat reponse : par défaut cela va dans le <header>
        if (response.status !== 200) {
            throw Error('')
        }
        //Permet de traduire la réponse en format texte pour que body puisse lire
        return response.text()
    })
    //Résultat <body>
    .then(body => {
            //Pas besoin de try catch dans les promise même avec JSON.parse()
            const data=JSON.parse(body)
            const { workdays } = data
            dispatch(receiveWorkdays(workdays))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveWorkdays())
    })
}