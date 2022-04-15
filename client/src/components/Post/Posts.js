import React from 'react'; 
import moment from 'moment'
import request from '../../util/axios'
import {useSelector} from "react-redux";

import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';import './Posts.css'

const buttonStyle = {
    height: '15px', 
    cursor: 'pointer'  
}

function turnCate(string) {
    if(string.length > 70) {
        string = string.substr(0, 70); 
        string = string + "..."
    }
    return string; 
}

function handleLike(username, postId) {
    console.log(username)
    request("like", {
        username, 
        postId, 
        token: localStorage.getItem('token')
    }, function(data, err) {
        if(err) {
            console.log("Something went while liking")
            console.log(err); 
        }
    })
}

function likeOrLikes(num) {
    if(num == 1) return " like | "; 
    return " likes | "
}

export default function({feed, auth}){ 
    const username = useSelector(state => state.authReducer.username);
    return (
        <div className = "posts">   
            <ul className = "postsUl">
                {feed.data.map((d, idx) => {
                    idx++; 

                    return (
                        <li className = "postLi">
                        <span className = "postIdx">{idx}.</span>
                        {(auth) ? <ChangeHistoryIcon style = {buttonStyle} onClick = {() => {handleLike(username, d._id)}} style={buttonStyle} className = "postLike"/>: ""}  
                        
                            <a className = "postsLink" href = {"//" + d.post.content.link} target= "_blank">{turnCate(d.post.content.heading)} </a>
                        
                        <span className = "postDet">
                            <p className = "postLikes">{d.upVotes.length + likeOrLikes(d.upVotesLen)}</p>&nbsp;
                            <p className = "postsName">{ " By " + d.name }</p> &nbsp;
                            <p className = "postsTime">{" | "+ moment(d.time).fromNow()}</p>

                        </span>
                    </li>)
                })}
            </ul>
        </div>

    )
}