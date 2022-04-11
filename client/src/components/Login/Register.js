import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as actions from '../../actions/index'
import {connect} from 'react-redux'; 
import Button from '@mui/material/Button';
import buttonHandle from '../../util/handleButton';
import './Register.css'

function Register({flip, detailsUpdate}) {
    const [filled1, setFilled1] = React.useState(0)
    const [filled2, setFilled2] = React.useState(1)
    const [username, setUsername] = React.useState(''); 
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setCPassword] = React.useState('');
    const [error, setError] = React.useState([])
    let errors = []; 

    function handleClick() {
        buttonHandle("register", errors, username, password, confirmPassword, setError, email, function(data, err) {
            if(data) {
               detailsUpdate(data.name);
            } else console.log(err)
        })
    }

    function handleInput(e) {
        let type = e.target.name;
        let value = e.target.value;

        if(type == "username") {
            setUsername(value)
        } else if(type == "password"){
            setPassword(value)
        } else if(type == "email") {
            setEmail(value)
        }
         else {
            setCPassword(e.target.value)
        }
    }

    return (
        <div>
            <div className= "Register">
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch',  color: 'white'},
                }}
                inputProps ={{
                    style: {
                        color: 'white'
                    }
                }}
                noValidate
                autoComplete="off"
                >
                    <div>
                        <div className = "text">
                             <TextField
                                id="outlined-password-input"
                                label="Username"
                                type="text"
                                name = "username"
                                onChange = {(e) => handleInput(e, errors)}
                            
                            />
                               <br></br>
                            <TextField
       
                            id="outlined-required"
                            label="Email address"
                            name = "email"
                            onChange = {(e) => handleInput(e, errors)}
                            labelProps = {{min: 0, style: { textAlign: 'center' }}}
                            />
                            <br></br>
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name = "password"
                            onChange = {(e) => handleInput(e, errors)}

                            autoComplete="current-password"
                            />
                            <br></br>
                            <TextField
                                id="outlined-password-input"
                                label="Confirm Password"
                                type="password"
                                name = "confirmPassword"
                                onChange = {(e) => handleInput(e, errors)}

                                autoComplete="current-password"
                            />
                    
                        </div>
                        <br></br>
                        <div className = "button">
                            <Stack className = "button" spacing={2} direction="row">
                                <Button variant = "contained" onClick = {(e) => {
                                  handleClick(); 
                                }}>Register</Button>
                                <Button name = "login"  onClick = {(e) => {
                                    setError([])
                                    flip(); 
                                }
                                }>Login?</Button>
                            </Stack>
                        </div>
                </div>
                </Box>
            </div>


            <div className = "Error">
                <ul>
                {   
                error.map(e => {
                        return <li>{e}</li>
                    })
                    
                }
                </ul>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    login: actions.login,
    detailsUpdate: actions.detailsUpdate
  }
  
  const mapStateToProps = (store) => {
    return {
        auth: store.authReducer

    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);
