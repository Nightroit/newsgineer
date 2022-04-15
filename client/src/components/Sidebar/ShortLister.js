import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useState} from 'react'; 
import Slider from '@mui/material/Slider';
import request from '../../util/axios'
import "./SideBar.css"

const styles = {
    "&.MuiButton-root": {
      border: "1px #90cbf8 solid"
    },
    "&.MuiButton-text": {
      color: "grey"
    },
    "&.MuiButton-outlined": {
      color: "#90cbf8"
    },    

  };
  const selectedStyle = {backgroundColor: "#90cbf8", color: "black"}


export default function GroupOrientation({filterPost, setFeed}) {
const [selected, changeSelected] = useState(0);
const [slider, changeSlider] = useState(7); 

function handleSlider(e) {
  if(e.target.value < 7) changeSlider(7); 
  else changeSlider(e.target.value); 

}

function sliderApply() {
  request("timeFilter", slider, function(data, err) {
    if(data) {
      setFeed(data); 
    } else {
      console.log("Some error at time filter"); 
      console.log(err); 
    }
  })
}

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
    <div
      className = "sidebarMain"
    
  >
  <ButtonGroup
      className = "sidebarButtons"
      sx={styles}
      orientation="vertical"
      
      >
      <h3 className = "sidebarPast"> Shortlist the domain</h3>

      {buttons}
    </ButtonGroup>
   
  
    <Box  className = "sidebarSlider" width={300}>
      <h3 className = "sidebarPast">News of past:  &nbsp;{slider} Days</h3>
      <Slider
        onChange = {handleSlider}
        style = {{color: "#90cbf8"}}
        defaultValue={9} aria-label="Default" valueLabelDisplay="auto" />
          <Button onClick = {sliderApply} style = {{color: '#90cbf8'}}  sx={styles} key="9">Apply</Button>,
    </Box>

  </div>

  );
}