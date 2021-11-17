import React from 'react';
import {Container , AppBar,Typography,Grow,Grid} from '@material-ui/core';
import Show from './components/showFlight/showFlight';
import Create from './components/createFlight/createFlight';
import useStyles from './styles';

const LandingPage=()=> {
  const classes =useStyles();

  return (
    <div className="LandingPage">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Show and Create flights</Typography>
        </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch">
           <Grid item xs={12} sm={7}>
             <AppBar className={classes.appBar}position="static" color="inherit">
               <Show>
               </Show>
             </AppBar>
           </Grid>
           <Grid item xs={12} sm={4}>
           <AppBar className={classes.appBar}position="static" color="inherit">
             <Create>
             </Create>
             </AppBar>
           </Grid>
          </Grid>
        </Container>
      </Grow>
      </Container>
    </div>
  );
}

export default LandingPage;