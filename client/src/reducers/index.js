import {combineReducers } from 'redux'; 
import flipReducer from './loginReducer';
import authReducer from './authReducer';
import pageReducer from './PageReducer';
import postReducer from './postReducer'

export default combineReducers({
    flipReducer, 
    authReducer, 
    pageReducer,
    postReducer
  })
