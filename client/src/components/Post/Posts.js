import React from 'react'; 
import moment from 'moment'
import './Posts.css'

export default function({feed}){ 
    
    return (
        <div className = "posts">   
            <ul className = "postsUl">
                {feed.data.map((d, idx) => {

                    return (
                        <li className = "postLi">
                        <span className = "postIdx">{idx}.</span>
                            <a className = "postsLink" href = {"//" + d.post.content.link} target= "_blank">{d.post.content.heading} </a>
                        
                        <span className = "postDet">
                            <p className = "postsName">{ "By " + d.name }</p> &nbsp;
                            <p className = "postsTime">{" | "+ moment(d.time).fromNow()}</p>
                        </span>
                    </li>)
                })}
            </ul>
        </div>

    )
}