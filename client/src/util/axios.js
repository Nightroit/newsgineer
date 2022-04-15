import axios from 'axios'

export default function(type, data, callback) {
    if(type == "post") {
       
        axios.post('http://localhost:5000/api/post', {content: data.content}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
        return;
    }
    
    if(type == "like") {
        axios.post('http://localhost:5000/api/like', {postId: data.postId, username: data.username}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
        return;
    }

    if(type == "feed") {
        console.log("HERE")
        axios.post('http://localhost:5000/api/', {skip: data.pageNo}, { headers: {"Authorization" : `${data.token}`} })
            .then((data) => {
                callback(data, null) 
            });
     return;
    }
    if(type = "categoryFilter") {
        
        axios.post('http://localhost:5000/api/', {category: data.category}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
    } 


    if(type == "login") {
        axios.post('http://localhost:5000/api/users/login', {
            username: data.username, 
            password: data.password
        })
        .then(data => {
            callback(data, null);
        })
        .catch(err => {

            callback(null, err);
        })
        return;
    } 
    if(type == "register") {
        axios.post('http://localhost:5000/api/users/register', {
            name: data.username,
            email: data.email, 
            password: data.password, 
            password2: data.confirmPassword
        })
        .then(res => {
            if(res.data.alreadyExists) {
                callback(null, "Username already exists")
            } else  callback(res, null);
        })
        .catch(err => {
            callback(null, err);
        })
        return;
    }
}