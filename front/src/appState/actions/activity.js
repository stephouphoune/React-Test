import * as types from '../types/activity'

const requestActivity = () => ({
    type: types.ACTIVITY_REQUEST
})

const receiveActivity = (activity_id, name) => ({
    type: types.ACTIVITY_RECEIVE,
    activity_id,
    name,
})

export const showActivity = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestActivity())

    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/activity`, {
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
        try{
            body=JSON.parse(body)
            dispatch(receiveActivity(body.activity_id, body.name))
        }
        catch(e)
        {
            return;
        }
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveActivity(null, null))
    })
}