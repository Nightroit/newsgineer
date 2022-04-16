import React from 'react'; 
import moment from 'moment'
import {likeOrLikes, turnCate} from  '../../util/utilityFunc'
import request from '../../util/axios'

import '../Post/Posts.css'




export default function ProfilePosts({posts, token}) {
    posts.map(d => {
        console.log(d);
    }) 
    
    function handleDelete(postId) {
        request("deletePost", {token, postId}, function(res, err) {
            if(res) {
                window.location.reload(); 
            } else {
                console.log("Something went wrong at postDelete component"); 
                console.log(err); 
            }
        })
    }
    
    return (
        //Ram//
        <div>
            <ul className = "postsUl">
                {posts.map((d, idx) => {
                    idx++; 

                    return (
                        <li className = "postLi">
                        <span className = "postIdx">{idx}.</span>
                        
                            <a className = "postsLink" href = {"//" + d.post.content.link} target= "_blank">{turnCate(d.post.content.heading)} </a>
                        
                        <span className = "postDet">
                            <p className = "postLikes">{d.upVotesLen + likeOrLikes(d.upVotesLen)}</p>&nbsp;
                            <p className = "postsName">{ " By " + d.name }</p> &nbsp;
                            <p className = "postsTime">{" | "+ moment(d.time).fromNow()}</p>
                            <p className = "postsDelete" onClick = {() =>{handleDelete(d._id)}}>Delete</p>
                        </span>
                    </li>)
                })}
            </ul>
        </div>
    )
}