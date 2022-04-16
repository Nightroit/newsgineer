export default function (state = "", action) {
    switch(action.type) {
        case 'FILTER_POST': 
            return action.payload;
        default: 
            return state; 
    }
}