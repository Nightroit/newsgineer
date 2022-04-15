import request from '../util/axios'
import react, { useEffect, useState } from 'react'; 
import NavBar from './Post/NavBar';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

import Posts from './Post/Posts';
import CreatePost from '../components/Draft/CreatePost'
import ShortLister from './Sidebar/ShortLister'
import './Main.css'

function postSortComp(a, b) {
    if(a.upVotes > b.upVotes) return a; 
    return b; 
}

function Main({type, filterPost, page, token, filter}) {
    const [feed, setFeed] = useState({});
    const [isLoading, setIsloading] = useState(true); 
    const [pageNo, setPageNo] = useState(0);
    
    function navigatePlus() {
        let val = pageNo + 14
        setPageNo(val)
            request("feed", {token: localStorage.getItem('token'), pageNo: val}, function(data, err) { 
                if(data) {
                    setFeed(data);
                }
            })  
    }
    function navigateMinus() {
        let val = pageNo - 14
        setPageNo(val)
            request("feed", {token: localStorage.getItem('token'), pageNo: val}, function(data, err) { 
                if(data) {
                    setFeed(data);
                }
            })  
    }
    useEffect(() => {
            console.log('called')
            if(filter != "") {
            request('categoryFilter',  {category: filter, token: localStorage.getItem('token')}, function(data, err) {
                if(data) {
                    setFeed(data);  
                }
            })
            }
    }, [filter])
    useEffect(() => {
        if(Object.keys(feed).length != 0) {
            setIsloading(false)
        }
    }, [feed])
    
    useEffect(() => { 
        request("feed", {token: localStorage.getItem('token'), pageNo: 0}, function(data, err) { 
            if(data) {
                setFeed(data);
            }
        })
    }, [0])
    

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
                  
                    <span className = "main_navigate_span">
                    {(pageNo > 0) ? <a target = "_blank" onClick = {navigateMinus} className = "main_navigate">Back</a> : ''}
                    &nbsp;&nbsp;
                        <a target = "_blank" onClick = {navigatePlus} className = "main_navigate">Next</a>  
                    
                    </span>
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
