let defaultState = {
    auth: false, 
    username: ""
}
export default function (state = defaultState, action) {
    switch(action.type) {
        case 'AUTHENTICATED':
            return {auth: true}
        case 'DETAILS_UPDATE': 
            return  {auth: true, username: action.payload}
        case 'UNAUTHENICATED': 
            return {auth: false}
        default: 
            return state; 
    }
}