import request from '../util/axios'
import react, { useEffect, useState } from 'react'; 
import NavBar from './Post/NavBar';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

import Posts from './Post/Posts';
import CreatePost from '../components/Draft/CreatePost'
import ShortLister from './Sidebar/ShortLister'
import './Main.css'

function Main({type, filterPost, page, token, filter}) {
    const [feed, setFeed] = useState({})
    const [isLoading, setIsloading] = useState(true); 

 
        useEffect(() => {
            if(filter != "") {
            request('categoryFilter',  {category: filter, token: localStorage.getItem('token')}, function(data, err) {
                if(data) {
                    setFeed(data);  
                }
            })
            }
        }, [filter])
    
    useEffect(() => { 
        request("feed", localStorage.getItem('token'), function(data, err) {
            if(data) {
                setFeed(data)
            }
        })
    }, [1])
    
    useEffect(() => {
        if(Object.keys(feed).length != 0) {
            setIsloading(false)
        }
    }, [feed])

    if(isLoading) {
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        
        <div className = "main_head">
            <NavBar type = {type}/>

            <main>
                <div className = "main_sidebar">
                    <ShortLister filterPost = {filterPost}/>
                </div>
                <div className = "main_post" >
                    {(page == "post") ? <CreatePost/> : <Posts feed = {feed}/>}
                  
                </div>
                
            </main>
        </div>
    )
}

const mapDispatchToProps = {
    type: actions.type,
    filterPost: actions.filterPost
  }
  
  const mapStateToProps = (store) => {
    return {
        page: store.pageReducer, 
        filter: store.postReducer
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
