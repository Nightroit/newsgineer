import * as React from 'react';
import Login from './Login/Login';
import Register from './Login/Register'
import * as actions from '../actions/index'
import {connect} from 'react-redux'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Portal.css'

function Portal({flip, flipVal}) {
    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode: 'dark'
            },
          }),
        ['dark'],
      );
      
  return (
    <ThemeProvider theme={theme}>
      <div className="Portal">

        <div className = "sidebar">
        </div>
      
        <div className = "portalMain">
          <div className = "portalSlogan">
            <h1 class="gradient-text text1">News of the geeks</h1>
        
            <h1 class="gradient-text text2">News for the geeks</h1>
            <h1 class="gradient-text text3">News By the geeks</h1>
          </div>
          {flipVal ? <Login flip = {flip} />: <Register flip = {flip}/>}

        </div>
      </div>
   </ThemeProvider>
  );
}

const mapDispatchToProps = {
  flip: actions.flip,
}

const mapStateToProps = (store) => {
  return {
    flipVal: store.flipReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portal)
