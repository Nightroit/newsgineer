import React from 'react'; 
import './NavBar.css'

export default function({type}) {

    function handleClick(data) {
        type(data)
    }

    function handleLogout() {
        localStorage.removeItem("token"); 
        window.location.reload(); 
    }

    return (
        
        <div className = "nav">
            <div className = "posts" >
                <h4 onClick = {()=> {handleClick("post")}}>
                    Post a news
                </h4>
            </div>
            <div className = "search" >
                <h4 onClick = {() => {(handleClick("search"))}}>
                    Profile
                </h4>
            </div>
            <div className = "jobs" >
                <h4 onClick = {() => {(handleClick("jobs"))}}>
                    Jobs
                </h4>
            </div>
            <div className = "news" >
                <h4 onClick = {() => {handleClick("news")}}>
                    News
                </h4>
            </div>
            <div className = "logout">
                <h4 onClick = {handleLogout}>
                    Logout
                </h4>
            </div>
        </div>
    )
}