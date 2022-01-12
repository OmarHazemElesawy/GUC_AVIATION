import {Container , AppBar,Typography,Grow,Grid} from '@material-ui/core';
import React from 'react';
import Search from './searchRetReserved'
import useStyles from './styles';
import { Outlet } from 'react-router-dom';
function SearchReturn() {
  const classes =useStyles();

  return (

    <div className="Admin">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Available Return Flights</Typography>
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
export default SearchReturn;
