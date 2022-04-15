import Validator from './validator'
import request from './axios'
import {useJwt} from 'react-jwt'
import { isExpired, decodeToken } from "react-jwt";
import * as actions from '../actions/index'

export default function(e, errors, username, password, confirmPassword='', setError, email, callback) {

        errors = []; 
        if(e == "login") {
            if(username == '' || password == '') {
                if(username == '') {
                    errors.push("Please enter the username or email address!")
                } 
                if(password == '') {
                    errors.push("Please enter the password!")
                }
            } else {
             
                let f1 = (Validator(username, "emaillogin"));
                let f2 = (Validator(password, "password"));
                
                if(!f1 || !f2) {
                    if(!f1) {
                        errors.push("Invalid email or username!")
                    }
                    if(!f2) {
                        errors.push("Wrong password!")
                    }
                } else {
                    if(errors.length == 0) {
                        request("login", {username, password}, function(res, err) {
                            if(err) {
                                callback(null, err)
                            } else {
                                console.log(res.data); 
                                localStorage.setItem('token', res.data.token)
                                const myDecodedToken = decodeToken(res.data.token);
                                console.log(myDecodedToken)
                                callback(myDecodedToken, null)
                            }
                        })
                    }
            }
        }
        setError(errors)
    } else {
        if(username == '' || password == '' || confirmPassword == '') {
            if(username == '') {
                errors.push("Please enter the username")
            } 
            if(email == "") { 
                errors.push("Please enter the Email address")
            }
            if(password == '') {
                errors.push("Please enter the password!")
            }

            if(confirmPassword == '') {
                errors.push("Confirm password section is empty"); 
            }
        } else {
         
            let f1 = (Validator(username, "emaillogin"));
            let f4 = (Validator(email, "email"));
            let f2 = (Validator(password, "password"));
            let f3 = password == confirmPassword;
            if(!f1 || !f2 || !f3 || !f4) {
                if(!f1) {
                    errors.push("Invalid email or username!")
                }
                if(!f4) {
                    errors.push("Invalid Email address")
                }
                if(!f2) {
                    errors.push("Wrong password!")
                }
                if(!f3) {
                    errors.push("Password did not match");
                }
                console.log(errors)
    
            } else {
                if(errors.length == 0) {
                    request("register", {username, email, confirmPassword, password}, function(res, err) {
                        if(res) {
                            localStorage.setItem('token', res.data.token)
                            const myDecodedToken = decodeToken(res.data.token);
                            callback(myDecodedToken, null)
                            
                            } else {
                            callback(null, null)
                            errors.push(err)       
                            setError([err])                 
                    }
                    })
             }
        }
        }
        setError(errors)
    }
}
