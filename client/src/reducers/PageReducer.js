export default function (state = "main", action) {
    switch(action.type) {
        case 'TYPE': 
            return action.payload;
       
        default: 
            return "main"; 
    }
}