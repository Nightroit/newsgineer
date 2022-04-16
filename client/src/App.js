import * as React from 'react';
import Main from './components/Main'
import { isExpired, decodeToken } from "react-jwt";
import * as actions from './actions/index'
import {connect} from 'react-redux'; 
import Portal from './components/Portal';


let token; 

class App extends React.Component {
  
  constructor(props) {
    super(props); 
    token = localStorage.getItem('token');
    if(isExpired(token)) {
      localStorage.removeItem("token"); 
    } else {
      let details = decodeToken(token); 
      props.detailsUpdate(details);
    }
  }
  
  
  render() {
    // Gettin the token
  
    if(this.props.authDet.auth) return <Main token = {token} />
    if(this.props.page == "login") return <Portal/>
    else return <Main/>

  }
}

const mapStateToProps = (store) => {
  return {
    authDet: store.authReducer, 
    page: store.pageReducer
  }
}
const mapDispatchToProps = {
  detailsUpdate: actions.detailsUpdate,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
