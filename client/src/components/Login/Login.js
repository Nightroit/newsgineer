import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import buttonHandle from '../../util/handleButton';
import * as actions from '../../actions/index';
import {connect} from 'react-redux'; 


import './Login.css'

function Login({flip, detailsUpdate, login}) {
    const [filled1, setFilled1] = React.useState(0)
    const [filled2, setFilled2] = React.useState(1)
    const [username, setUsername] = React.useState(''); 
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState([])
    let errors = []; 

    function handleInput(e) {
        let type = e.target.name;
        let value = e.target.value;

        if(type == "username") {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    function handleClick() {
        buttonHandle("login", errors, username, password, '', setError, "", function(data, err) {

            if(data) {
               detailsUpdate(data.name);
              
            } else console.log(err)
        })
    }

    return (
        <div className= "Login">
            <div >
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
                            style={{ borderColor: 'white', color: `${'red'}` }}
                            id="outlined-required"
                            label="Username or email"
                            
                            name = "username"
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
                            style={{ borderColor: 'white', color: `${filled2}` }}
                            autoComplete="current-password"
                            />
            
                    </div>
                    <br></br>
                        <div className = "button">
                            <Stack className = "button" spacing={2} direction="row">
                                <Button variant = "contained" onClick = {(e) => {
                                       handleClick()}
                                    }>Login</Button>
                                <Button name = "register"  onClick = {(e) => {
                                        flip(); 
                                        setError([])
                                      }  
                                        }>Register?</Button>
                            </Stack>
                        </div>
                </div>
                </Box>
            </div>

            <div className = "ErrorLogin">
                    <ul>
                    {
                        error.map(e => {
                            console.log(e)
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);
