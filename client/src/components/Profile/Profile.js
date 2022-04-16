import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import request from '../../util/axios'
import ProfilePosts from './ProfilePosts'

function Profile({token, auth}) {
    const username = useSelector(state => state.authReducer.username);

    const [feed, selectPosts] = useState({}); 

    useEffect(() => {
        console.log(token); 
        request("profile", {username, token}, function(data, err) {
            if(data) {
                selectPosts(data); 
            } else {
                console.log("Something went wrong at profile component"); 
                console.log(err); 
            }
        })
    }, [1])
    console.log(auth); 
    if(Object.keys(feed).length == 0) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    return (
        <div>
            <h2>Hey! @{auth.username}</h2>
            <div className = "profilePosts">
                <h3>Your posts so far!</h3>
                <ProfilePosts posts = {feed.data.posts} token = {token}/>
            </div>
        </div>
    )
}

export default Profile; 