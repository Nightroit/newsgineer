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
    // Gettin the token
    let token = localStorage.getItem('token');
    if(isExpired(token)) {
      localStorage.removeItem('token'); 
    }
    if(this.props.authDet.auth) {
      return <Main/>
    } else if(this.props.page == "login") return <Portal/>
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
