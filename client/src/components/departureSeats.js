import React from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import { useParams} from 'react-router-dom';
//import {Button} from '@mui/material';
//import Stack from '@mui/material';
//import Switch from '@mui/material/Switch';
//import {useNavigate} from 'react-router-dom';

function DepartureSeats() {
//const navigate=useNavigate();
const classes =useStyles();
 let {adult}:{adult:string}=useParams();
 let {children}:{children:string}=useParams();
 let {id1}:{id1:string}=useParams();
 let {id2}:{id2:string}=useParams();


  return (
    <div className="departureSeats">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Your Departure Seats</Typography>
          </AppBar>
            <h2>
            Please select {adult} adult tickets:
            <br/>
            <br/>
            {id1}
            <br/>
            <br/>
            {id2}
            </h2>
          </Container>
    </div>
  );
}

//<Checkbox {...label} defaultChecked />
// <Button variant="outlined" onClick={()=>{navigate("update")}}>update page</Button>
// <Button variant="outlined" onClick={()=>{navigate("searchData")}}>Search page</Button>

export default DepartureSeats