export default function (state = true, action) {
    switch(action.type) {
        case 'FLIP': 
            return !state;
        default: 
            return state; 
    }
}