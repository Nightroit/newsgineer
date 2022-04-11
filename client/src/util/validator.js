let text, rel;
export default function(input, type) {
    switch(type) {
        case "emaillogin": 
            return input.length >= 5 && input.length <= 15
            break;
        case "email":
                text = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
                rel = text.test(input);
                console.log(rel)
                return rel;
            break
        case "password":
            return input.length >= 8 && input.length <= 15;
            break
        case "link": 
            return input.length > 5;
        case "heading": 
            return input.length > 5;
    }
}