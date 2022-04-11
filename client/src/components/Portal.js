import * as React from 'react';
import Login from './Login/Login';
import Register from './Login/Register'
import * as actions from '../actions/index'
import {connect} from 'react-redux'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      <div className="App">
        <div className = "sidebar">
        </div>

        <div className = "main">
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