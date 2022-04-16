import React from 'react'; 
import Portal from '../Portal';
import './NavBar.css'

export default function({type, auth, logout}) {

    function handleClick(data) {
        type(data)
    }

    function handleLog(e) {
        if(e) { 
            logout(); 
            handleClick("login")
        } else {
            localStorage.removeItem("token"); 
            window.location.reload(); 
        }
    }
    console.log(auth);  
    return (
        
        <div className = "nav">
           
            {(auth.auth ?
                <div className = "posts" > 
                    <h4 onClick = {()=> {handleClick("post")}}>
                        Post a news
                     </h4>
                </div>
            : "")}
            
            <div className = "jobs" >
                <h4 onClick = {() => {(handleClick("jobs"))}}>
                    Jobs
                </h4>
            </div>
            
            {(auth.auth ? 
                <div className = "Profile">
                    <h4 onClick = {() => {(handleClick("profile"))}}>
                        Profile
                    </h4> 
                </div>
            : "")}
            
            <div className = "news" >
                <h4 onClick = {() => {handleClick("news")}}>
                    News
                </h4>
            </div>
            <div className = "logout">
                {(auth.auth) ? <h4 onClick = {() => {handleLog(0)}}>Logout </h4> : <h4 onClick = {() => {handleLog(1)}}>Login</h4>}
            </div>
        </div>
    )
}