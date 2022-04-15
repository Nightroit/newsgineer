import * as React from 'react';
import {useEffect} from 'react'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import validator from '../../util/validator';
import request from '../../util/axios'

import './CreatePost.css'
export default function StateTextFields() {
  const [link, setLink] = React.useState('');
  const [heading, setHeading] = React.useState('');
  const [domain, setDomain] = React.useState(''); 
  const [btn, setBtn] = React.useState(1); 
  const [message, setMessage] = React.useState([]); 
  const handleChange = (event) => {
    if(event.target.name == "link") {
      setLink(event.target.value); 
    } 
    else if(event.target.name == "heading") {
      setHeading(event.target.value); 
    }
    else {
      setDomain(event.target.value);  

  };
}
  useEffect(() => {

    if(validator(link, "link") && validator(heading, "heading") && domain != '') {
      setBtn(0); 
    } else {
      setBtn(1); 
    }
  },[link, heading, domain])
  const buttonClick = () => {
      let content = {
        link, 
        heading, 
        domain
      }
      let data = {
        content, 
        token: localStorage.getItem("token")
      }
 
      request("post", data, function(data, err) {
        if(data) {
          console.log(data)
        }
      })
      setLink("");
      setDomain(""); 
      setHeading("");  
  }

  return (
        <div className = "createPostFields">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            
            autoComplete="off"
            >
              <TextField
              id="outlined-uncontrolled"
              label="Your website link"
              name = "link"
              onChange = {handleChange}
              value = {link}
              />
            <TextField
              id="outlined-uncontrolled"
              label="Heading"
              name = "heading"
              value = {heading}
              onChange = {handleChange}
              />
          </Box>
          <Box >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={domain}
            onChange={handleChange}
            label="Domain"
            name = "domain"
>       
            <MenuItem value = '1'  >Aeronautical</MenuItem>
            <MenuItem value= '2' >Agricultural</MenuItem>
            <MenuItem value= '3'>Biomedical</MenuItem>
            <MenuItem value= '4'>Civil</MenuItem>
            <MenuItem value= '5'>Electrical</MenuItem>
            <MenuItem value= '6'>Electronics</MenuItem>
            <MenuItem value= '7'>Environmental</MenuItem>
            <MenuItem value= '8' >Computer</MenuItem>
            <MenuItem value= '9' >Other</MenuItem>
          </Select>
        </FormControl>
          <Stack direction="row" className = "createPostButton">
            <Button onClick = {buttonClick} disabled = {btn} variant="contained">Post</Button>
          </Stack>
          </Box>
          <ul className = "createPostErrors">
            {
              message.map(e => <li className = "createPostErrorsLi">{e}</li>)
            }
         
          </ul>
          </div>

  );
}