import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useState} from 'react'; 

const styles = {
    "&.MuiButton-root": {
      border: "1px orange solid"
    },
    "&.MuiButton-text": {
      color: "grey"
    },
    "&.MuiButton-outlined": {
      color: "orange"
    },    

  };
  const selectedStyle = {backgroundColor: "orange", color: "white"}


export default function GroupOrientation({filterPost}) {
const [selected, changeSelected] = useState(0);

const buttonClicked = (e) => {
    let str = e.target.innerText; 
    str = str.toLowerCase(); 
    str = str[0].toUpperCase() + str.slice(1);
    changeSelected(e.target.name) 
    filterPost(str);    
         
}
const buttons = [
    <Button  style = {('1' == selected) ? selectedStyle : null}  name = "1" onClick = {buttonClicked} sx = {styles} key="1">Aeronautical</Button>,
    <Button  style = {('2' == selected) ? selectedStyle : null}   name = "2" onClick = {buttonClicked}  sx={styles} key="2">Agriculture</Button>,
    <Button  style = {('3' == selected) ? selectedStyle : null}  name = "3" onClick = {buttonClicked} sx={styles} key="3">Biomedical</Button>,
    <Button  style = {('4' == selected) ? selectedStyle : null}  name = "4" onClick = {buttonClicked}  sx={styles} key="4">Civil</Button>,
    <Button  style = {('5' == selected) ? selectedStyle : null}  name = "5" onClick = {buttonClicked} sx={styles} key="5">Electrical</Button>,
    <Button  style = {('6' == selected) ? selectedStyle : null}   name = "6" onClick = {buttonClicked} sx={styles} key="6">Electronics</Button>,
    <Button  style = {('7' == selected) ? selectedStyle : null}   name = "7" onClick = {buttonClicked}  sx={styles} key="7">Environmental</Button>,
    <Button  style = {('8' == selected) ? selectedStyle : null}  name = "8" onClick = {buttonClicked} sx={styles} key="8">Computer</Button>,
    <Button  style = {('9' == selected) ? selectedStyle : null}  name = "9" onClick = {buttonClicked}  sx={styles} key="9">Other</Button>,
  ];
  
  return (
    <Box
    sx={{
      display: 'flex',
      '& > *': {
        m: 1,
      },
    }}
  >

  <ButtonGroup
      className = "sidebarButtons"
      sx={styles}
      orientation="vertical"
     
    >
      {buttons}
    </ButtonGroup>
  </Box>

  );
}