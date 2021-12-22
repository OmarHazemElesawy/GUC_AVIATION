import {Container , AppBar,Typography,Grow,Grid} from '@material-ui/core';
import React from 'react';
import Search from './components/searchFlightGuest';
import useStyles from './styles';
import { Outlet } from 'react-router-dom';
import "./ExistingUser.css"
function ExistingUser() {
  const classes =useStyles();

  return (

    <div className="Admin">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >User Guest Home Page</Typography>
        </AppBar>
      <Grow in>
        <Container>
        <Grid container justify="space-between" alignItems="stretch">
           <Grid item xs={12} sm={7}>
             <AppBar className={classes.appBar}position="static" color="inherit">
             <Search>
             </Search>
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
