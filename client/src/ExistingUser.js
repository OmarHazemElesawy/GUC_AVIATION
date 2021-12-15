import {Container , AppBar,Typography,Grow,Grid} from '@material-ui/core';
import React from 'react';
import Search from './components/searchFlightUser';
import ShowUser from "./components/showUser/showUser"
import useStyles from './styles';
import Show from './components/showReservation/showReservation';
import { Outlet } from 'react-router-dom';
import "./ExistingUser.css"
//import { Button } from '@material-ui/core';
//import {useNavigate} from 'react-router-dom';
//import axios from 'axios';
function ExistingUser() {
  const classes =useStyles();

  return (

    <div className="Admin">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >User Home Page</Typography>
        </AppBar>
      <Grow in>
        <Container>
        <Grid container justify="space-between" alignItems="stretch">
           <Grid item xs={12} sm={7}>
             <AppBar className={classes.appBar}position="static" color="inherit">
               <Show>
               </Show>
             </AppBar>
             <AppBar className={classes.appBar}position="static" color="inherit">
             <Search>
             </Search>
             </AppBar>
           </Grid>
           <Grid item xs={12} sm={4}>
           <AppBar className={classes.appBar}position="static" color="inherit">
             <ShowUser>
             </ShowUser>
             </AppBar>
           </Grid>
          </Grid>
        </Container>
      </Grow>
      </Container>
      <Outlet/>
    </div>
  );
}
export default ExistingUser
//<button aria-label="updateUser" onClick={()=>{navigate(`updateUser/${userList[0]._id}`)}}>
//</button>
//import useStyles from './styles';
//import {useNavigate} from 'react-router-dom';
//import {Container , AppBar,Typography} from '@material-ui/core';
//import { Button,Stack} from '@mui/material';
//const classes =useStyles();
//const navigate=useNavigate();
// <Button variant="outlined" onClick={()=>{navigate("update")}}>update page</Button>
// <Button variant="outlined" onClick={()=>{navigate("searchData")}}>Search page</Button>
  
