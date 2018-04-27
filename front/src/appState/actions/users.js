import * as types from '../types/users'

const requestUser = () => ({
    type: types.REQUEST_GET_USERS
})

const receiveUser = (users = []) => ({
    type: types.RECEIVE_GET_USERS,
    users
})

export const requestGetUsers = dispatch => () => {
    //dispatch = envoi/utilisation de la méthode en argument
    dispatch(requestUser())
    
    //Un fetch se décompose en header/body/footer si on le souhaite. 
    //Méthode GET Pour obtenir la réponse du serveur (vérification des identifiants)
    fetch(`http://localhost:3001/api/users`, {
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
            const { users } = data
            dispatch(receiveUser(users))
    }).catch(() => {
        //Null pour faire ensuite des tests avec des expressions ternaires
        dispatch(receiveUser())
    })
}