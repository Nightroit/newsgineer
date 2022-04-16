export function likeOrLikes(num) {
    if(num == 1) return " like | "; 
    return " likes | "
}

export function turnCate(string) {
    if(string.length > 70) {
        string = string.substr(0, 70); 
        string = string + "..."
    }
    return string; 
}