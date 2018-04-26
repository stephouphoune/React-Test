import * as types from '../types/label'

const requestLabel = () => ({
    type: types.REQUEST_GET_LABELS
})

const receiveLabel = (labels = []) => ({
    type: types.RECEIVE_GET_LABELS,
    labels
})


export const requestGetLabels = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestLabel())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/label`, {
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
            const { labels } = data
            dispatch(receiveLabel(labels))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveLabel())
    })
}