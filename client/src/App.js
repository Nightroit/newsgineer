import * as React from 'react';
import Main from './components/Main'
import { isExpired, decodeToken } from "react-jwt";
import * as actions from './actions/index'
import {connect} from 'react-redux'; 
import Portal from './components/Portal';




class App extends React.Component {

  constructor(props) {
    super(props); 
  }
  
  render() {

    if(this.props.authDet.auth) return <Main/>
    
    // Gettin the token
    let token = localStorage.getItem('token');
    if(!token) {
      return <Portal/>
    }
    else if(isExpired(token)) {
        localStorage.removeItem('token')
    }  
    else {
      
        const myDecodedToken = decodeToken(token);
        this.props.detailsUpdate(myDecodedToken.name)
        return (
            <Main token = {token}/>
          )
      }
 
  }
}

const mapStateToProps = (store) => {
  return {
    authDet: store.authReducer
  }
}
const mapDispatchToProps = {
  flip: actions.flip,
  detailsUpdate: actions.detailsUpdate
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
